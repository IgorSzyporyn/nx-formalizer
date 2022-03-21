import React, { useEffect, useState, useRef } from 'react';
import deepmerge from 'deepmerge';
import { Formalizer } from '@formalizer/core';

import { isFunction } from 'lodash';
import * as defaults from './field/map';
import { createFields } from './field/create';
import { FormContext } from './Form.Context';

import type { IValue, IXFieldRefMap } from '@formalizer/core';
import type { HTMLAttributes, FormEvent } from 'react';
import type { FormalizerOptions } from '@formalizer/core';
import type {
  FieldComponentMap,
  FieldExtraProps,
  FieldInputPropsMap,
} from './types';

declare const window: any;

type FormState = {
  formalizer: Formalizer<FieldExtraProps> | undefined;
};

export type FormRenderProps = {
  fields: IXFieldRefMap<FieldExtraProps>;
  dirty: boolean;
  touched: boolean;
  valid: boolean;
  value: IValue;
};

export type FormProps = {
  autoGenerate?: boolean;
  inputPropsMap?: FieldInputPropsMap;
  componentMap?: FieldComponentMap;
  validateOnInit?: boolean;
  onSubmit?: (formalizer: Formalizer, form: HTMLFormElement) => void;
  children?: ((props: FormRenderProps) => React.ReactNode) | React.ReactNode;
} & FormalizerOptions<FieldExtraProps> &
  Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export function Form({
  autoGenerate,
  children,
  className,
  onSubmit,
  inputPropsMap: _inputPropsMap,
  componentMap: _componentMap,
  ...rest
}: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>({
    formalizer: undefined,
  });

  const { formalizer } = state;

  const [renderProps, setRenderProps] = useState<FormRenderProps>({
    fields: formalizer?.xFieldRefMap || {},
    dirty: !!formalizer?.dirty,
    touched: !!formalizer?.touched,
    valid: !!formalizer?.valid,
    value: formalizer?.value || {},
  });

  // Cleanse off all IFormalizerOptions in props so we end up with
  // only  HTMLAttributes<HTMLFormElement> to spread on to the <form />
  const {
    fields,
    xFieldMap,
    registerExtraProps,
    value,
    onDirtyChange,
    onTouchedChange,
    onValidChange,
    onFieldChange,
    ...formProps
  } = rest;

  useEffect(() => {
    const fieldMap = deepmerge((xFieldMap || {}) as {}, defaults.fieldMap);

    // We have to add all options on by hand from the cleansed off props
    const formalizer = new Formalizer({
      fields,
      xFieldMap: fieldMap,
      registerExtraProps,
      value,
      onDirtyChange: (dirty) => {
        onDirtyChange?.(dirty);
        setRenderProps({
          ...renderProps,
          dirty,
        });
      },
      onTouchedChange: (touched) => {
        onTouchedChange?.(touched);
        setRenderProps({
          ...renderProps,
          touched,
        });
      },
      onValidChange: (valid) => {
        onValidChange?.(valid);
        setRenderProps({
          ...renderProps,
          valid,
        });
      },
      onFieldChange,
    });

    setState({
      ...state,
      formalizer,
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (formRef.current && formalizer) {
      onSubmit?.(formalizer, formRef.current);
    }
  };

  window.C = formalizer;

  const inputPropsMap = _inputPropsMap || defaults.fieldInputPropsMap;
  const componentMap = deepmerge(
    defaults.fieldComponentMap,
    _componentMap || {}
  );

  let formCx = `FRX-Form`;

  if (className) {
    formCx = `FRX-Form ${className}`;
  }

  return formalizer ? (
    <form
      ref={formRef}
      {...formProps}
      onSubmit={handleSubmit}
      className={formCx}
    >
      <FormContext.Provider
        value={{
          formalizer,
          inputPropsMap,
          componentMap,
        }}
      >
        {autoGenerate &&
          createFields({
            formalizer,
            inputPropsMap,
            componentMap,
          })}
        {children
          ? isFunction(children)
            ? (children as (renderProps: FormRenderProps) => React.ReactNode)(
                renderProps as FormRenderProps
              )
            : !(React.Children.count(children) === 0)
            ? React.Children.only(children)
            : null
          : null}
      </FormContext.Provider>
    </form>
  ) : null;
}
