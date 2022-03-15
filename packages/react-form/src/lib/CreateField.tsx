import { XFieldListenerCallback } from '@formalizer/core';
import { isFunction } from 'lodash';
import React from 'react';
import {
  CreateFormFieldChildProps,
  FormFieldHandleBlur,
  FormFieldHandleChange,
  FormFieldProps,
  FormFieldState,
  IFormFieldExtraProps,
} from './types';

type ExtraProps = IFormFieldExtraProps;
type Props = FormFieldProps;
type State = FormFieldState;

export class CreateField extends React.Component<Props, State> {
  public static displayName = 'Field';
  public static defaultProps = {};

  constructor(props: FormFieldProps) {
    super(props);

    this.state = {
      ...props,
    };

    if (props.addListener) {
      props.addListener(this.handleXFieldChange);
    }
  }

  public handleChange: FormFieldHandleChange = (val) => {
    const { xField, $id } = this.props;

    if ($id) {
      xField.value = val.currentTarget ? val.currentTarget.value : val;
    }
  };

  public handleBlur: FormFieldHandleBlur = () => {
    // console.log(e)
  };

  public override render() {
    const { props, state, handleChange, handleBlur } = this;
    const { render, children, xField, xFieldRefMap } = props;

    const childProps: CreateFormFieldChildProps = {
      ...state,
      handleChange,
      handleBlur,
      xField,
      xFieldRefMap,
    };

    if (childProps.extraProps.inputProps) {
      childProps.extraProps.inputProps = {
        ...childProps.extraProps.inputProps,
        name: state.$id,
        value: state.value !== undefined ? (state.value as string) : '',
        onChange: handleChange,
        onBlur: handleBlur,
      };
    }

    // tslint:disable jsx-no-multiline-js
    return render
      ? render(childProps)
      : children
      ? isFunction(children)
        ? (children as (props: CreateFormFieldChildProps) => React.ReactNode)(
            childProps as CreateFormFieldChildProps
          )
        : !(React.Children.count(children) === 0)
        ? React.Children.only(children)
        : null
      : null;
  }

  private handleXFieldChange: XFieldListenerCallback<ExtraProps> = (field) => {
    this.setState({
      ...this.state,
      [field.propName]: field.value,
    });
  };
}
