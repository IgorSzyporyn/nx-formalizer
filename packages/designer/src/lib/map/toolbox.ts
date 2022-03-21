const basicProps = {
  name: undefined,
  title: undefined,
  description: undefined,
  value: undefined,
};

export const toolboxMap = {
  array: {
    ...basicProps,
  },
  group: {
    ...basicProps,
    inline: undefined,
  },
  object: {
    ...basicProps,
  },
  boolean: {
    ...basicProps,
  },
  string: {
    ...basicProps,
  },
  number: {
    ...basicProps,
  },
  grid: {
    ...basicProps,
    columns: undefined,
  },
};
