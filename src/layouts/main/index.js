import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import ModernHeader from 'src/layouts/main/modern-header';
import WhatsAppForm from 'src/layouts/main/whatsApp-form';
import { SplashScreen } from 'src/components/loading-screen';

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
  const actionPage = (arr) => arr.some((path) => pathname === path);
  const { isLoading } = useSelector((state) => state.properties);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 1,
          // scrollSnapType: pathname === '/' ? 'y mandatory' : 'none',
          // maxHeight: pathname === '/' ? '100vh' : 'unset',
          // overflowY: 'scroll',
        }}
      >
        <Header headerOnDark={actionPage(pathsOnDark)} />
        {/* <ModernHeader /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {!actionPage(spacingLayout) && <Spacing />}
          {isLoading && <SplashScreen />}
          {children}
        </Box>

        <Footer />
      </Box>
      <WhatsAppForm />
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
