import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Divider, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { OUT_OF_STOCK, WHATSAPP_FORM, WHATSAPP_MOBILE } from 'src/config-global';
import { rdxUpdateCart, rdxFormPayload, rdxToggleDrawer } from 'src/redux/slices/products';

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
  const [loading, setLoading] = useState({
    add: false,
    delete: false,
    whatsApp: false,
  });
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
    setLoading((state) => ({ ...state, delete: true }));
    setLocalStorageCart((prevState) =>
      prevState.filter((localStorageItem) => localStorageItem.partNumber !== partNumber)
    );
    setTimeout(() => {
      dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
      setLoading((state) => ({ ...state, delete: false }));
      setTempQty(1);
    }, 1000);
  };

  const onAddClickHandler = () => {
    setLoading((state) => ({ ...state, add: true }));
    setLocalStorageCart((prevState) =>
      prevState ? [...prevState, { partNumber, qty: tempQty }] : [{ partNumber, qty: tempQty }]
    );
    setTimeout(() => {
      dispatch(rdxUpdateCart({ partNumber, qty: tempQty }));
      setLoading((state) => ({ ...state, add: false }));
    }, 1000);
  };

  const onWhatsAppClickHandler = async () => {
    setLoading((state) => ({ ...state, whatsApp: true }));

    // Create WhatsApp link
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_MOBILE}&text=${encodeURI(
      `I would like to get quote about part No. ${partDetails.partNumber} available on the following link on your Kojak Spare Parts website : ${window.location.href}`
    )}&app_absent=0`;

    // UPDATE PART STATISTICS - WHATSAPP
    await fsUpdatePartStatistics(partDetails.docID, WHATSAPP_FORM);

    // TAKE CUSTOMER TO WHATSAPP
    setTimeout(() => {
      setLoading((state) => ({ ...state, whatsApp: false }));
      window.location.href = url;
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${partDetails.partNumber} - ${partDetails.description}`,
          text: `Check out this part on Kojak Spare Parts website`,
          url: window.location.href,
        })
        .then(() => true)
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };

  // ----------------------------------------------------------------------------
  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      alignItems="center"
      justifyContent="space-between"
      divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
    >
      <Stack direction="row" spacing={1}>
        <LoadingButton
          variant="text"
          loading={loading.delete}
          onClick={onRemoveClickHandler}
          disabled={cartQty === 0}
        >
          <Iconify
            icon="ph:trash"
            width={24}
            height={24}
            sx={{ color: cartQty === 0 ? 'grey[400]' : 'error.main' }}
          />
        </LoadingButton>

        <LoadingButton
          variant="text"
          loading={loading.add}
          onClick={onAddClickHandler}
          disabled={cartQty > 0}
        >
          <Iconify
            icon="carbon:shopping-cart-plus"
            width={24}
            height={24}
            sx={{ color: cartQty > 0 ? 'grey[400]' : 'primary.main' }}
          />
        </LoadingButton>

        <LoadingButton variant="text" loading={loading.whatsApp} onClick={onWhatsAppClickHandler}>
          <Iconify
            icon="ic:baseline-whatsapp"
            width={24}
            height={24}
            sx={{ color: 'success.main' }}
          />
        </LoadingButton>

        <IconButton disableRipple onClick={handleShare}>
          <Iconify
            icon="tdesign:share"
            width={24}
            height={24}
            sx={{ color: 'background.opposite' }}
          />
        </IconButton>
      </Stack>
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
