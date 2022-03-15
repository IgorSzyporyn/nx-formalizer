import React from 'react';
import deepmerge from 'deepmerge';
import { Formalizer } from '@formalizer/core';
import { isFunction } from 'lodash';
import { xFieldMap } from './xFields';
import { createFields } from './utils';

import type {
  IFormChildProps,
  IFormFieldExtraProps,
  IFormProps,
} from './types';
import { FormContext } from './Form.Context';

export type FormProps = IFormProps<IFormFieldExtraProps>;

export class Form extends React.Component<FormProps, {}> {
  public static displayName = 'Form';
  public static defaultProps = {};

  public formalizer: Formalizer<IFormFieldExtraProps>;

  constructor(props: FormProps) {
    super(props);

    let mergedXFieldMap = { ...xFieldMap };

    if (props.xFieldMap) {
      mergedXFieldMap = deepmerge((props.xFieldMap || {}) as {}, xFieldMap);
    }
    const formalizerProps: FormProps = {
      ...props,
      xFieldMap: mergedXFieldMap,
    };

    this.formalizer = this.initFormalizer(formalizerProps);
  }

  public override render() {
    const { xFields, xFieldRefMap, xFieldMap } = this.formalizer;
    const { children, render, autoGenerate } = this.props;

    const formChildProps: IFormChildProps = {
      formalizer: this.formalizer,
      fields: xFieldRefMap,
    };

    // tslint:disable jsx-no-multiline-js
    return (
      <form>
        {autoGenerate && (
          <>
            {createFields(xFields, xFieldRefMap)}
            {children}
          </>
        )}
        {!autoGenerate && (
          <FormContext.Provider value={{ xFieldMap, xFieldRefMap }}>
            {render
              ? render(formChildProps)
              : children
              ? isFunction(children)
                ? (children as (props: IFormChildProps) => React.ReactNode)(
                    formChildProps as IFormChildProps
                  )
                : !(React.Children.count(children) === 0)
                ? React.Children.only(children)
                : null
              : null}
          </FormContext.Provider>
        )}
      </form>
    );
  }

  private initFormalizer = (props: FormProps) =>
    new Formalizer<IFormFieldExtraProps>({
      fields: props.fields,
      xFieldMap: props.xFieldMap,
    });
}
