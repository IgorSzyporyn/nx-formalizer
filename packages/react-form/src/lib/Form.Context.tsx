import React from 'react';
import { xFieldMap } from './xFields';

import type { IXFieldMap, IXFieldRefMap } from '@formalizer/core';
import type { IFormFieldExtraProps } from './types';

export type FormContextType = {
  xFieldMap: IXFieldMap<IFormFieldExtraProps>;
  xFieldRefMap: IXFieldRefMap<IFormFieldExtraProps>;
};

export const FormContext = React.createContext<FormContextType>({
  xFieldMap: xFieldMap,
  xFieldRefMap: {},
});
