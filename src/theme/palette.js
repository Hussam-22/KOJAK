import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  50: '#F6F6F6',
  100: '#F8F8F8',
  200: '#E9E9E9',
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
  lighter: '#EBF6FF',
  light: '#5CB6FF',
  main: '#2365D7',
  dark: '#005AA3',
  darker: '#003866',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F8F8F8',
  light: '#636363',
  main: '#444444',
  dark: '#000000',
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#FEEBF0',
  light: '#F93966',
  main: '#E8073C',
  dark: '#C60633',
  darker: '#9E0529',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D8FBDE',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
  contrastText: '#000000',
};

const WARNING = {
  lighter: '#FBE4DB',
  light: '#F09F7F',
  main: '#EB8258',
  dark: '#E96835',
  darker: '#DC5018',
  contrastText: '#000000',
};

const ERROR = {
  lighter: '#F8C9CD',
  light: '#EB5C68',
  main: '#E63946',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

const CUSTOM = {
  auto: '#FFDC45',
  spareParts: '#ee89fa',
  pink: '#FFACAC',
  peachLighter: '#FFF8F6',
  peachLight: '#FFEBE5',
  peach: '#FFC7C7',
  bluishPurpleLighter: '#F8F8FF',
  bluishPurpleLight: '#EDE4FF',
  bluishPurple: '#7A77A4',
  bluishPurpleDark: '#626082',
  purple: '#674188',
  orange: '#FFB84C',
  red: '#F16767',
  green: '#AACB73',
  contrastText: '#FFFFFF',
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
  divider: '#333',
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
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
      disabled: GREY[400],
      white: '#FFFFFF',
      warning: WARNING.main,
    },
    background: {
      paper: GREY[800],
      default: '#121212',
      neutral: alpha(GREY[800], 0.8),
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
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
      peach: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
