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

      <Typography variant="caption" sx={{ color: 'warning.main' }}>
        {`Our sales representative will reach out to you within one hour, unless your request falls outside of our regular business hours or after the afternoon break. If that's the case, we will get in touch with you on the following day. Our business hours are from 8 AM to 1 PM and from 4 PM to 8 PM, Saturday through Thursday, with an afternoon break in between.`}
      </Typography>
    </Box>
  );
}
export default CartHeader;
// CartHeader.propTypes = { tables: PropTypes.array };
