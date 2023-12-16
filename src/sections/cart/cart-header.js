
import { Box, Typography } from '@mui/material';


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
