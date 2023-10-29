import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Divider, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { OUT_OF_STOCK, WHATSAPP_FORM, WHATSAPP_MOBILE } from 'src/config-global';
import {
  rdxUpdateCart,
  rdxFormPayload,
  rdxToggleDrawer,
  rdxUpdatePartQty,
} from 'src/redux/slices/products';

function SparePartsDetailsActionButtons({ partDetails }) {
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
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');
  const dispatch = useDispatch();
  const [tempQty, setTempQty] = useState(1);
  const { fsUpdatePartStatistics } = useAuthContext();

  const { partNumber } = partDetails;
  const cartQty =
    localStorageCart?.find((part) => part.partNumber === partDetails.partNumber)?.qty || 0;

  useEffect(() => {
    if (cartQty !== 0) setTempQty(cartQty);
  }, [cartQty]);

  const onRemoveClickHandler = () => {
    setLoadingUpdate(true);
    setLocalStorageCart((prevState) =>
      prevState.filter((localStorageItem) => localStorageItem.partNumber !== partNumber)
    );
    setTimeout(() => {
      dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
      setLoadingUpdate(false);
      setTempQty(1);
    }, 1000);
  };

  const onAddClickHandler = () => {
    setLoadingUpdate(true);
    // If item does not exists in cart --> add it
    if (cartQty === 0) {
      setLocalStorageCart((prevState) =>
        prevState ? [...prevState, { partNumber, qty: tempQty }] : [{ partNumber, qty: tempQty }]
      );
      setTimeout(() => {
        dispatch(rdxUpdateCart({ partNumber, qty: tempQty }));
        setLoadingUpdate(false);
      }, 1000);
    }

    if (cartQty !== 0) {
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

  const onWhatsAppClickHandler = async () => {
    // Create WhatsApp link
    setLoadingUpdate(true);
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_MOBILE}&text=${encodeURI(
      `I would like to get quote about part No. ${partDetails.partNumber} available on the following link on your Kojak Spare Parts website : ${window.location.href}`
    )}&app_absent=0`;

    // UPDATE PART STATISTICS - WHATSAPP
    await fsUpdatePartStatistics(partDetails, WHATSAPP_FORM);

    // TAKE CUSTOMER TO WHATSAPP
    setTimeout(() => {
      setLoadingUpdate(false);
      if (!loadingUpdate) window.location.href = url;
    }, 1000);
  };

  // ----------------------------------------------------------------------------
  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
    >
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

      <Stack direction="row" spacing={2}>
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
          loading={loadingUpdate}
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

      <Button
        onClick={onWhatsAppClickHandler}
        variant="outlined"
        color="success"
        startIcon={
          <Iconify
            icon="ic:baseline-whatsapp"
            width={24}
            height={24}
            sx={{ color: 'common.white' }}
          />
        }
      >
        Get quick quote via whatsApp
      </Button>
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
        source: OUT_OF_STOCK,
        parts: [partDetails.docID],
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
