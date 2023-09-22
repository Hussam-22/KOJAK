// i18n
import 'src/global.css';
import { AuthProvider } from 'src/auth/context/firebase';

import './locales/i18n';

// ----------------------------------------------------------------------

import { Provider as ReduxProvider } from 'react-redux';

import ThemeProvider from 'src/theme';
import { store } from 'src/redux/store';
import Router from 'src/routes/sections';
import { LocalizationProvider } from 'src/locales';
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import SettingsDrawer from 'src/components/settings/drawer/settings-drawer';
import { ThemeSettings, SettingsProvider } from 'src/components/settings/context';
// import { ThemeSettings, SettingsDrawer, SettingsProvider } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <LocalizationProvider>
          <SettingsProvider>
            <ThemeProvider>
              <ThemeSettings>
                <MotionLazy>
                  <ProgressBar />
                  <SettingsDrawer />
                  <Router />
                </MotionLazy>
              </ThemeSettings>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}
