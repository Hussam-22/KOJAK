import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import SimpleBackdrop from 'src/components/backdrop';
import { stopLoading } from 'src/redux/slices/siteStore';
import WhatsAppForm from 'src/layouts/main/whatsApp-form';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { rdxLoadCartFromStorage } from 'src/redux/slices/products';

import { HEADER } from '../config-layout';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

const pathsOnDark = ['/', '/about'];

const spacingLayout = [...pathsOnDark];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const actionPage = (arr) => arr.some((path) => pathname === path);
  const { isLoading } = useSelector((state) => state.siteStore);
  const [cart, setCart] = useLocalStorage('cart');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rdxLoadCartFromStorage(cart || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setCart((prevState) =>
  //     prevState
  //       ? [...prevState, { partNumber: '1122334455', qty: 22 }, { partNumber: '555555', qty: 4 }]
  //       : [
  //           { partNumber: '1122334455', qty: 22 },
  //           { partNumber: '555555', qty: 4 },
  //         ]
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onBackDropClose = () => dispatch(stopLoading());

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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {!actionPage(spacingLayout) && <Spacing />}
          {/* {isLoading && <SplashScreen />} */}
          {children}
        </Box>

        <Footer />
      </Box>
      <SimpleBackdrop open={isLoading} handleClose={onBackDropClose} />
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
