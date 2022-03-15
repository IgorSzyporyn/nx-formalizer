import { errorMsg } from './messages';

import type { IXFieldProps, IXFieldRefMap } from '../types';

export function initXFieldRefMap<E>(xFields: Array<IXFieldProps<E>>) {
  const xFieldRefMap = xFieldsToRefMap<E>(xFields);

  return xFieldRefMap;
}

export const xFieldsToRefMap = <ExtraProps>(
  xFields: Array<IXFieldProps<ExtraProps>>,
  refMap: IXFieldRefMap<ExtraProps> = {}
) => {
  let xFieldRefMap = { ...refMap };

  xFields.forEach((xField) => {
    if (xField.$id && xFieldRefMap[xField.$id]) {
      errorMsg(`Found duplicate key for ${xField.$id}`);
    }

    if (xField.$id) {
      xFieldRefMap[xField.$id] = xField;
    }

    if (xField.fields) {
      const childRefMap = xFieldsToRefMap(xField.fields, xFieldRefMap);

      xFieldRefMap = {
        ...xFieldRefMap,
        ...childRefMap,
      };
    }
  });

  return xFieldRefMap;
};
