import React, { useContext, useEffect, useState, useRef } from 'react';
import { isFunction } from 'lodash';
import { FormContext } from '../Form.Context';

import type {
  Formalizer,
  IXFieldProps,
  XFieldListenerCallback,
} from '@formalizer/core';
import type {
  FieldHandleChange,
  FieldExtraProps,
  FieldInputProps,
} from '../types';

type ExtraProps = FieldExtraProps;

function transferFieldsPropsToProps(_childProps: FormFieldChildProps) {
  const childProps = { ..._childProps };
  const { field } = childProps;

  // .value
  childProps.props.value =
    field.value !== undefined ? (field.value as string) : '';

  // .name && .id
  childProps.props.id = field.$id;
  childProps.props.name = field.$id;

  // .disabled
  childProps.props.disabled = !!field.disabled;

  return childProps;
}

type CreateChildProps = {
  xField: IXFieldProps<ExtraProps>;
  initial?: boolean;
  handleChange?: FieldHandleChange;
  formalizer: Formalizer<ExtraProps>;
};

function createChildProps({
  xField,
  initial,
  handleChange,
  formalizer,
}: CreateChildProps) {
  let childProps: FormFieldChildProps = {
    field: xField || {},
    formalizer,
    props: {
      ...((xField && xField.extraProps && xField.extraProps.inputProps) || {}),
    },
  };

  childProps = transferFieldsPropsToProps(childProps);

  if (initial) {
    childProps.props.onChange = handleChange;
  }

  return childProps;
}

export type FormFieldChildProps = {
  formalizer: Formalizer<ExtraProps>;
  props: FieldInputProps;
  field: IXFieldProps<ExtraProps>;
};

// FIELD PROPS
export type FieldProps = {
  name: string;
  key?: string;
  children?:
    | ((props: FormFieldChildProps) => React.ReactNode)
    | React.ReactNode;
};

export function Field({ children, name }: FieldProps) {
  const { formalizer } = useContext(FormContext);
  const xField = formalizer.xFieldRefMap[name];

  const handleChange: FieldHandleChange = (val) => {
    if (xField && xField.valueType !== 'boolean') {
      xField.value = val.currentTarget ? val.currentTarget.value : val;
    } else if (xField && xField.valueType === 'boolean') {
      xField.value = val.currentTarget.checked;
    }
  };

  const [childProps, setChildProps] = useState<FormFieldChildProps>(
    createChildProps({ xField, initial: true, handleChange, formalizer })
  );

  const handleXFieldChange: XFieldListenerCallback<ExtraProps> = (field) => {
    let newChildProps = {
      ...childProps,
      field: {
        ...childProps.field,
        [field.propName]: field.value,
      },
    };

    newChildProps = transferFieldsPropsToProps(newChildProps);

    setChildProps(newChildProps);
  };

  useEffect(() => {
    if (xField && xField.addListener) {
      xField.addListener(handleXFieldChange);
    }
  }, []);

  return (
    <>
      {xField && children
        ? isFunction(children)
          ? (children as (props: FormFieldChildProps) => React.ReactNode)(
              childProps
            )
          : !(React.Children.count(children) === 0)
          ? React.Children.only(children)
          : null
        : null}
    </>
  );
}
