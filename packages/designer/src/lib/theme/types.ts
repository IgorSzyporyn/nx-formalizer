export type Theme = {
  context: {
    primary: ColorVariant;
    secondary: ColorVariant;
    success: ColorVariant;
  };
  border: ColorVariant;
  surface: {
    background: ColorVariant;
    paper: ColorVariant;
  };
  typography: {
    font: string;
    color: ColorVariant;
    colorInverse: ColorVariant;
  };
  metrics: MetricVariant;
};

export type ColorVariant = {
  light: string;
  normal: string;
  dark: string;
};

export type MetricVariant = {
  small: string;
  normal: string;
  large: string;
};
