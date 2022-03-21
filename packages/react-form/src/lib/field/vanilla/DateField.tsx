import { BaseField } from './BaseField';

import type { FieldInputProps } from '../../types';

export const DateField = (props: FieldInputProps) => {
  return (
    <BaseField displayName="Date" {...props}>
      {(inputProps) => <input {...inputProps} />}
    </BaseField>
  );
};

DateField.displayName = 'DateField';
