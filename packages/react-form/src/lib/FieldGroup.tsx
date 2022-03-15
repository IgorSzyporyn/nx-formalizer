import { XFieldListenerCallback } from '@formalizer/core';
import { isFunction } from 'lodash';
import React from 'react';
import {
  FormFieldGroupChildProps,
  FormFieldProps,
  FormFieldState,
  IFormFieldExtraProps,
} from './types';

type ExtraProps = IFormFieldExtraProps;
type Props = FormFieldProps;
type State = FormFieldState;

export class FieldGroup extends React.Component<Props, State> {
  public static displayName = 'FieldGroup';
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

  public override render() {
    const { props, state } = this;
    const { render, children, xField, xFieldRefMap } = props;

    const childProps: FormFieldGroupChildProps = {
      ...state,
      xField,
      xFieldRefMap,
    };

    // tslint:disable jsx-no-multiline-js
    return render
      ? render(childProps)
      : children
      ? isFunction(children)
        ? (children as (props: FormFieldGroupChildProps) => React.ReactNode)(
            childProps as FormFieldGroupChildProps
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
