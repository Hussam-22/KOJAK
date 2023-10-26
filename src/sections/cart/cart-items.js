import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Link,
  Stack,
  Button,
  Divider,
  useTheme,
  Skeleton,
  Typography,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import getVariant from 'src/components/animate/variants/get-variant';
import OpenCartIconButton from 'src/layouts/main/open-cart-icon-button';
import { rdxUpdateCart, rdxToggleDrawer, rdxUpdatePartQty } from 'src/redux/slices/products';

function CartItems() {
  const dispatch = useDispatch();
  const isMobile = useResponsive('down', 'sm');
  const theme = useTheme();
  const { fsGetCartParts } = useAuthContext();
  const { cart } = useSelector((state) => state.products);
  const [cartItems, setCartItems] = useState([]);
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');

  const openDrawerHandler = () => {
    dispatch(rdxToggleDrawer());
  };

  const updateCartState = (partNumber) =>
    setCartItems((state) =>
      state.filter((cartItem) => cartItem.partData.partNumber !== partNumber)
    );

  useEffect(() => {
    if (cart?.length === 0) {
      setCartItems([]);
    }
  }, [cart, localStorageCart?.length]);

  useEffect(() => {
    (async () => {
      if (cart.length !== 0) setCartItems(await fsGetCartParts(cart));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteClickHandler = (partNumber) => {
    setLocalStorageCart((prevState) =>
      prevState.filter((localStorageItem) => localStorageItem.partNumber !== partNumber)
    );
    dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
    updateCartState(partNumber);
  };

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

  return (
    <Box sx={{ py: 4, px: { xs: 1 } }}>
      {cart.length !== 0 && cartItems.length === 0 && <PartsSkeleton cartLength={cart.length} />}
      {cart.length === 0 && cartItems.length === 0 && <YourCartIsEmpty />}

      {cartItems.length !== 0 && (
        <Stack direction="column" spacing={1}>
          <AnimatePresence initial={false}>
            {cartItems
              .sort((a, b) => b.partData.id - a.partData.id)
              .map((cartItem, index) => (
                <Box
                  key={cartItem.partData.partNumber}
                  sx={{ borderRadius: 1, bgcolor: 'background.default' }}
                  component={m.div}
                  {...getVariant('fadeInLeft')}
                >
                  <Stack
                    direction={{ md: 'row', sm: 'column' }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ md: 'center', xs: 'unset' }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Link
                        component={RouterLink}
                        to={paths.website.sparePartDetails + cartItem.partData.docID}
                      >
                        <Image
                          src={
                            cartItem.imageUrl === undefined
                              ? '/assets/illustrations/part-unavailable.svg'
                              : cartItem.imageUrl
                          }
                          width={85}
                          height={85}
                          alt={`spare-part${cartItem.partData.partNumber}`}
                          sx={{ borderRadius: 1 }}
                        />
                      </Link>
                      {isMobile && (
                        <ActionButtons
                          partNumber={cartItem.partData.partNumber}
                          qty={cartItem.qty}
                          onDeleteClickHandler={onDeleteClickHandler}
                          onUpdateQtyClickHandler={onUpdateQtyClickHandler}
                        />
                      )}
                    </Stack>
                    <PartInfo partData={cartItem.partData} />
                    {!isMobile && (
                      <ActionButtons
                        partNumber={cartItem.partData.partNumber}
                        qty={cartItem.qty}
                        onDeleteClickHandler={onDeleteClickHandler}
                        onUpdateQtyClickHandler={onUpdateQtyClickHandler}
                      />
                    )}
                  </Stack>
                  <Divider
                    sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider, my: 2 }}
                    flexItem
                  />
                </Box>
              ))}
          </AnimatePresence>
        </Stack>
      )}

      {cartItems.length !== 0 && (
        <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'center' }, pt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Iconify icon="ant-design:dollar-twotone" width={24} height={24} />}
            onClick={openDrawerHandler}
          >
            Inquire About Part Price(s)
          </Button>
        </Box>
      )}
    </Box>
  );
}
export default CartItems;
// CartItems.propTypes = { tables: PropTypes.array };

// ----------------------------------------------------------------------------
function YourCartIsEmpty() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }} flexItem />
      <OpenCartIconButton disabled />
      <Typography variant="h3" sx={{ color: 'secondary.main' }}>
        Your Cart is Empty !!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Iconify icon="fluent-emoji-high-contrast:plus" width={24} height={24} />}
        onClick={() => navigate(paths.website.spareParts)}
      >
        Add Spare Parts to Cart
      </Button>
    </Stack>
  );
}

// ----------------------------------------------------------------------------

function PartsSkeleton({ cartLength }) {
  const theme = useTheme();
  return [...Array(cartLength)].map((item, index) => (
    <Stack key={index} direction="column" spacing={0} maxHeight={200}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Skeleton variant="text" width="1.25%" />
        <Skeleton variant="rectangular" width={85} height={85} sx={{ borderRadius: 1 }} />
        <Stack sx={{ p: 1, flexGrow: 1 }}>
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="35%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="25%" />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={25} height={25} />
        </Stack>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }} flexItem />
    </Stack>
  ));
}

PartsSkeleton.propTypes = { cartLength: PropTypes.number, borderColor: PropTypes.string };

// ----------------------------------------------------------------------------

function PartInfo({ partData }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { partNumber, description, category, itemGroup, brandClass, brandModel, docID } = partData;

  return (
    <Stack sx={{ flexGrow: 1, pt: { xs: 1 } }}>
      <Typography color="secondary" variant="body2">
        {partNumber}
      </Typography>
      <Link component={RouterLink} to={paths.website.sparePartDetails + docID}>
        {description}
      </Link>
      {/* <Typography color="primary">{description}</Typography> */}
      <Typography color="white" variant="body2">
        {category}
      </Typography>
      <Typography color="white" variant="body2">
        {itemGroup}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        divider={
          <Divider
            orientation="vertical"
            sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }}
            flexItem
          />
        }
      >
        <Stack direction="row" spacing={2}>
          {brandClass.map((classValue) => (
            <Typography key={classValue} variant="caption">
              {classValue}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          {brandModel.map((modelValue) => (
            <Typography key={modelValue} variant="caption">
              {modelValue}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
PartInfo.propTypes = { partData: PropTypes.object };

// ----------------------------------------------------------------------------

function ActionButtons({ partNumber, qty, onDeleteClickHandler, onUpdateQtyClickHandler }) {
  // if (!localStorageCart.some((storageItem) => storageItem.partNumber === partNumber))
  //   SetLocalStorageCart((prevState) => [...prevState, { partNumber, qty: 1 }]);

  const updateQty = (quantity) => {
    onUpdateQtyClickHandler(partNumber, quantity);
  };

  const onDeleteClick = () => {
    onDeleteClickHandler(partNumber);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="column" alignItems="center">
        <IconButton disableRipple onClick={() => updateQty(+1)}>
          <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
        <Typography>x {qty}</Typography>
        <IconButton disableRipple onClick={() => updateQty(-1)} disabled={qty === 1}>
          <Iconify icon="bxs:down-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Stack>
      <IconButton onClick={onDeleteClick} disableRipple>
        <Iconify icon="ph:trash" width={26} height={26} sx={{ color: 'error.main' }} />
      </IconButton>
    </Stack>
  );
}

ActionButtons.propTypes = {
  partNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  qty: PropTypes.number,
  onDeleteClickHandler: PropTypes.func,
  onUpdateQtyClickHandler: PropTypes.func,
};
