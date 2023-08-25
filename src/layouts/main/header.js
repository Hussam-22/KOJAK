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
import { Backdrop, IconButton, CircularProgress } from '@mui/material';

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

export default function Header({ headerOnDark }) {
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
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(headerOnDark && {
              color: 'common.white',
            }),
            ...(offset && {
              ...bgBlur({ color: theme.palette.background.default }),
              color: 'text.primary',
              height: {
                md: HEADER.H_DESKTOP - 16,
              },
            }),
          }}
        >
          <Container
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            maxWidth="xl"
          >
            <Box sx={{ lineHeight: 0, position: 'relative' }}>
              <Logo small />
            </Box>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
              {mdUp && <NavDesktop data={navConfig} />}

              {mdUp && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(paths.website.bookAppointment)}
                  >
                    {translate('common.exploreProperties')}
                  </Button>
                  {/* <IconButton
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: 'secondary.main',
                      color: 'common.white',
                      px: currentLang.value === 'en' ? 1.75 : 1.15,
                      '&:hover': {
                        color: 'common.black',
                        backgroundColor: 'common.white',
                      },
                    }}
                    onClick={toggleLanguageHandler}
                  >
                    {currentLang.value === 'en' ? 'ع' : 'En'}
                  </IconButton> */}
                </Stack>
              )}
            </Stack>

            {!mdUp && <NavMobile data={navConfig} toggleLanguage={toggleLanguageHandler} />}
          </Container>
        </Toolbar>

        {offset && <HeaderShadow />}
      </AppBar>
    </>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
