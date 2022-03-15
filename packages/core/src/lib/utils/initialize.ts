import { isEqual } from 'lodash';
import { mapEach } from './mapEach';
import { getValueProxyHandler } from './valueProxyHandler';
import { enhanceXFieldWithArrayValues } from './xFieldArrayValues';
import { enhanceXFieldWithObjectValues } from './xFieldObjectValues';

import type {
  IValue,
  IXFieldProps,
  IXFieldRefMap,
  OnObjectValueChange,
  OnObjectValueDelete,
} from '../types';

/**
 * Initialize the required functionality to handle fields with object values
 * by filtering out those fields with valueType of `object` and run through
 * the `enhanceXFieldWithObjectValues` function
 *
 */
export function initXFieldObjectCapability<E>(xFieldRefMap: IXFieldRefMap<E>) {
  // Keys are first sorted by length with shortest first, in order to ensure
  // that we go parent -> child when we have dot notation at play for object
  // enveloped fields
  Object.keys(xFieldRefMap)
    .sort((a, b) => b.length - a.length)
    .forEach((key) => {
      const xField = xFieldRefMap[key];

      if (xField.valueType === 'object') {
        enhanceXFieldWithObjectValues<E>(xField);
      }
    });
}

/**
 * Initialize the required functionality to handle fields with array values
 * by filtering out those fields with valueType of `array` and run through
 * the `enhanceXFieldWithArrayValues` function
 *
 */
export function initXFieldArrayCapability<E>(xFieldRefMap: IXFieldRefMap<E>) {
  mapEach<IXFieldRefMap<E>, IXFieldProps<E>>(xFieldRefMap, (xField) => {
    if (xField.valueType === 'array') {
      enhanceXFieldWithArrayValues<E>(xField);
    }
  });
}

export interface IInitValueProps<E> {
  value?: IValue;
  xFieldRefMap: IXFieldRefMap<E>;
  onChange: OnObjectValueChange;
  onDelete: OnObjectValueDelete;
}

/**
 * Initialize the value for Formalizer instance and the fields
 * using a given value from options as initial value.
 *
 * Will also initialize the update of the Formalizer value in case
 * any field value changes.
 *
 */
export function initValue<E>({
  value,
  xFieldRefMap,
  onChange,
  onDelete,
}: IInitValueProps<E>): IValue {
  // First set values on first level xFields
  if (value) {
    Object.keys(xFieldRefMap).forEach((key) => {
      const xField = xFieldRefMap[key];
      const isObjectChild = xField.$id && xField.$id.includes('.');

      if (!isObjectChild) {
        xField.value = value[key] !== undefined ? value[key] : undefined;
      }
    });
  }

  let valueMap: IValue = {};

  // Do a run through the xFieldRefMap and build the valueMap
  mapEach<IXFieldRefMap<E>, IXFieldProps<E>>(xFieldRefMap, (xField, key) => {
    const isObjectChild = key.includes('.');

    if (!isObjectChild && xField.value !== undefined && xField.name) {
      valueMap[xField.name] = xField.value;
    }
  });

  const handler = getValueProxyHandler(onChange, onDelete);

  valueMap = new Proxy(valueMap, handler);

  // Do a final run through the xFieldRefMap and attach listeners
  // to keep valueRepMap updated now it is a proxy
  mapEach<IXFieldRefMap<E>, IXFieldProps<E>>(xFieldRefMap, (xField, key) => {
    const isObjectChild = xField.$id && xField.$id.includes('.');

    if (!isObjectChild && xField.addListener) {
      xField.addListener((state) => {
        if (state.propName === 'value' && state.value === undefined) {
          delete valueMap[key];
        } else if (state.propName === 'value' && state.value !== undefined) {
          valueMap[key] = state.value;
        }
      });
    }
  });

  return valueMap;
}

/**
 * Initialize the handling of each fields state (dirty, touched etc..)
 *
 */
export function initXFieldStateHandlers<E>(xFieldRefMap: IXFieldRefMap<E>) {
  mapEach<IXFieldRefMap<E>, IXFieldProps>(xFieldRefMap, (xField) => {
    xField.initialValue = xField.value;

    xField.addListener &&
      xField.addListener(({ propName, value }) => {
        if (propName === 'value') {
          xField.dirty = !isEqual(value, xField.initialValue);

          if (xField.dirty) {
            xField.touched = true;
          }
        }
      });
  });
}
