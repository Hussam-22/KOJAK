// import { useMemo } from 'react';
// import merge from 'lodash.merge';
// import PropTypes from 'prop-types';

// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// import { useSettingsContext } from 'src/components/settings';

// import { shadows } from './shadows';
// import { palette } from './palette';
// import { typography } from './typography';
// import { presets } from './options/presets';
// import { darkMode } from './options/dark-mode';
// import { customShadows } from './custom-shadows';
// import { componentsOverrides } from './overrides';
// import RTL, { direction } from './options/right-to-left';

// // ----------------------------------------------------------------------

// export default function ThemeProvider({ children }) {
//   const settings = useSettingsContext();

//   const darkModeOption = darkMode(settings.themeMode);

//   const presetsOption = presets(settings.themeColorPresets);

//   const directionOption = direction(settings.themeDirection);

//   const baseOption = useMemo(
//     () => ({
//       palette: palette('light'),
//       shadows: shadows('light'),
//       customShadows: customShadows('light'),
//       typography,
//       shape: { borderRadius: 8 },
//     }),
//     []
//   );

//   const memoizedValue = useMemo(
//     () =>
//       merge(
//         // Base
//         baseOption,
//         // Direction: remove if not in use
//         directionOption,
//         // Dark mode: remove if not in use
//         darkModeOption,
//         // Presets: remove if not in use
//         presetsOption
//       ),
//     [baseOption, darkModeOption, directionOption, presetsOption]
//   );

//   const theme = createTheme(memoizedValue);

//   theme.components = componentsOverrides(theme);

//   return (
//     <MuiThemeProvider theme={theme}>
//       <RTL themeDirection={settings.themeDirection}>
//         <CssBaseline />
//         {children}
//       </RTL>
//     </MuiThemeProvider>
//   );
// }

// ThemeProvider.propTypes = {
//   children: PropTypes.node,
// };

import { useMemo } from 'react';
import PropTypes from 'prop-types';

// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';

// components
import { useSettingsContext } from '../components/settings';

//
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettingsContext();

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
