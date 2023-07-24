import PropTypes from 'prop-types';

import { Fab } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';

import { usePathname } from 'src/routes/hooks';
import Iconify from 'src/components/iconify/Iconify';

import { HEADER } from '../config-layout';

import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career', '/career/', '/travel', '/travel/'];

const spacingLayout = [
  ...pathsOnDark,
  '/',
  '/e-learning',
  '/e-learning/',
  '/marketing',
  '/marketing/',
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const theme = useTheme();

  const actionPage = (arr) => arr.some((path) => pathname === path);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Header headerOnDark={actionPage(pathsOnDark)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // ...bgGradient({
            //   direction: 'to bottom',
            //   startColor: `${alpha(theme.palette.common.white, 0.8)} 50%`,
            //   endColor: `${alpha(theme.palette.grey[600], 0.1)} 90%`,
            // }),
          }}
        >
          {!actionPage(spacingLayout) && <Spacing />}

          {children}
        </Box>

        <Footer />
      </Box>
      <Fab
        aria-label="whatsapp"
        sx={{ position: 'fixed', bottom: 15, right: 15, width: 55, height: 55 }}
      >
        <Iconify icon="logos:whatsapp-icon" width={45} />
      </Fab>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
