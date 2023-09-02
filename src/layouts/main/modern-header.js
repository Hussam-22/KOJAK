import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Divider, Backdrop, IconButton, CircularProgress } from '@mui/material';

import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

export default function ModernHeader({ headerOnDark }) {
  const theme = useTheme();
  const offset = useOffSetTop();
  const [isLoading, setIsLoading] = useState(false);
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { currentLang, onChangeLang } = useLocales();
  const { translate } = useLocales();

  const openAppointmentModal = () => {};

  const toggleLanguageHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      onChangeLang(currentLang.value === 'ar' ? 'en' : 'ar');
      setIsLoading(false);
    }, 500);
  };
  return (
    <>
      {isLoading && (
        <Backdrop open sx={{ zIndex: theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <AppBar>
        <Box
          sx={{
            width: '600px',
            display: 'flex',
            justifyContent: 'center',

            mx: 'auto',
            mt: 1.5,
            borderRadius: 1.25,
            p: 0.5,
            ...bgBlur({ color: '#000', opacity: 0.45, blur: 10 }),
          }}
        >
          {/* <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo small />
          </Box> */}

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            {mdUp && <NavDesktop data={navConfig} />}

            <IconButton disableRipple color="primary" onClick={toggleLanguageHandler}>
              {currentLang.value === 'en' ? 'ع' : 'En'}
            </IconButton>
          </Stack>
        </Box>
      </AppBar>
    </>
  );
}

ModernHeader.propTypes = {
  headerOnDark: PropTypes.bool,
};
