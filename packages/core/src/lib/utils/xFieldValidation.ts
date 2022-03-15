import Ajv, { ErrorObject } from 'ajv';
import deepmerge from 'deepmerge';
import {
  IValidationErrors,
  IValidationMessagesMap,
  IValidationSchema,
  IValue,
  IXFieldProps,
  ValidateFn,
} from '../types';

export function initXFieldValidation<E>(fields: IXFieldProps<E>[] = []) {
  const ajv = new Ajv({ allErrors: true });
  const schema = createSchemaFromFields<E>(fields);
  const messagesMap = createMessagesFromFields<E>(fields);

  const validateFn: ValidateFn = async (value: IValue) => {
    const validation = ajv.compile(schema);
    const valid = await validation(value);
    let errors: IValidationErrors = {};

    if (!valid) {
      errors = createErrorMapFromAjv(messagesMap, validation.errors);
    }

    return errors;
  };

  return validateFn;
}

export function createSchemaFromFields<E>(
  fields: IXFieldProps<E>[] = [],
  parent?: IValidationSchema
): IValidationSchema {
  // Build our scope wise base schema
  // Initial call wont have a root for us, and Subsequent calls needs
  // a "properties" placeholder to place their validation in
  let root: IValidationSchema = parent
    ? deepmerge({ properties: {} }, parent)
    : {
        type: 'object',
        properties: {},
      };

  fields.forEach((field) => {
    const { valueType, validation } = field;

    // We do not validate non-value fields - but we do traverse them afterwards
    if ((validation || valueType === 'object') && valueType !== 'none') {
      const validationSafe = validation || {};

      const { mandatory, ...rules } = { ...validationSafe };

      // Handle the exception "mandatory" which is an artificial addition to
      // regular JSON Schema - in place in order to do "required" on field level
      // So we create the "required" field on parent here (if not there) and
      // push our field to it if "mandatory" was set, and scrape off "mandatory"
      if (mandatory && field.name) {
        if (!root.required) {
          root.required = [];
        }
        root.required.push(field.name);
      }

      // We set type to valueType so it is not required by the defined
      // validation per field (as we are limited to these types anyways)
      let schema: IValidationSchema = {
        ...(rules || {}),
        type: valueType,
      };

      if (field.valueType === 'object' && field.fields) {
        schema = createSchemaFromFields(field.fields, schema);
      }

      if (root.properties && field.name) {
        root.properties[field.name] = schema;
      }
    }

    // Now look for none based valueTypes as they may have fields that needs
    // to be added to the schema
    if (field.valueType === 'none' && field.fields) {
      root = createSchemaFromFields(field.fields, root);
    }
  });

  return root;
}

export function createMessagesFromFields<E>(
  fields: IXFieldProps<E>[] = [],
  messages: IValidationMessagesMap = {}
): IValidationMessagesMap {
  fields.forEach((field) => {
    const { validationMessages, $id } = field;

    if (validationMessages && $id) {
      messages[$id] = validationMessages;
    }

    if (field.fields) {
      messages = createMessagesFromFields(field.fields, messages);
    }
  });

  return messages;
}

export function createErrorMapFromAjv(
  messagesMap: IValidationMessagesMap,
  errorObjects?: ErrorObject[] | null
) {
  const errors: IValidationErrors = {};

  if (errorObjects) {
    errorObjects.forEach((errorObject) => {
      const { keyword, instancePath } = errorObject;

      // Will come in as "/name" or "" for root level (required)
      // and as "/name/firstname" for object values dotnotation key
      // @TODO - Learn 2 regex
      const key = instancePath.replace(/(?!^)\//g, '.').replace(/\//g, '');

      if (key) {
        // We got a key - which means this is a field
        const errorMessage = createErrorMessage({
          errorObject,
          messagesMap,
          $id: key,
        });

        if (errorMessage) {
          errors[key] = errorMessage;
        }
      } else {
        // No key - this is root level
        const params = errorObject.params;

        if (keyword === 'required') {
          const errorMessage = createErrorMessage({
            errorObject,
            messagesMap,
            $id: params['missingProperty'],
            required: true,
          });

          if (errorMessage) {
            errors[params['missingProperty']] = errorMessage;
          }
        }
      }
    });
  }

  return errors;
}

export interface ICreateErrorMessage {
  errorObject: ErrorObject;
  messagesMap: IValidationMessagesMap;
  $id: string;
  required?: boolean;
}

export function createErrorMessage({
  errorObject,
  messagesMap,
  $id,
  required,
}: ICreateErrorMessage) {
  const { message, keyword } = errorObject;
  let customErrorMessage = message;
  const errorMessage = messagesMap[$id];

  if (typeof errorMessage === 'string') {
    // if errorMessage is a string - then its a one covers all
    customErrorMessage = errorMessage;
  } else if (typeof errorMessage === 'object') {
    // If errorMessage is an object - then we need to look for keyword as key
    customErrorMessage = required
      ? errorMessage.mandatory
      : errorMessage[keyword];
  } else {
    // Default back to the message from error
    customErrorMessage = message;
  }

  return customErrorMessage;
}
