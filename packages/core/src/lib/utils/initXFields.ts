import deepmerge from 'deepmerge';
import { warningMsg } from './messages';
import { enhanceXFieldWithListener } from './xFieldListener';

import type {
  IFieldProps,
  IXFieldMap,
  IXFieldProps,
  RegisterExtraProps,
  ExtraProps,
} from '../types';

export interface IInitXFields<E> {
  fields?: Array<IFieldProps<E>>;
  registerExtraProps?: RegisterExtraProps<E>;
  xFieldMap: IXFieldMap<E>;
}

export function initXFields<E>({
  fields = [],
  registerExtraProps,
  xFieldMap,
}: IInitXFields<E>) {
  const xFields = fieldsToXFields<E>({
    fields,
    registerExtraProps,
    xFieldMap,
  });

  return xFields;
}

export function fieldToXField<E = ExtraProps>({
  field,
  xFieldMap,
  registerExtraProps,
  parent,
}: {
  field: IFieldProps<E>;
  xFieldMap: IXFieldMap<E>;
  registerExtraProps?: RegisterExtraProps<E>;
  parent?: IXFieldProps<E>;
}): IXFieldProps<E> {
  if (!xFieldMap[field.type]) {
    warningMsg(
      `Error creating the field "${field.name}" because the field type "${field.type}" could not be found in the xField type map`
    );
  }

  // Get rid of fields as the types are incompatible between
  // field and xField - use remaining fieldProps to convert
  const { fields, ...fieldProps } = field;

  // Ready the internal $id used to keep track of xFields in xFieldRefMap
  let $id = field.name;

  // Check for a parent as $id needs to be dot notated if parent
  // valueType is 'object'
  if (
    parent &&
    xFieldMap[parent.type] &&
    (xFieldMap[parent.type].valueType === 'object' ||
      xFieldMap[parent.type].valueType === 'array')
  ) {
    $id = `${parent.$id || parent.name}.${field.name}`;
  }

  // Merge with the xFieldMap model and add the created $id
  let xField: IXFieldProps<E> = {
    ...xFieldMap[field.type],
    ...fieldProps,
    $id,
  };

  // If a registerExtraProps function was sent along then we
  // need to give that a chance to return some additional
  // extraProps to extend with
  if (registerExtraProps) {
    const extraProps = registerExtraProps(xField);
    xField.extraProps = deepmerge(xField.extraProps, extraProps);
  }

  // Empower xField with the ability for added
  // listeners looking for a callback on xField
  // property changes
  xField = enhanceXFieldWithListener<E>(xField);

  // Look for child fields that also needs to be converted
  if (field.fields) {
    const xFields = fieldsToXFields<E>({
      fields: field.fields,
      parent: xField,
      registerExtraProps,
      xFieldMap,
    });

    if (xFields) {
      xField.fields = xFields;
    }
  }

  // Ensure default value of null if nullable
  if (xField.nullable && xField.value === undefined) {
    xField.value = null;
  }

  return xField;
}

export function fieldsToXFields<E = ExtraProps>({
  fields,
  xFieldMap,
  registerExtraProps,
  parent,
}: {
  fields: Array<IFieldProps<E>>;
  xFieldMap: IXFieldMap<E>;
  registerExtraProps?: RegisterExtraProps<E>;
  parent?: IXFieldProps<E>;
}): Array<IXFieldProps<E>> {
  return fields
    .map((field) =>
      fieldToXField<E>({
        field,
        parent,
        registerExtraProps,
        xFieldMap,
      })
    )
    .filter((f) => f);
}
