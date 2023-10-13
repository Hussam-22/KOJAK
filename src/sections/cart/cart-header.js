import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function CartHeader() {
  return (
    <Box>
      <Typography variant="h1">Cart</Typography>
      <Typography>
        Review your cart items before sending them to our sales representative
      </Typography>
    </Box>
  );
}
export default CartHeader;
// CartHeader.propTypes = { tables: PropTypes.array };
