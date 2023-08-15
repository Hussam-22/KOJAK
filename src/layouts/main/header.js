import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
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

  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { currentLang, onChangeLang } = useLocales();

  const toggleLanguageHandler = async () =>
    currentLang.value === 'en' ? onChangeLang('ar') : onChangeLang('en');

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
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          maxWidth="xl"
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo small />

            {/* <Link href="https://zone-docs.vercel.app/changelog" target="_blank" rel="noopener">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.1.0
              </Label>
            </Link> */}
          </Box>

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            {mdUp && <NavDesktop data={navConfig} />}
            {/* <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />

              <SettingsButton />
            </Stack> */}

            {mdUp && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(paths.website.properties)}
                >
                  Explore Properties
                </Button>
                <IconButton
                  color="primary"
                  size="small"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'common.white',
                    px: 1.25,
                    '&:hover': {
                      color: 'common.black',
                      backgroundColor: 'common.white',
                    },
                  }}
                  onClick={toggleLanguageHandler}
                >
                  {currentLang.value === 'en' ? 'Ar' : 'En'}
                </IconButton>
              </Stack>
            )}
          </Stack>

          {!mdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
