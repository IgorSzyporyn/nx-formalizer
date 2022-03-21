import { createContext } from 'react';

import type { Formalizer, IFieldProps } from '@formalizer/core';

export type DesignerContextType = {
  fields: IFieldProps[];
  formalizer: Formalizer | undefined;
  updateDesignerContext: (partials: Partial<DesignerContextType>) => void;
};

export const DesignerContext = createContext<DesignerContextType>({
  fields: [],
  formalizer: undefined,
  updateDesignerContext: () => {},
});
