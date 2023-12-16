import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useTheme } from '@mui/system';
import { Box, List, Stack, Drawer, IconButton } from '@mui/material';

import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import Logo from 'src/components/logo/Logo';
import { NAV } from 'src/layouts/config-layout';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import NavList from 'src/layouts/main/nav/mobile/nav-list';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { navConfig } from 'src/layouts/main/config-navigation';
import NavDesktop from 'src/layouts/main/nav/desktop/nav-desktop';

export default function ModernHeader() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isHome = pathname.includes('landing');

  const navigateToSearchParts = () => {
    navigate(paths.website.services);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        px: { md: 3, xs: 1 },
        position: 'fixed',
        top: 15,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        borderRadius: 1,
        // display: 'inline-block',
        // width: { xs: '95dvw', md: '75dvw' },
        // border: `solid 1px ${theme.palette.grey[800]}`,
        zIndex: 99,
        ...bgBlur({ color: theme.palette.common.white, blur: 85, opacity: 0.85 }),
        border: `solid 1px ${theme.palette.primary.main}`,
      }}
    >
      <Stack spacing={10} direction="row" alignItems="center" justifyContent="space-between">
        <Logo />

        {isMdUp && (
          <>
            <NavDesktop data={navConfig} />
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ whiteSpace: 'nowrap' }}
              onClick={navigateToSearchParts}
            >
              Explore Inventory
            </Button> */}
          </>
        )}

        {!isMdUp && (
          <>
            <Stack direction="row" alignItems="center">
              {/* <Button variant="contained" color="primary" size="small">
                Find Spare-part
              </Button> */}
              <IconButton sx={{ color: 'inherit' }} onClick={navigateToSearchParts}>
                <Iconify icon="wpf:search" />
              </IconButton>

              <IconButton onClick={handleOpen} sx={{ ml: 1, color: 'inherit' }}>
                <Iconify icon="carbon:menu" />
              </IconButton>
            </Stack>

            <Drawer
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  pb: 5,
                  width: NAV.W_BASE,
                },
              }}
            >
              <Scrollbar>
                <Box sx={{ p: 2 }}>
                  <Logo />
                </Box>

                <List component="nav" disablePadding>
                  {navConfig.map((link) => (
                    <NavList key={link.title} item={link} />
                  ))}
                </List>

                {/* <Box sx={{ px: 3, py: 2 }}>
                  <Button variant="contained" color="primary" onClick={navigateToSearchParts}>
                    Explore Inventory
                  </Button>
                </Box> */}
              </Scrollbar>
            </Drawer>
          </>
        )}
      </Stack>
    </Box>
  );
}
