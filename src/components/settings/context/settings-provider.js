import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { useMemo, useState, useCallback } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
};

export function SettingsProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  const onUpdate = useCallback(
    (name, value) => {
      setSettings((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings]
  );

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang) => {
      onUpdate('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [onUpdate]
  );

  // Reset
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [setSettings]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const canReset = !isEqual(settings, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset,
      // Drawer
      open: drawerOpen,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      onReset,
      onUpdate,
      settings,
      canReset,
      drawerOpen,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

SettingsProvider.propTypes = {
  children: PropTypes.node,
  // defaultSettings: PropTypes.object,
};
