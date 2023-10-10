import { Box, Divider, Container } from '@mui/material';

import CartItems from 'src/sections/cart/cart-items';
import CartHeader from 'src/sections/cart/cart-header';

export default function CartView() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container sx={{ py: 8 }}>
        <CartHeader />
        <Divider sx={{ borderStyle: 'dashed', my: 3, color: (theme) => theme.palette.divider }} />
        <CartItems />
      </Container>
    </Box>
  );
}
