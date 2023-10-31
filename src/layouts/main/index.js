import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import WhatsAppForm from 'src/layouts/main/whatsApp-form';
import ModernHeader from 'src/layouts/main/modern-header';
import { SplashScreen } from 'src/components/loading-screen';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { rdxLoadCartFromStorage } from 'src/redux/slices/products';

import { HEADER } from '../config-layout';

import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/', '/about'];

const spacingLayout = [...pathsOnDark];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const actionPage = (arr) => arr.some((path) => pathname === path);
  const { isLoading } = useSelector((state) => state.siteStore);
  const [cart, _] = useLocalStorage('cart');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rdxLoadCartFromStorage(cart || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
