import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  Skeleton,
  useTheme,
  Container,
  IconButton,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { rdxUpdateCart } from 'src/redux/slices/products';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import OpenCartIconButton from 'src/layouts/main/open-cart-icon-button';

function CartItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fsGetCartParts } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useSelector((state) => state.products);
  const theme = useTheme();
  const [_, setLocalStorageCart] = useLocalStorage('cart');

  const updateCartState = (partNumber) =>
    setCartItems((state) =>
      state.filter((cartItem) => cartItem.partData.partNumber !== partNumber)
    );

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

  const renderSkeleton = [...Array(cart.length)].map((item, index) => (
    <Stack key={index} direction="column" spacing={1}>
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

  return (
    <Box sx={{ py: 4 }}>
      {cart.length !== 0 && cartItems.length === 0 && renderSkeleton}
      {cart.length === 0 && cartItems.length === 0 && (
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
      )}

      {cartItems.length !== 0 && (
        <Stack
          direction="column"
          spacing={1}
          divider={
            <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }} flexItem />
          }
        >
          {cartItems
            .sort((a, b) => b.partData.id - a.partData.id)
            .map((cartItem, index) => (
              <Box
                key={cartItem.partData.partNumber}
                sx={{ borderRadius: 1, bgcolor: 'background.default' }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">{index + 1}</Typography>
                  <Image
                    src={cartItem.imageUrl}
                    width={85}
                    height={85}
                    alt={`spare-part${cartItem.partData.partNumber}`}
                    sx={{ borderRadius: 1 }}
                  />
                  <PartInfo partData={cartItem.partData} />
                  <ActionButtons
                    partNumber={cartItem.partData.partNumber}
                    qty={cartItem.qty}
                    onDeleteClickHandler={onDeleteClickHandler}
                  />
                </Stack>
              </Box>
            ))}
        </Stack>
      )}

      {cartItems.length !== 0 && (
        <Divider
          sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider, my: 2 }}
          flexItem
        />
      )}

      {cartItems.length !== 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Iconify icon="ant-design:dollar-twotone" width={24} height={24} />}
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

function PartInfo({ partData }) {
  const theme = useTheme();
  const { partNumber, partName, category, itemGroup, brandClass, brandModel } = partData;

  return (
    <Stack sx={{ p: 1, flexGrow: 1 }}>
      <Typography color="secondary" variant="body2">
        {partNumber}
      </Typography>
      <Typography color="primary">{partName}</Typography>
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

function ActionButtons({ partNumber, qty, onDeleteClickHandler }) {
  // if (!localStorageCart.some((storageItem) => storageItem.partNumber === partNumber))
  //   SetLocalStorageCart((prevState) => [...prevState, { partNumber, qty: 1 }]);

  const onDeleteClick = () => {
    onDeleteClickHandler(partNumber);
  };

  return (
    <Stack direction="row" spacing={3}>
      <Stack direction="column" alignItems="center">
        <IconButton>
          <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
        <Typography>x {qty}</Typography>
        <IconButton>
          <Iconify icon="bxs:down-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Stack>
      <IconButton onClick={onDeleteClick}>
        <Iconify icon="ph:trash" width={26} height={26} sx={{ color: 'error.main' }} />
      </IconButton>
    </Stack>
  );
}

ActionButtons.propTypes = {
  partNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  qty: PropTypes.number,
  onDeleteClickHandler: PropTypes.func,
};
