import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Button, Divider } from '@mui/material';

import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import TranslateIcon from 'src/components/logo/translate-icon';

import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();
  const offset = useOffSetTop();
  const navigate = useNavigate();
  const pathName = usePathname();
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();

  const useDarkLogo = pathName !== '/' && pathName !== '/ar/';

  const toggleLanguageHandler = () => {
    setTimeout(() => {
      if (currentLang.value === 'en') {
        navigate(`/ar${pathName}`);
      }
      if (currentLang.value === 'ar') {
        navigate(pathName.replace('/ar/', '/'));
      }
    }, 500);
  };
  return (
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
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo small light={!useDarkLogo && !offset} />
            {/* <Logo small /> */}
          </Box>

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            {mdUp && <NavDesktop data={navConfig(currentLang.value)} />}

            {mdUp && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(paths(currentLang.value).website.services)}
                >
                  {translate('common.actionButton')}
                </Button>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderStyle: 'dashed', borderColor: theme.palette.divider }}
                />
                <TranslateIcon
                  light={!useDarkLogo && !offset}
                  toggleLanguageHandler={toggleLanguageHandler}
                />
              </Stack>
            )}
          </Stack>

          {!mdUp && (
            <NavMobile
              data={navConfig(currentLang.value)}
              toggleLanguage={toggleLanguageHandler}
              light={!useDarkLogo && !offset}
            />
          )}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
