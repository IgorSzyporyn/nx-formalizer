import type { IFieldProps } from '@formalizer/core';

export const fields: IFieldProps[] = [
  {
    name: 'personal_info',
    type: 'group',
    title: 'Personal Information',
    description: 'Basic personal details about you',
    fields: [
      {
        name: 'first_name',
        type: 'text',
        description: 'Enter your given name',
        title: 'Your First Name',
      },
      {
        name: 'last_name',
        title: 'Your Last Name',
        description: 'Enter your last name',
        type: 'text',
      },
      {
        name: 'dob',
        type: 'date',
        title: 'Date of birth',
        description: 'Enter your birthdate',
      },
    ],
  },
  {
    name: 'professional_info',
    type: 'group',
    title: 'Professional Information',
    description: 'Some information about your professional life',
    fields: [
      {
        name: 'employed',
        type: 'boolean',
        title: 'Employed',
        description: 'Are you currently employed',
      },
      {
        name: 'work_preference',
        type: 'radio',
        title: 'Worktype Preference',
        description: 'Choose the work type you prefer',
        fields: [
          {
            name: 'office',
            type: 'radioItem',
            title: 'At office',
            value: 'office',
          },
          {
            name: 'home',
            type: 'radioItem',
            title: 'At home',
            value: 'home',
          },
        ],
      },
      {
        name: 'past_experiences',
        type: 'grid',
        title: 'Past experiences',
        description: 'Choose among the fields in which you have experience',
        columns: 3,
        fields: [
          {
            name: 'it_devops',
            type: 'boolean',
            title: 'Dev Ops',
          },
          {
            name: 'it_frontend',
            type: 'boolean',
            title: 'Front End Development',
          },
          {
            name: 'it_backend',
            type: 'boolean',
            title: 'Back End Development',
          },
          {
            name: 'ux_design',
            type: 'boolean',
            title: 'UX Design',
          },
          {
            name: 'ui_design',
            type: 'boolean',
            title: 'UI Design',
          },
          {
            name: 'cx',
            type: 'boolean',
            title: 'Customer Experience (CX)',
          },
        ],
      },
    ],
  },
];
