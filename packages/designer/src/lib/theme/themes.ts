import type { Theme } from './types';

export const lightTheme: Theme = {
  context: {
    primary: {
      light: '',
      normal: '',
      dark: '',
    },
    secondary: {
      light: '',
      normal: '',
      dark: '',
    },
    success: {
      light: '',
      normal: '',
      dark: '',
    },
  },
  border: {
    light: '',
    normal: '#cccccc',
    dark: '',
  },
  surface: {
    background: {
      light: '#fbfbfb',
      normal: '#f3f3f3',
      dark: '#f0f0f0',
    },
    paper: {
      light: '#ffffff',
      normal: '#fcfcfc',
      dark: '#fafafa',
    },
  },
  typography: {
    font: "'Lato', sans-serif",
    color: {
      light: '',
      normal: '#2c2c2c',
      dark: '#000000',
    },
    colorInverse: {
      light: '',
      normal: '',
      dark: '',
    },
  },
  metrics: {
    small: '',
    normal: '',
    large: '',
  },
};

export const darkTheme: Theme = {
  context: {
    primary: {
      light: '',
      normal: '',
      dark: '',
    },
    secondary: {
      light: '',
      normal: '',
      dark: '',
    },
    success: {
      light: '',
      normal: '',
      dark: '',
    },
  },
  border: {
    light: '',
    normal: '#cccccc',
    dark: '',
  },
  surface: {
    background: {
      light: '#f8f8f8',
      normal: '#f3f3f3',
      dark: '#f0f0f0',
    },
    paper: {
      light: '#ffffff',
      normal: '#fcfcfc',
      dark: '#fafafa',
    },
  },
  typography: {
    font: "'Lato', sans-serif",
    color: {
      light: '',
      normal: '',
      dark: '',
    },
    colorInverse: {
      light: '',
      normal: '',
      dark: '',
    },
  },
  metrics: {
    small: '',
    normal: '',
    large: '',
  },
};

export const themes = { light: lightTheme, dark: darkTheme };
