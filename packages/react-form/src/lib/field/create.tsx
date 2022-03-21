import React from 'react';

import { Field } from '../components/Field';

import type { Formalizer, IXFieldProps } from '@formalizer/core';
import type {
  FieldInputProps,
  FieldExtraProps,
  FieldInputPropsMap,
  FieldComponentMap,
} from '../types';

type K = FieldExtraProps;

export type CreateFieldProps<E extends K> = {
  field: IXFieldProps<E>;
  inputPropsMap: FieldInputPropsMap;
  componentMap: FieldComponentMap;
  extraProps?: Record<string, unknown>;
};

export function createField<E extends K = K>({
  field,
  inputPropsMap,
  componentMap,
  extraProps = {},
}: CreateFieldProps<E>) {
  const { component } = field.extraProps;

  return field.$id && component ? (
    <Field name={field.$id} key={field.$id}>
      {({ props }) => {
        let componentProps: FieldInputProps & { key?: string } =
          createComponentProps(field, props, inputPropsMap, extraProps);

        const Component = componentMap[component];

        return React.createElement(Component as any, componentProps);
      }}
    </Field>
  ) : null;
}

type CreateFieldsProps<E extends K> = {
  formalizer: Formalizer<E>;
  inputPropsMap: FieldInputPropsMap;
  componentMap: FieldComponentMap;
};

export function createFields<E extends K = K>({
  formalizer,
  inputPropsMap,
  componentMap,
}: CreateFieldsProps<E>) {
  return (
    <>
      {formalizer.xFields
        .filter((f) => f.extraProps && f.extraProps.component)
        .map((field) => createField({ field, inputPropsMap, componentMap }))}
    </>
  );
}

function createComponentProps<E extends K = K>(
  xField: IXFieldProps<E>,
  props: FieldInputProps,
  mapping: FieldInputPropsMap,
  extraProps: Record<string, unknown>
) {
  let mappedProps = { ...props, ...extraProps };

  if (xField.extraProps && xField.extraProps.inputProps) {
    mappedProps = { ...mappedProps, ...xField.extraProps.inputProps };
  }

  for (const [key, value] of Object.entries(mapping)) {
    const _xField = xField as any;
    const _mappedProps = mappedProps as any;

    if (_xField[key] !== undefined) {
      _mappedProps[value] = _xField[key];
    }
  }

  return mappedProps;
}
