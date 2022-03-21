import { BaseField } from './BaseField';

import type { FieldInputProps } from '../../types';

export const TextAreaField = (props: FieldInputProps) => {
  return (
    <BaseField displayName="TextArea" {...props}>
      {(inputProps) => <textarea {...inputProps} />}
    </BaseField>
  );
};

TextAreaField.displayName = 'TextAreaField';
