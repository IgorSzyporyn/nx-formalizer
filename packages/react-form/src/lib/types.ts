import type {
  Formalizer,
  IFormalizerOptions,
  IXFieldProps,
  IXFieldRefMap,
} from '@formalizer/core';

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export type FormFieldInputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>;

export interface IFormFieldExtraProps {
  component?: React.ReactNode;
  inputProps?: FormFieldInputProps;
}

// FORM PROPS
export interface IFormProps<E> extends IFormalizerOptions<E> {
  autoGenerate?: boolean;
  render?: (props: IFormChildProps) => React.ReactNode;
  children?: ((props: IFormChildProps) => React.ReactNode) | React.ReactNode;
}

// FORM CHILDREN RENDER/COMPONENT PROPS
export interface IFormChildProps<E = IFormFieldExtraProps> {
  formalizer: Formalizer<E>;
  fields: IXFieldRefMap<E>;
}

// FIELD PROPS
export type FormFieldProps<E = IFormFieldExtraProps> = IXFieldProps<E> & {
  xField: IXFieldProps<E>;
  xFieldRefMap: IXFieldRefMap<E>;
  render?: (props: CreateFormFieldChildProps) => React.ReactNode | JSX.Element;
  children?:
    | ((props: CreateFormFieldChildProps) => React.ReactNode)
    | React.ReactNode;
};

// FIELD STATE
export type FormFieldState<E = IFormFieldExtraProps> = IXFieldProps<E> &
  Pick<
    FormFieldProps,
    Exclude<
      keyof FormFieldProps,
      'render' | 'children' | 'xField' | 'xFieldRefMap'
    >
  >;

// FIELD EVENT TYPES
export type FormFieldHandleChange = (e: React.ChangeEvent<any> | any) => void;
export type FormFieldHandleBlur = (e: React.FocusEvent<any>) => void;

// FIELD CHILDREN RENDER/COMPONENT PROPS
export type CreateFormFieldChildProps<E = IFormFieldExtraProps> =
  IXFieldProps<E> & {
    xField: IXFieldProps<E>;
    xFieldRefMap: IXFieldRefMap<E>;
    handleChange?: FormFieldHandleChange;
    handleBlur?: FormFieldHandleBlur;
  };

// FIELD GROUP CHILDREN RENDER/COMPONENT PROPS
export type FormFieldGroupChildProps<E = IFormFieldExtraProps> =
  IXFieldProps<E> & {
    xField: IXFieldProps<E>;
    xFieldRefMap: IXFieldRefMap<E>;
  };
