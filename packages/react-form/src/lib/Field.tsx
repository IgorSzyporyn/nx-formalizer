import React, { useContext, useEffect, useRef, useState } from 'react';
import { isFunction } from 'lodash';
import { FormContext } from './Form.Context';

import type { IXFieldProps, XFieldListenerCallback } from '@formalizer/core';
import type {
  FormFieldHandleBlur,
  FormFieldHandleChange,
  FormFieldState,
  IFormFieldExtraProps,
  FormFieldInputProps,
} from './types';

type ExtraProps = IFormFieldExtraProps;

export type FormFieldChildProps = {
  props: FormFieldInputProps;
  field: IXFieldProps<ExtraProps>;
};

// FIELD PROPS
export type FieldProps = {
  name: string;
  children?:
    | ((props: FormFieldChildProps) => React.ReactNode)
    | React.ReactNode;
};

export const Field = ({ children, ...props }: FieldProps) => {
  const { xFieldRefMap } = useContext(FormContext);
  const xField = xFieldRefMap[props.name];

  const handleChange: FormFieldHandleChange = (val) => {
    if (xField) {
      xField.value = val.currentTarget ? val.currentTarget.value : val;
    }
  };

  const [childProps, setChildProps] = useState<FormFieldChildProps>({
    field: xField || {},
    props: {
      ...((xField && xField.extraProps && xField.extraProps.inputProps) || {}),
      name: xField.$id,
      value: xField.value !== undefined ? (xField.value as string) : '',
      onChange: handleChange,
    },
  });

  const handleXFieldChange: XFieldListenerCallback<ExtraProps> = (field) => {
    const newChildProps = {
      ...childProps,
      field: {
        ...childProps.field,
        [field.propName]: field.value,
      },
    };

    if (field.propName === 'value') {
      newChildProps.props.value = field.value;
    }

    if (field.propName === 'name') {
      newChildProps.props.name = field.value;
    }

    setChildProps({
      ...childProps,
      ...newChildProps,
    });
  };

  useEffect(() => {
    if (xField && xField.addListener) {
      xField.addListener(handleXFieldChange);
    }
  }, []);

  return (
    xField && children
      ? isFunction(children)
        ? (children as (props: FormFieldChildProps) => React.ReactNode)(
            childProps
          )
        : !(React.Children.count(children) === 0)
        ? React.Children.only(children)
        : null
      : null
  ) as React.ReactElement;
};
