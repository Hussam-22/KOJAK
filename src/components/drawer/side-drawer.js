import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Box, Drawer } from '@mui/material';

import { rdxToggleDrawer } from 'src/redux/slices/products';

function SideDrawer({ open, onClose, children }) {
  const dispatch = useDispatch();
  const toggleDrawer = () => dispatch(rdxToggleDrawer());
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: 'background.default', boxShadow: 0 } }}
    >
      <Box sx={{ width: { md: '25dvw', xs: '75dvw' }, p: 3 }}>{children}</Box>
    </Drawer>
  );
}
export default SideDrawer;
SideDrawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
