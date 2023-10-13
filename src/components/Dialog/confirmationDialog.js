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

export default function ConfirmationDialog({ content, open, handleClose }) {
  const { currentLang } = useLocales();
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
          <Image src="/assets/illustrations/success-request.svg" />
          <Typography variant="h2" sx={{ color: 'success.main' }}>
            SUCCESS !!
          </Typography>
          <Divider flexItem />
        </Box>
        <DialogContentText id="alert-dialog-description" sx={{ color: 'common.white' }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          {currentLang.value === 'ar' ? 'اغلاق' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  // title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
