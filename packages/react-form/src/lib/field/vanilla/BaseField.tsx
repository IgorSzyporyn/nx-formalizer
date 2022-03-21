import { useRef, Children } from 'react';
import { isFunction, uniqueId } from 'lodash';

import type { ReactNode } from 'react';
import type { IXFieldProps } from '@formalizer/core';
import type { FieldExtraProps, FieldInputProps } from '../../types';

export type BaseFieldProps = {
  displayName?: string;
  title?: string;
  error?: string;
  description?: string;
  dirty?: boolean;
  valid?: boolean;
  touched?: boolean;
  xtype?: string;
  fields?: IXFieldProps<FieldExtraProps>[];
  children: (props: FieldInputProps) => ReactNode;
} & FieldInputProps;

export function BaseField({
  displayName,
  children,
  title,
  error,
  description,
  dirty,
  valid,
  touched,
  ...rest
}: BaseFieldProps) {
  const id = useRef(uniqueId(`FRX-${displayName}-`));

  let rootCx = `FRX-Field FRX-Field-${displayName}`;
  const labelCx = `FRX-Field__label FRX-Field-${displayName}__label`;
  const contentCx = `FRX-Field__content FRX-Field-${displayName}__content`;
  const descriptionCx = `FRX-Field__description FRX-Field-${displayName}__description`;
  const errorCx = `FRX-Field__error FRX-Field-${displayName}__error`;
  const inputCx = `FRX-Field__input FRX-Field-${displayName}__input`;

  const inputProps = {
    ...rest,
    className: inputCx,
    id: `${id.current}--input`,
  };

  if (description) {
    inputProps['aria-describedby'] = `${id.current}--descripion`;
  }

  if (rest.disabled) {
    rootCx = `${rootCx} FRX--disabled`;
  }

  if (error && !rest.disabled) {
    rootCx = `${rootCx} FRX--error`;
  }

  const isGroup = rest.type === undefined;

  return (
    <div className={rootCx}>
      {title && displayName !== 'Boolean' && displayName !== 'RadioItem' && (
        <>
          {isGroup ? (
            <span id={`${id.current}--label`} className={labelCx}>
              {title}
            </span>
          ) : (
            <label
              id={`${id.current}--label`}
              className={labelCx}
              htmlFor={`${id.current}--input`}
            >
              {title}
            </label>
          )}
        </>
      )}
      {description &&
        (displayName === 'Boolean' || displayName === 'RadioItem') && (
          <span id={`${id.current}--description`} className={descriptionCx}>
            {description}
          </span>
        )}
      <div className={contentCx}>
        {description &&
          displayName !== 'Boolean' &&
          displayName !== 'RadioItem' && (
            <span id={`${id.current}--description`} className={descriptionCx}>
              {description}
            </span>
          )}
        {children
          ? isFunction(children)
            ? (children as (inputProps: FieldInputProps) => ReactNode)(
                inputProps as FieldInputProps
              )
            : !(Children.count(children) === 0)
            ? Children.only(children)
            : null
          : null}
        {title && (displayName === 'Boolean' || displayName === 'RadioItem') && (
          <label
            id={`${id.current}--label`}
            className={labelCx}
            htmlFor={`${id.current}--input`}
          >
            {title}
          </label>
        )}
        {error && !rest.disabled && (
          <div id={`${id.current}--error`} className={errorCx}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

BaseField.displayName = 'BaseField';
