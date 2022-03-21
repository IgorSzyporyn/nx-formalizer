import { useContext } from 'react';
import { createField } from '@formalizer/react-form';

import { BaseField } from './BaseField';
import { FormContext } from '../../Form.Context';

import type { FieldExtraProps, FieldInputProps } from '../../types';
import type { IXFieldProps } from '@formalizer/core';

type ArrayFieldProps = {
  fields?: IXFieldProps<FieldExtraProps>[];
} & FieldInputProps;

export function ArrayField(props: ArrayFieldProps) {
  const { fields } = props;
  const { inputPropsMap, componentMap } = useContext(FormContext);

  return (
    <BaseField displayName="Array" {...props}>
      {() =>
        fields &&
        fields.map((field) => {
          return createField({ field, inputPropsMap, componentMap });
        })
      }
    </BaseField>
  );
}

ArrayField.displayName = 'ArrayField';
