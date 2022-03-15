import { mapEach } from './mapEach';
import { enhanceXFieldWithDependencies } from './xFieldDependencies';

import type { IXFieldProps, IXFieldRefMap } from '../types';

export interface IInitXFieldDependencies<E> {
  xField: IXFieldProps<E>;
  xFieldRefMap: IXFieldRefMap<E>;
}

/**
 * Initialize the required functionality to handle fields that has dependencies
 * by filtering those fields out and run them through the
 * `enhanceXFieldWithDependencies` function
 *
 */
export function initXFieldDependencies<E>(xFieldRefMap: IXFieldRefMap<E>) {
  mapEach<IXFieldRefMap<E>, IXFieldProps<E>>(xFieldRefMap, (xField) => {
    if (xField.dependencies) {
      enhanceXFieldWithDependencies<E>(xField, xFieldRefMap);
    }
  });
}
