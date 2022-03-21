import { BaseField } from './BaseField';

import type { FieldInputProps } from '../../types';

export const BooleanField = ({ value, ...props }: FieldInputProps) => {
  const checked = !!value;

  return (
    <BaseField displayName="Boolean" {...props}>
      {(inputProps) => <input {...inputProps} checked={checked} />}
    </BaseField>
  );
};

BooleanField.displayName = 'BooleanField';
