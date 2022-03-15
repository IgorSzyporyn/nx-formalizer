import { IXFieldMap } from '@formalizer/core';
import { IFormFieldExtraProps } from '@formalizer/react-form';

export const xFieldMap: IXFieldMap<IFormFieldExtraProps> = {
  group: {
    type: 'group',
    valueType: 'none',
    extraProps: {},
  },
  object: {
    type: 'object',
    valueType: 'object',
    extraProps: {},
  },
  json: {
    type: 'json',
    valueType: 'object',
    extraProps: {},
  },
  string: {
    type: 'string',
    valueType: 'string',
    extraProps: {
      inputProps: {
        type: 'text',
      },
    },
  },
  text: {
    type: 'text',
    valueType: 'string',
    extraProps: {
      inputProps: {
        type: 'text',
      },
    },
  },
  number: {
    type: 'number',
    valueType: 'number',
    extraProps: {
      inputProps: {
        type: 'number',
      },
    },
  },
  email: {
    type: 'email',
    valueType: 'string',
    extraProps: {
      inputProps: {
        type: 'email',
      },
    },
  },
};
