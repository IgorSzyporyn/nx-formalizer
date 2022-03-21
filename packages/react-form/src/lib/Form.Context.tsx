import React from 'react';
import { Formalizer } from '@formalizer/core';

import type {
  FieldComponentMap,
  FieldExtraProps,
  FieldInputPropsMap,
} from './types';

export type FormContextType = {
  formalizer: Formalizer<FieldExtraProps>;
  inputPropsMap: FieldInputPropsMap;
  componentMap: FieldComponentMap;
};

export const FormContext = React.createContext<FormContextType>({
  formalizer: new Formalizer(),
  inputPropsMap: {},
  componentMap: {},
});
