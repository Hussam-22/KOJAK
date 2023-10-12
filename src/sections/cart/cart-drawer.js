import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Stack,
  Drawer,
  Button,
  Divider,
  useTheme,
  Container,
  Typography,
} from '@mui/material';

import Image from 'src/components/image/Image';
import { rdxToggleDrawer } from 'src/redux/slices/products';
import CartDrawerForm from 'src/sections/cart/cart-drawer-form';

function CartDrawer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isDrawerOpen } = useSelector((state) => state.products);
  const toggleDrawer = () => dispatch(rdxToggleDrawer());
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      PaperProps={{ sx: { bgcolor: 'grey.800', boxShadow: 0 } }}
    >
      <Box sx={{ width: { md: '25dvw', xs: '75dvw' }, p: 3 }}>
        <Typography variant="h5" color="primary">
          Contact Info
        </Typography>
        <Typography>Please provide your information to call you back</Typography>
        <Divider
          sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider, my: 3 }}
          flexItem
        />
        <CartDrawerForm />
      </Box>
    </Drawer>
  );
}
export default CartDrawer;
// CartDrawer.propTypes = { tables: PropTypes.array };
