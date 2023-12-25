import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Button, Backdrop, CircularProgress } from '@mui/material';

import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { usePathname } from 'src/routes/hooks';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

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
  const pathName = usePathname();

  const useDarkLogo = true;
  const light = useDarkLogo && !offset;

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
            ...(!offset &&
              headerOnDark && {
                color: 'common.white',
              }),
            ...(offset && {
              ...bgBlur({ color: theme.palette.background.default }),
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
            <Box>
              <Box sx={{ lineHeight: 0, position: 'relative', mr: 6 }}>
                <Logo small />
                {/* <Logo small /> */}
              </Box>
            </Box>
            {mdUp && <NavDesktop data={navConfig} />}

            {mdUp && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(paths.website.properties)}
              >
                {translate('common.exploreProperties')}
              </Button>
            )}

            {!mdUp && (
              <NavMobile
                data={navConfig}
                toggleLanguage={toggleLanguageHandler}
                useLightIcon={light}
              />
            )}
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
