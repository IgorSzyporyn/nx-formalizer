import { BaseField } from './BaseField';
import { useContext } from 'react';
import { FormContext } from '../../Form.Context';

import type { FieldExtraProps, FieldInputProps } from '../../types';
import type { IXFieldProps } from '@formalizer/core';
import { createField } from '../create';

type GridFieldProps = {
  fields?: IXFieldProps<FieldExtraProps>[];
  columns?: number;
} & FieldInputProps;

export const GridField = ({
  fields,
  columns = 3,
  ...props
}: GridFieldProps) => {
  const { inputPropsMap, componentMap } = useContext(FormContext);

  return (
    <BaseField displayName="Grid" {...props}>
      {() => {
        return (
          <div
            className="FRX-Field-Grid__inner"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr '.repeat(columns),
            }}
          >
            {fields &&
              fields.map((field) =>
                createField({ field, inputPropsMap, componentMap })
              )}
          </div>
        );
      }}
    </BaseField>
  );
};

GridField.displayName = 'GridField';
