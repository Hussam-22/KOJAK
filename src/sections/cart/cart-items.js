import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import {
  Box,
  Card,
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

function CartItems() {
  const { fsGetCartParts } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useSelector((state) => state.products);
  const theme = useTheme();

  console.log(cartItems);

  useEffect(() => {
    (async () => {
      setCartItems(await fsGetCartParts(cart));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      direction="column"
      spacing={1}
      divider={
        <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }} flexItem />
      }
      sx={{ py: 4 }}
    >
      {cartItems
        .sort((a, b) => b.partData.id - a.partData.id)
        .map((cartItem, index) => (
          <Box
            key={cartItem.partData.partNumber}
            sx={{ borderRadius: 1, bgcolor: 'background.default' }}
          >
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <Typography variant="h5">{index + 1}</Typography>
              <Image
                src={cartItem.imageUrl}
                width={85}
                height={85}
                alt={`spare-part${cartItem.partData.partNumber}`}
                sx={{ borderRadius: 1 }}
              />
              <PartInfo partData={cartItem.partData} />
              <ActionButtons />
            </Stack>
          </Box>
        ))}
    </Stack>
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

function ActionButtons() {
  return (
    <Stack direction="row" spacing={3}>
      <Stack direction="column" alignItems="center">
        <IconButton>
          <Iconify icon="bxs:up-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
        <Typography>x 5</Typography>
        <IconButton>
          <Iconify icon="bxs:down-arrow" width={16} height={16} sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Stack>
      <IconButton>
        <Iconify icon="ph:trash" width={26} height={26} sx={{ color: 'error.main' }} />
      </IconButton>
    </Stack>
  );
}
