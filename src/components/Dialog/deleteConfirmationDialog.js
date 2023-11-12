import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Divider, Typography } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import Image from 'src/components/image';
import { useLocales } from 'src/locales';
import SvgColor from 'src/components/svg-color/svg-color';

export default function DeleteConfirmationDialog({ content, open, handleClose, action }) {
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
      <DialogContent>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src="/assets/illustrations/caution.svg" width={100} height={100} />
        </Box>
        <DialogContentText id="alert-dialog-description" sx={{ color: 'background.opposite' }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => action(true)}>
          Remove All
        </Button>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmationDialog.propTypes = {
  // title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  action: PropTypes.func,
};
