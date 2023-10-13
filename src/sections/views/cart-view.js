import { Box, Divider, Container } from '@mui/material';

import CartItems from 'src/sections/cart/cart-items';
import CartHeader from 'src/sections/cart/cart-header';
import CartDrawer from 'src/sections/cart/cart-drawer';

export default function CartView() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container sx={{ py: 8 }}>
        <CartHeader />
        <CartItems />
        <CartDrawer />
      </Container>
    </Box>
  );
}
