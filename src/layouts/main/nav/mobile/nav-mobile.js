import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import ModeIcon from 'src/layouts/main/mode-icon';
import OpenCartIconButton from 'src/layouts/main/open-cart-icon-button';
import { useLocales } from 'src/locales';
import { usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import CurrencySwitcher from 'src/components/CurrencySwitcher';
import { NAV } from '../../../config-layout';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavMobile({ data, toggleLanguage, useLightIcon, themeMode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const navigate = useNavigate();
  const mobileOpen = useBoolean();
  const { translate, currentLang, onChangeLang } = useLocales();

  const useLightLogo = themeMode === 'light';

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Stack direction="row" spacing={0} alignItems="center">
        <CurrencySwitcher />
        <ModeIcon light={useLightIcon} />
        <OpenCartIconButton light={useLightIcon} />
        {/* <TranslateIcon light={useLightIcon} toggleLanguageHandler={toggleLanguage} /> */}

        <IconButton onClick={mobileOpen.onTrue} sx={{ color: 'inherit' }} aria-label="open-menu">
          <Iconify icon="carbon:menu" />
        </IconButton>
      </Stack>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ ml: 1.5, my: 3 }} small light={!useLightLogo} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>

          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate(paths.website.spareParts)}
            >
              {translate('common.actionButton')}
            </Button>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
  toggleLanguage: PropTypes.func,
  useLightIcon: PropTypes.bool,
  themeMode: PropTypes.string,
};
