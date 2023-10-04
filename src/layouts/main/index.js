import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import WhatsAppForm from 'src/layouts/main/whatsApp-form';
import { SplashScreen } from 'src/components/loading-screen';

import { HEADER } from '../config-layout';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

const pathsOnDark = ['/', '/ar/'];

const spacingLayout = [...pathsOnDark];

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
