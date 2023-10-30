import { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import { stopLoading, startLoading } from 'src/redux/slices/siteStore';

// ----------------------------------------------------------------------

function ModeIcon({ light }) {
  const settings = useSettingsContext();
  const dispatch = useDispatch();
  const theme = useTheme();
  const COLOR = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

  const toggleMode = () => {
    dispatch(startLoading());
    setTimeout(() => {
      settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark');
      dispatch(stopLoading());
    }, 500);
  };

  const singleLogo = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="nightModeIconTitle"
      stroke={COLOR}
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color={COLOR}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        {' '}
        <title id="nightModeIconTitle">Night Mode</title>{' '}
        <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />{' '}
        <path d="M15.899 12.899a4 4 0 0 1-4.797-4.797A4.002 4.002 0 0 0 12 16c1.9 0 3.49-1.325 3.899-3.101z" />{' '}
        <path d="M12 5V3M12 21v-2" />{' '}
        <path d="M5 12H2h3zM22 12h-3 3zM16.95 7.05L19.07 4.93 16.95 7.05zM4.929 19.071L7.05 16.95 4.93 19.07zM16.95 16.95l2.121 2.121-2.121-2.121zM4.929 4.929L7.05 7.05 4.93 4.93z" />{' '}
      </g>
    </svg>
  );

  return (
    <Box
      sx={{ width: 48, height: 48 }}
      component={IconButton}
      onClick={toggleMode}
      aria-label="switch-language"
    >
      {singleLogo}
    </Box>
  );
}

ModeIcon.propTypes = {
  light: PropTypes.bool,
};

export default memo(ModeIcon);
