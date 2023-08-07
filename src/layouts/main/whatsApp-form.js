import { m } from 'framer-motion';
import { useRef, useState } from 'react';

import { useTheme } from '@mui/system';
import { Box, Fab, Card, Stack, Button, TextField, Typography, IconButton } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import getVariant from 'src/sections/examples/animate-view/get-variant';

export default function WhatsAppForm() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef();
  const mobileNumberRef = useRef();
  const { addNewWhatsAppSubmit } = useAuthContext();

  const openWhatsAppForm = () => {
    setIsOpen(true);
  };

  const onSendMessage = () => {
    const message = textRef.current.value;
    const CustomerMobileNumber = mobileNumberRef.current.value;

    const number = '+971529242548';

    // Appending the phone number & Message to the URL
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(
      message
    )}&app_absent=0`;

    addNewWhatsAppSubmit({ customerMessage: message, CustomerMobileNumber, sentTo: number });

    window.location.href = url;

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
          <Card sx={{ p: 3 }}>
            <IconButton
              aria-label="delete"
              sx={{ position: 'absolute', top: 5, right: 5 }}
              onClick={() => setIsOpen(false)}
            >
              <Iconify icon="carbon:close-filled" />
            </IconButton>

            <Stack spacing={2}>
              <Typography variant="h5" sx={{ mt: 1 }}>
                How can we help you ?
              </Typography>
              <TextField
                fullWidth
                label="Your Mobile Number"
                inputRef={mobileNumberRef}
                type="number"
              />
              <TextField multiline rows={4} fullWidth label="Message" inputRef={textRef} />
              <Box>
                <Button variant="contained" color="primary" onClick={onSendMessage}>
                  Send
                </Button>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                Our working hours from 8 AM to 6 PM, Saturday to Thursday
              </Typography>
            </Stack>
          </Card>
        </Box>
      )}
    </>
  );
}
