import { m } from 'framer-motion';
import { useRef, useState } from 'react';

import { Box, Fab, Card, Stack, Button, TextField, Typography, IconButton } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import getVariant from 'src/components/animate/variants/get-variant';

export default function WhatsAppForm() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef();
  const mobileNumberRef = useRef();
  const { addNewForm } = useAuthContext();
  const { translate } = useLocales();

  const openWhatsAppForm = () => {
    setIsOpen(true);
  };

  const onSendMessage = () => {
    // const message = textRef.current.value;
    // const CustomerMobileNumber = mobileNumberRef.current.value;

    // const number = '+971529242623';

    // // Appending the phone number & Message to the URL
    // const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(
    //   message
    // )}&app_absent=0`;

    // addNewForm({
    //   source: 'WhatsApp',
    //   fullName: '',
    //   mobile: CustomerMobileNumber,
    //   email: '',
    //   subject: '',
    //   inquiry: message,
    //   sentTo: number,
    // });

    // window.location.href = url;

    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <Fab
          aria-label="whatsapp"
          onClick={openWhatsAppForm}
          sx={{ position: 'fixed', bottom: 15, right: 15, width: 55, height: 55, zIndex: 98 }}
        >
          <Iconify icon="logos:whatsapp-icon" width={45} />
        </Fab>
      )}
      {isOpen && (
        <Box
          component={m.div}
          {...getVariant('fadeInUp')}
          sx={{
            width: { md: 310, xs: 275 },
            height: 395,
            position: 'fixed',
            bottom: 15,
            right: 15,
            zIndex: 99,
          }}
        >
          <Card sx={{ p: 3, bgcolor: 'background.default' }}>
            <IconButton
              aria-label="delete"
              sx={{ position: 'absolute', top: 5, right: 5 }}
              onClick={() => setIsOpen(false)}
            >
              <Iconify icon="carbon:close-filled" />
            </IconButton>

            <Stack spacing={2}>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {translate('form.whatsApp.howCanWeHelpYou')}
              </Typography>
              <TextField
                fullWidth
                label={translate('form.mobile')}
                inputRef={mobileNumberRef}
                type="number"
              />
              <TextField
                multiline
                rows={4}
                fullWidth
                label={translate('form.message')}
                inputRef={textRef}
              />
              <Box>
                <Button variant="contained" color="primary" onClick={onSendMessage}>
                  {translate('form.sendMsg')}
                </Button>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {translate('form.whatsApp.workingHours')}
              </Typography>
            </Stack>
          </Card>
        </Box>
      )}
    </>
  );
}
