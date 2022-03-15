import React from 'react';
import {
  CreateFormFieldChildProps,
  FormFieldProps,
  CreateField as FormalizerField,
} from '@formalizer/react-form';
import Field from './Field';

const renderField = (props: CreateFormFieldChildProps) => {
  return (
    <Field {...props}>
      <input {...props.extraProps.inputProps} />
    </Field>
  );
};

const TextField: React.FunctionComponent<FormFieldProps> = (
  props: FormFieldProps
) => <FormalizerField {...props} render={renderField} />;

TextField.defaultProps = {};
TextField.displayName = 'TextField';

export default TextField;
