import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Stack,
  Button,
  Divider,
  useTheme,
  Container,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
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
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');
  const dispatch = useDispatch();
  const mdUp = useResponsive('up', 'md');

  const cartQty =
    localStorageCart.find((part) => part.partNumber === partDetails.partNumber)?.qty || 0;

  const onUpdateQtyClickHandler = (qty, partNumber = partDetails.partNumber) => {
    // add part to localStorage & Cart (new)
    if (cartQty === 0) {
      setLocalStorageCart((prevState) => [...prevState, { partNumber, qty: 1 }]);
      dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
    }

    // remove part from LocalStorage & Cart when reaching Zero Qty
    if (cartQty === 1 && qty === -1) {
      console.log('REMOVE');
      setLocalStorageCart((prevState) =>
        prevState.filter((item) => item.partNumber !== partNumber)
      );
      dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
    } else {
      // eslint-disable-next-line no-lonely-if
      if (cartQty !== 0) {
        console.log('+/-');
        setLocalStorageCart((prevState) => {
          const index = prevState.findIndex(
            (localStorageItem) => localStorageItem.partNumber === partDetails.partNumber
          );
          prevState[index] = { ...prevState[index], qty: prevState[index].qty + qty };
          return prevState;
        });

        // update Redux
        dispatch(rdxUpdatePartQty({ partNumber, qty }));
      }
    }
  };
  // ----------------------------------------------------------------------------
  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      justifyContent="space-between"
      sx={{ px: 3 }}
      spacing={2}
      divider={mdUp && <Divider orientation="vertical" />}
    >
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="column" alignItems="center">
          <Typography variant="caption" color="secondary">
            Qty
          </Typography>
          <Stack direction="row" alignItems="center">
            <IconButton disableRipple onClick={() => onUpdateQtyClickHandler(+1)}>
              <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'success.main' }} />
            </IconButton>
            <Typography sx={{ whiteSpace: 'nowrap' }}>x {cartQty}</Typography>
            <IconButton
              disableRipple
              onClick={() => onUpdateQtyClickHandler(-1)}
              disabled={cartQty === 0}
            >
              <Iconify
                icon="bxs:down-arrow"
                width={16}
                height={16}
                sx={{ color: cartQty === 0 ? 'secondary.main' : 'error.main' }}
              />
            </IconButton>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{ whiteSpace: 'nowrap' }}
          disabled={cartQty === 0}
          startIcon={
            <Iconify
              icon="carbon:shopping-cart-plus"
              width={24}
              height={24}
              sx={{ color: 'common.white' }}
            />
          }
        >
          Add to Cart
        </Button>
      </Stack>

      <Button
        variant="contained"
        color="success"
        startIcon={
          <Iconify icon="mdi:whatsapp" width={24} height={24} sx={{ color: 'common.white' }} />
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
