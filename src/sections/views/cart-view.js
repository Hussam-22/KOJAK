import { useLoaderData } from 'react-router';

import { Box, Divider, Container } from '@mui/material';

import CartItems from 'src/sections/cart/cart-items';
import CartDrawer from 'src/sections/cart/cart-drawer';
import CartHeader from 'src/sections/cart/cart-header';

export default function CartView() {
  // const menu = useLoaderData();

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

// export async function loader() {
//   return { cartItems: [1, 2, 3, 4, 5], textData: 'This is a loader function' };
// }
