import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, useTheme, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import {
  rdxUpdateCart,
  rdxFormPayload,
  rdxToggleDrawer,
  rdxUpdatePartQty,
} from 'src/redux/slices/products';

function SparePartsDetailsActionButtons({ partDetails }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { fsGetCartParts } = useAuthContext();
  const { cart } = useSelector((state) => state.products);

  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');

  return partDetails.stock === 0 ? (
    <OutOfStockActionBar partDetails={partDetails} />
  ) : (
    <AvailableStockActionBar partDetails={partDetails} />
  );
}
export default SparePartsDetailsActionButtons;

SparePartsDetailsActionButtons.propTypes = { partDetails: PropTypes.object };

// ? ----------------------------------------------------------------------------
function AvailableStockActionBar({ partDetails }) {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');
  const dispatch = useDispatch();
  const mdUp = useResponsive('up', 'md');
  const [tempQty, setTempQty] = useState(1);

  const { partNumber } = partDetails;
  const cartQty =
    localStorageCart?.find((part) => part.partNumber === partDetails.partNumber)?.qty || 0;

  useEffect(() => {
    if (cartQty !== 0) setTempQty(cartQty);
  }, [cartQty]);

  const onRemoveClickHandler = () => {
    setLoadingRemove(true);
    setLocalStorageCart((prevState) =>
      prevState.filter((localStorageItem) => localStorageItem.partNumber !== partNumber)
    );
    setTimeout(() => {
      dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
      setLoadingRemove(false);
      setTempQty(1);
    }, 1000);
  };

  const onAddClickHandler = () => {
    setLoadingUpdate(true);
    // If item does not exists in cart --> add it
    if (cartQty === 0) {
      console.log('NEW');
      setLocalStorageCart((prevState) => [...prevState, { partNumber, qty: tempQty }]);
      setTimeout(() => {
        dispatch(rdxUpdateCart({ partNumber, qty: tempQty }));
        setLoadingUpdate(false);
      }, 1000);
    }

    if (cartQty !== 0) {
      console.log('UPDATE');
      // If item exists in cart --> update Qty
      setLocalStorageCart((prevState) => {
        const index = prevState.findIndex(
          (localStorageItem) => localStorageItem.partNumber === partDetails.partNumber
        );
        prevState[index] = { ...prevState[index], qty: tempQty };
        return prevState;
      });
      setTimeout(() => {
        dispatch(rdxUpdatePartQty({ partNumber, qty: tempQty, isItemPage: true }));
        setLoadingUpdate(false);
      }, 1000);
    }
  };

  const onUpdateQtyClickHandler = (newQty) => {
    setTempQty((prevQty) => prevQty + newQty);
  };

  // ----------------------------------------------------------------------------
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="column" alignItems="center">
        <Typography variant="caption" color="secondary">
          Qty
        </Typography>
        <Stack direction="row" alignItems="center">
          <IconButton disableRipple onClick={() => onUpdateQtyClickHandler(+1)}>
            <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'success.main' }} />
          </IconButton>
          <Typography sx={{ whiteSpace: 'nowrap' }}>x {tempQty}</Typography>
          <IconButton
            disableRipple
            onClick={() => onUpdateQtyClickHandler(-1)}
            disabled={tempQty === 1}
          >
            <Iconify
              icon="bxs:down-arrow"
              width={16}
              height={16}
              sx={{ color: tempQty === 0 ? 'secondary.main' : 'error.main' }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <LoadingButton
        loading={loadingUpdate}
        variant="contained"
        color="primary"
        sx={{ whiteSpace: 'nowrap' }}
        disabled={cartQty === tempQty}
        startIcon={
          <Iconify
            icon="carbon:shopping-cart-plus"
            width={24}
            height={24}
            sx={{ color: 'common.white' }}
          />
        }
        onClick={onAddClickHandler}
      >
        {cartQty !== 0 ? `Update Cart` : 'Add to Cart'}
      </LoadingButton>
      <LoadingButton
        loading={loadingRemove}
        variant="contained"
        color="error"
        sx={{ whiteSpace: 'nowrap' }}
        disabled={cartQty === 0}
        startIcon={
          <Iconify icon="ph:trash" width={24} height={24} sx={{ color: 'common.white' }} />
        }
        onClick={onRemoveClickHandler}
      >
        Remove
      </LoadingButton>
    </Stack>
  );
}
AvailableStockActionBar.propTypes = { partDetails: PropTypes.object };

// ? ----------------------------------------------------------------------------
function OutOfStockActionBar({ partDetails }) {
  const dispatch = useDispatch();
  const openDrawerHandler = () => {
    dispatch(rdxToggleDrawer());
    dispatch(
      rdxFormPayload({
        subject: `Out of Stock part Inquiry - ${partDetails.partNumber}`,
        messageText: `I would like to inquire about the possibility to arrange the following out-of-stock part 
    Part number: ${partDetails.partNumber}
    Part description: ${partDetails.description}`,
      })
    );
  };
  return (
    <Box sx={{ px: 3 }}>
      <Button
        onClick={openDrawerHandler}
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
OutOfStockActionBar.propTypes = { partDetails: PropTypes.object };
