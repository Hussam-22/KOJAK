import { useEffect } from 'react';
import PropTypes from 'prop-types';
// emotion
import createCache from '@emotion/cache';
// rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

ThemeRtlLayout.propTypes = {
  children: PropTypes.node,
};

export default function ThemeRtlLayout({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
