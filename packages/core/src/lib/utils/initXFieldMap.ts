import deepmerge from 'deepmerge';
import { isArray } from 'lodash';
import { IXFieldMap, IXFieldProps } from '../types';
import { xFieldErrorMessage } from './xFieldErrorMessage';

export interface IInitXFieldMap<E> {
  applicantMaps?: IXFieldMap<E> | Array<IXFieldMap<E>>;
  xFieldCoreMap: IXFieldMap<E>;
}

export function initXFieldMap<E>({
  applicantMaps,
  xFieldCoreMap,
}: IInitXFieldMap<E>) {
  const applicants = applicantMaps
    ? isArray(applicantMaps)
      ? applicantMaps
      : [applicantMaps]
    : [];

  const coreMaps: Array<IXFieldMap<E>> = [xFieldCoreMap];
  const maps = coreMaps.concat(applicants);

  let xFieldMap: IXFieldMap<E> = {};

  maps.forEach((applicantMap) => {
    Object.keys(applicantMap).forEach((key) => {
      const xField = applicantMap[key];

      if (xField.type === key) {
        xFieldMap = deepmerge(
          registerXField<E>({ xField, xFieldMap }),
          xFieldMap
        );
      } else {
        xFieldErrorMessage(
          key,
          `because the xField key <${key}> did not match the xField type <${xField.type}>`
        );
      }
    });
  });

  return xFieldMap;
}

export interface IRegisterXField<E> {
  xField: IXFieldProps<E>;
  xFieldMap: IXFieldMap<E>;
}

export function registerXField<E>({
  xField,
  xFieldMap,
}: IRegisterXField<E>): IXFieldMap<E> {
  if (xField.type && xField.valueType && !xFieldMap[xField.type]) {
    // Straight up register where xField
    xFieldMap[xField.type] = xField;
  } else if (xField.type && xField.valueType && xFieldMap[xField.type]) {
    // Register already existing xField by deepmerging
    xFieldMap[xField.type] = deepmerge(xFieldMap[xField.type], xField);
  } else {
    let errorMessage = 'because something went wrong';
    if (!xField.type) {
      errorMessage = 'because the xField it is missing the property "type"';
    } else if (xField.type && xFieldMap[xField.type]) {
      errorMessage = 'since the xtype already exists';
    } else if (!xField.valueType) {
      errorMessage = 'because it is missing the property "valueType"';
    }

    xFieldErrorMessage(xField.type, errorMessage);
  }

  return xFieldMap;
}
