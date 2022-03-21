import { ObjectField } from './vanilla/ObjectField';
import { TextAreaField } from './vanilla/TextAreaField';
import { TextField } from './vanilla/TextField';
import { DateField } from './vanilla/DateField';
import { ArrayField } from './vanilla/ArrayField';
import { BooleanField } from './vanilla/BooleanField';
import { GridField } from './vanilla/GridField';
import { RadioField } from './vanilla/RadioField';
import { RadioItemField } from './vanilla/RadioItemField';

import { TextField as MuiTextField } from '@mui/material';

import type {
  FieldMap,
  FieldInputPropsMap,
  FieldComponentMap,
} from '@formalizer/react-form';

export const fieldInputPropsMap: FieldInputPropsMap = {
  title: 'title',
  description: 'description',
  error: 'error',
  dirty: 'dirty',
  valid: 'valid',
  touched: 'touched',
  fields: 'fields',
  columns: 'columns',
  options: 'options',
};

export const fieldComponentMap: FieldComponentMap = {
  TextField: TextField,
  TextAreaField: TextAreaField,
  ObjectField: ObjectField,
  DateField: DateField,
  ArrayField: ArrayField,
  BooleanField: BooleanField,
  GridField: GridField,
  RadioField: RadioField,
  RadioItemField: RadioItemField,
};

export const muiFieldComponentMap: FieldComponentMap = {
  TextField: MuiTextField,
  DateField: MuiTextField,
};

export const muiFieldInputPropsMap: FieldInputPropsMap = {
  title: 'label',
  error: 'error',
  dirty: 'dirty',
  valid: 'valid',
  touched: 'touched',
  fields: 'fields',
};

export const fieldMap: FieldMap = {
  array: {
    type: 'array',
    valueType: 'array',
    extraProps: {
      component: 'ArrayField',
    },
  },
  group: {
    type: 'group',
    valueType: 'none',
    extraProps: {
      component: 'ArrayField',
    },
  },
  object: {
    type: 'object',
    valueType: 'object',
    extraProps: {
      component: 'ObjectField',
    },
  },
  number: {
    type: 'number',
    valueType: 'number',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'number',
      },
    },
  },
  boolean: {
    type: 'boolean',
    valueType: 'boolean',
    extraProps: {
      component: 'BooleanField',
      inputProps: {
        type: 'checkbox',
      },
    },
  },
  radio: {
    type: 'radio',
    valueType: 'string',
    extraProps: {
      component: 'RadioField',
    },
  },
  radioItem: {
    type: 'radioItem',
    valueType: 'none',
    extraProps: {
      component: 'RadioItemField',
      inputProps: {
        type: 'radio',
      },
    },
  },
  grid: {
    type: 'grid',
    valueType: 'none',
    extraProps: {
      component: 'GridField',
    },
  },
  string: {
    type: 'string',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'text',
      },
    },
  },
  text: {
    type: 'text',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'text',
      },
    },
  },
  longtext: {
    type: 'longtext',
    valueType: 'string',
    extraProps: {
      component: 'TextAreaField',
    },
  },
  email: {
    type: 'email',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'email',
      },
    },
  },
  color: {
    type: 'color',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'color',
      },
    },
  },
  date: {
    type: 'date',
    valueType: 'string',
    extraProps: {
      component: 'DateField',
      inputProps: {
        type: 'date',
      },
    },
  },
  time: {
    type: 'time',
    valueType: 'string',
    extraProps: {
      component: 'DateField',
      inputProps: {
        type: 'time',
      },
    },
  },
  week: {
    type: 'week',
    valueType: 'string',
    extraProps: {
      component: 'DateField',
      inputProps: {
        type: 'week',
      },
    },
  },
  dateTime: {
    type: 'dateTime',
    valueType: 'string',
    extraProps: {
      component: 'DateField',
      inputProps: {
        type: 'datetime-local',
      },
    },
  },
  month: {
    type: 'month',
    valueType: 'string',
    extraProps: {
      component: 'DateField',
      inputProps: {
        type: 'month',
      },
    },
  },
  password: {
    type: 'password',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'password',
      },
    },
  },
  telephone: {
    type: 'telephone',
    valueType: 'string',
    extraProps: {
      component: 'TextField',
      inputProps: {
        type: 'tel',
      },
    },
  },
};
