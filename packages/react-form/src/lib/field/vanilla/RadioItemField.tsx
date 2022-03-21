import { BaseField } from './BaseField';

import type { FieldInputProps } from '../../types';

type RadioItemFieldProps = {
  parent: string;
} & FieldInputProps;

export const RadioItemField = ({ parent, ...props }: RadioItemFieldProps) => {
  return (
    <BaseField displayName="RadioItem" {...props}>
      {(inputProps) => <input {...inputProps} name={parent} />}
    </BaseField>
  );
};

RadioItemField.displayName = 'RadioItemField';
