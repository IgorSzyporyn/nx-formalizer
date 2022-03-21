import { BaseField } from './BaseField';

import type { FieldInputProps } from '../../types';

export const TextField = (props: FieldInputProps) => {
  return (
    <BaseField displayName="Text" {...props}>
      {(inputProps) => <input {...inputProps} />}
    </BaseField>
  );
};

TextField.displayName = 'TextField';
