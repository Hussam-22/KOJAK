import 'src/global.css';
import { AuthProvider } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------

import { Provider as ReduxProvider } from 'react-redux';

import ThemeProvider from 'src/theme';
import { store } from 'src/redux/store';
import Router from 'src/routes/sections';
import { LocalizationProvider } from 'src/locales';
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeColorPresets: 'preset04', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <Router />
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}
