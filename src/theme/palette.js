import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  50: '#F6F6F6',
  100: '#F8F8F8',
  200: '#CCCCCC',
  300: '#B5B5B5',
  400: '#8D8D8D',
  500: '#636363',
  600: '#424242',
  700: '#2D2D2D',
  800: '#212121',
  900: '#0B0B0B',
  1000: '#000000',
};

const PRIMARY = {
  lighter: '#666666',
  light: '#333333',
  main: '#E74646',
  dark: '#101010',
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#333333',
  light: '#222222',
  main: '#111111',
  dark: '#101010',
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#49303f',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D8FBDE',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#fff7da',
  light: '#FFE98B',
  main: '#FFDC45',
  dark: '#FFCF00',
  darker: '#D8AF00',
  contrastText: '#000000',
};

const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

const CUSTOM = {
  auto: '#FFDC45',
  spareParts: '#C72C41',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  custom: CUSTOM,
  grey: GREY,
  divider: alpha(GREY[500], 0.5),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.75),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode) {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: GREY[700],
      default: '#121212',
      neutral: alpha(GREY[500], 0.12),
      secondary: SECONDARY.light,
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: '#121212',
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
