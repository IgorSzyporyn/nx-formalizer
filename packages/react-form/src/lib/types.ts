import type { IXFieldProps } from '@formalizer/core';
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export type FieldExtraProps = {
  component?: string;
  inputProps?: FieldInputProps;
};

export type FieldInputPropsMap = Record<string, string>;

export type FieldComponentMap = Record<string, any>;

export type FieldMapKey =
  | 'array'
  | 'group'
  | 'object'
  | 'string'
  | 'boolean'
  | 'grid'
  | 'radio'
  | 'radioItem'
  | 'number'
  | 'text'
  | 'longtext'
  | 'email'
  | 'color'
  | 'date'
  | 'time'
  | 'week'
  | 'dateTime'
  | 'month'
  | 'password'
  | 'telephone';

export type FieldMap<E extends FieldExtraProps = FieldExtraProps> = Record<
  FieldMapKey,
  IXFieldProps<E>
>;

export type FieldInputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>;

export type FieldHandleChange = (e: React.ChangeEvent<any> | any) => void;
export type FieldHandleBlur = (e: React.FocusEvent<any>) => void;
