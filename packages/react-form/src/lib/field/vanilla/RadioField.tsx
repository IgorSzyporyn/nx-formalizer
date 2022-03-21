import { useContext } from 'react';

import { BaseField } from './BaseField';
import { FormContext } from '../../Form.Context';

import type { FieldExtraProps, FieldInputProps } from '../../types';
import type { IXFieldProps } from '@formalizer/core';
import { createField } from '../create';

type RadioFieldProps = {
  fields?: IXFieldProps<FieldExtraProps>[];
} & FieldInputProps;

export function RadioField(props: RadioFieldProps) {
  const { fields } = props;
  const { inputPropsMap, componentMap } = useContext(FormContext);

  return (
    <BaseField displayName="Radio" {...props}>
      {() =>
        fields &&
        fields.map((field) => {
          return createField({
            field: { ...field },
            inputPropsMap,
            componentMap,
            extraProps: {
              parent: props.name,
            },
          });
        })
      }
    </BaseField>
  );
}

RadioField.displayName = 'RadioField';
