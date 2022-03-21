import * as Styled from './styled';

import { createFields } from './FieldItem';

import type { IFieldProps } from '@formalizer/core';

export type FormFieldProps = {
  fields: IFieldProps[];
};

export const FormField = ({ fields = [] }: FormFieldProps) => {
  return (
    <Styled.FormWrapper data-level={1}>
      <Styled.FieldPanel>Form</Styled.FieldPanel>
      {fields.length > 0 && (
        <Styled.FieldChildren>{createFields(fields, 1)}</Styled.FieldChildren>
      )}
    </Styled.FormWrapper>
  );
};
