import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack, Button, useTheme, Container, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { rdxUpdateCart, rdxUpdatePartQty } from 'src/redux/slices/products';

function SparePartsDetailsActionButtons({ partDetails }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { fsGetCartParts } = useAuthContext();
  const { cart } = useSelector((state) => state.products);

  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');

  return partDetails.stock === 0 ? (
    <OutOfStockActionBar />
  ) : (
    <AvailableStockActionBar partDetails={partDetails} />
  );
}
export default SparePartsDetailsActionButtons;

SparePartsDetailsActionButtons.propTypes = { partDetails: PropTypes.object };

// ? ----------------------------------------------------------------------------
function AvailableStockActionBar({ partDetails }) {
  const [cartItems, setCartItems] = useState([]);
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');
  const dispatch = useDispatch();

  const cartQty =
    localStorageCart.find((part) => part.partNumber === partDetails.partNumber)?.qty || 1;

  const onUpdateQtyClickHandler = (partNumber, qty) => {
    // update local storage
    setLocalStorageCart((prevState) => {
      const index = prevState.findIndex(
        (localStorageItem) => localStorageItem.partNumber === partNumber
      );
      prevState[index] = { ...prevState[index], qty: prevState[index].qty + qty };
      return prevState;
    });

    // update Redux
    dispatch(rdxUpdatePartQty({ partNumber, qty }));

    // update current view state
    setCartItems((state) => {
      const index = state.findIndex((cartItem) => cartItem.partData.partNumber === partNumber);
      state[index] = { ...state[index], qty: state[index].qty + qty };
      return state;
    });
  };
  // ----------------------------------------------------------------------------
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ px: 3 }}>
      <Stack direction="column" alignItems="center">
        <Typography variant="caption" color="secondary">
          Qty
        </Typography>
        <Stack direction="row" alignItems="center">
          <IconButton disableRipple onClick={() => onUpdateQtyClickHandler(+1)}>
            <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
          </IconButton>
          <Typography>x {cartQty}</Typography>
          <IconButton disableRipple onClick={() => onUpdateQtyClickHandler(-1)} disabled={0 === 1}>
            <Iconify
              icon="bxs:down-arrow"
              width={16}
              height={16}
              sx={{ color: 'secondary.main' }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        startIcon={
          <Iconify
            icon="carbon:shopping-cart-plus"
            width={32}
            height={32}
            sx={{ color: 'common.white' }}
          />
        }
      >
        Add to Cart
      </Button>

      <Button
        variant="contained"
        color="success"
        startIcon={
          <Iconify icon="mdi:whatsapp" width={32} height={32} sx={{ color: 'common.white' }} />
        }
      >
        Get Quote via WhatsApp
      </Button>
    </Stack>
  );
}
AvailableStockActionBar.propTypes = { partDetails: PropTypes.object };

// ? ----------------------------------------------------------------------------
function OutOfStockActionBar() {
  return (
    <Box sx={{ px: 3 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={
          <Iconify
            icon="basil:headset-outline"
            width={32}
            height={32}
            sx={{ color: 'common.white' }}
          />
        }
      >
        Contact us for possibility to arrange part
      </Button>
    </Box>
  );
}
