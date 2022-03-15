import { isEqual } from 'lodash';
import { IValue, IXFieldProps, ValueTypes } from '../types';

export function enhanceXFieldWithObjectValues<E>(xField: IXFieldProps<E>) {
  const fields = xField.fields || [];
  const fieldValue = xField.value as IValue;

  if (fieldValue == null) {
    const shadowValue: IValue = {};

    fields.forEach((childField) => {
      if (childField.value !== undefined && childField.name) {
        shadowValue[childField.name] = childField.value;
      }
    });

    if (fields.length) {
      xField.value = shadowValue;
    }
  } else {
    fields.forEach((childField) => {
      if (
        childField.name &&
        !isEqual(childField.value, fieldValue[childField.name])
      ) {
        childField.value = fieldValue[childField.name];
      }
    });
  }

  fields.forEach((childField) => {
    childField.addListener &&
      childField.addListener(({ propName, value }) => {
        const setValue: ValueTypes = value;

        if (propName === 'value' && xField.value == null) {
          const shadowValue: IValue = {};

          if (setValue !== undefined && childField.name) {
            shadowValue[childField.name] = setValue;
          }

          xField.value = shadowValue;
        } else if (
          propName === 'value' &&
          xField.value != null &&
          childField.name
        ) {
          const shadowValue: IValue = xField.value as IValue;

          if (setValue === undefined) {
            delete shadowValue[childField.name];
          } else {
            shadowValue[childField.name] = setValue;
          }

          xField.value = shadowValue;
        }
      });
  });
}
