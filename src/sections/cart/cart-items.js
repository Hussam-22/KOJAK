import { AnimatePresence, m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import getVariant from 'src/components/animate/variants/get-variant';
import DeleteConfirmationDialog from 'src/components/Dialog/deleteConfirmationDialog';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import SvgColor from 'src/components/svg-color/svg-color';
import { CART_FORM } from 'src/config-global';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useResponsive } from 'src/hooks/use-responsive';
import {
  rdxFormPayload,
  rdxLoadCartFromStorage,
  rdxToggleDrawer,
  rdxUpdateCart,
  rdxUpdatePartQty,
} from 'src/redux/slices/products';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

function CartItems() {
  const dispatch = useDispatch();
  const smUp = useResponsive('up', 'sm');
  const theme = useTheme();
  const { fsGetCartParts } = useAuthContext();
  const { cart } = useSelector((state) => state.products);
  const [cartItems, setCartItems] = useState([]);
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');
  const [open, setOpen] = useState(false);

  const openDrawerHandler = () => {
    const parts = cartItems.map((item) => item.partData.docID);
    dispatch(rdxFormPayload({ source: CART_FORM, parts }));
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

  const removeAllItemsHandler = (action) => {
    if (action) {
      // CLEAR LOCAL-STORAGE AND CLOSE
      dispatch(rdxLoadCartFromStorage([]));
      setLocalStorageCart([]);
      setOpen(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
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
                  sx={{ borderRadius: 1, bgcolor: 'background.neutral', p: 2 }}
                  component={m.div}
                  {...getVariant('fadeInLeft')}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
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
                    {smUp && <PartInfo partData={cartItem.partData} />}
                    <ActionButtons
                      partNumber={cartItem.partData.partNumber}
                      qty={cartItem.qty}
                      onDeleteClickHandler={onDeleteClickHandler}
                      onUpdateQtyClickHandler={onUpdateQtyClickHandler}
                      price={cartItem.partData.price}
                    />
                  </Stack>
                  {!smUp && <PartInfo partData={cartItem.partData} />}
                </Box>
              ))}
          </AnimatePresence>
        </Stack>
      )}

      {cartItems.length !== 0 && (
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          spacing={2}
          sx={{ justifyContent: { sm: 'flex-end', xs: 'center' }, pt: 4 }}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<Iconify icon="pepicons-pencil:trash-circle" width={24} height={24} />}
            // onClick={removeAllItemsHandler}
            onClick={() => setOpen(true)}
          >
            Remove All
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={
              <Iconify icon="material-symbols:phone-callback-sharp" width={24} height={24} />
            }
            onClick={openDrawerHandler}
          >
            Send Parts & Request Callback
          </Button>
        </Stack>
      )}
      <DeleteConfirmationDialog
        open={open}
        content="Are you sure you want to remove all parts from the cart ?"
        handleClose={() => setOpen(false)}
        action={(action) => removeAllItemsHandler(action)}
      />
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
      <SvgColor src="/assets/illustrations/cart-icon.svg" sx={{ width: 200, height: 200 }} />
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
      <Typography variant="body2">{category}</Typography>
      <Typography variant="body2">{itemGroup}</Typography>

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
        <Typography variant="caption">{brandClass}</Typography>
        <Typography variant="caption">{brandModel}</Typography>
      </Stack>
    </Stack>
  );
}
PartInfo.propTypes = { partData: PropTypes.object };

// ----------------------------------------------------------------------------

function ActionButtons({ partNumber, qty, onDeleteClickHandler, onUpdateQtyClickHandler, price }) {
  // if (!localStorageCart.some((storageItem) => storageItem.partNumber === partNumber))
  //   SetLocalStorageCart((prevState) => [...prevState, { partNumber, qty: 1 }]);

  const updateQty = (quantity) => {
    onUpdateQtyClickHandler(partNumber, quantity);
  };

  const onDeleteClick = () => {
    onDeleteClickHandler(partNumber);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="subtitle2" sx={{ color: 'success.main' }}>
        {(qty * price).toFixed(2)} AED
      </Typography>
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
  price: PropTypes.number,
  partNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  qty: PropTypes.number,
  onDeleteClickHandler: PropTypes.func,
  onUpdateQtyClickHandler: PropTypes.func,
};
