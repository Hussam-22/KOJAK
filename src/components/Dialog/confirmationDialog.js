import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { useLocales } from 'src/locales';

export default function ConfirmationDialog({ title, content, open, handleClose }) {
  const { currentLang } = useLocales();
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{currentLang.value === 'ar' ? 'اغلاق' : 'Close'}</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
