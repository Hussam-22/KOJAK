import { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// @mui
import { Box, Badge, styled, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 13,
    border: `2px solid ${theme.palette.common.dark}`,
    padding: 5,
    fontSize: '18px',
  },
}));

function CartIconButton() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.products);

  console.log(cart);

  const cartItemsQty = cart.reduce((accum, item) => accum + item.qty, 0);

  const cartIcon = (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <title>70 Basic icons by Xicons.co</title>
        <circle cx="20" cy="40" r="4" fill="#FFFFFF" />
        <path
          d="M12.3,17.3A2,2,0,0,1,10.41,16L7.59,8H3A2,2,0,0,1,3,4H9a2,2,0,0,1,1.88,1.33l3.3,9.3A2,2,0,0,1,12.3,17.3Z"
          fill="#FFFFFF"
        />
        <path
          d="M41.42,33H16.51a2,2,0,0,1-1.92-1.45L9,12H45.47a2,2,0,0,1,1.95,2.46l-4,17A2,2,0,0,1,41.42,33Z"
          fill="#666666"
        />
        <circle cx="38" cy="40" r="4" fill="#FFFFFF" />
      </g>
    </svg>
  );

  return (
    <StyledBadge badgeContent={cartItemsQty} color="warning">
      <Box
        sx={{ width: 48, height: 48 }}
        component={IconButton}
        onClick={() => navigate(paths.website.cart)}
        aria-label="open-cart"
      >
        {cartIcon}
      </Box>
    </StyledBadge>
  );
}

// CartIconButton.propTypes = {
//   light: PropTypes.bool,
//   sx: PropTypes.object,
// };

export default memo(CartIconButton);
