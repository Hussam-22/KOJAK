import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useLocales } from 'src/locales';
import BookAppointmentForm from 'src/components/Dialog/bookAppointmentForm';

export default function BookAppointmentDialog({ open, handleClose }) {
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'background.default' }}>
        <Typography color="primary">Book an Appointment</Typography>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.default', py: 3 }}>
        <BookAppointmentForm />
      </DialogContent>
      {/* <DialogActions sx={{ bgcolor: 'background.default' }}>
        <Button onClick={handleClose}>{currentLang.value === 'ar' ? 'اغلاق' : 'Close'}</Button>
      </DialogActions> */}
    </Dialog>
  );
}

BookAppointmentDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
