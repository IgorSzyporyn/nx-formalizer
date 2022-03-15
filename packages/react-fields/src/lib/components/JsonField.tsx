import {
  CreateFormFieldChildProps,
  FormFieldProps,
  CreateField as FormalizerField,
  createField,
} from '@formalizer/react-form';
import React from 'react';
import Field from './Field';

function renderField(props: CreateFormFieldChildProps) {
  const { fields } = props;

  return (
    <Field className="FRX-JsonField" {...props}>
      {fields && fields.map((field) => createField(field, props.xFieldRefMap))}
    </Field>
  );
}

const JsonField: React.FunctionComponent<FormFieldProps> = (
  props: FormFieldProps
) => {
  return <FormalizerField {...props} render={renderField} />;
};

JsonField.defaultProps = {};
JsonField.displayName = 'JsonField';

export default JsonField;
