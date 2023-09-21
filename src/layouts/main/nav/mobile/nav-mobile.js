import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { usePathname } from 'src/routes/hooks';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';

import { NAV } from '../../../config-layout';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavMobile({ data, toggleLanguage }) {
  const theme = useTheme();
  const pathname = usePathname();
  const navigate = useNavigate();
  const mobileOpen = useBoolean();
  const { translate, currentLang, onChangeLang } = useLocales();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Stack direction="row" spacing={0}>
        <Box sx={{ width: 48, height: 48 }} component={IconButton} onClick={toggleLanguage}>
          <Image src="/assets/illustrations/translate.svg" />
        </Box>

        <IconButton
          onClick={mobileOpen.onTrue}
          sx={{ ml: 1, color: 'inherit' }}
          aria-label="open-menu"
        >
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
            bgcolor: 'background.default',
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ ml: 1.5, my: 3 }} small light />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>

          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(paths.website.bookAppointment)}
            >
              {translate('common.bookAppointment')}
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
};
