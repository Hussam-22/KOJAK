import { m } from 'framer-motion';
import { useRef, useState } from 'react';

import { useTheme } from '@mui/system';
import { Box, Fab, Card, Stack, Button, TextField, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';
import getVariant from 'src/sections/examples/animate-view/get-variant';

export default function WhatsAppForm() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef();

  const openWhatsAppForm = () => {
    setIsOpen(true);
  };

  const onSendMessage = () => {
    const message = textRef.current.value;

    const number = '+971529242548';

    // Appending the phone number & Message to the URL
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(
      message
    )}&app_absent=0`;

    window.location.href = url;

    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <Fab
          aria-label="whatsapp"
          onClick={openWhatsAppForm}
          sx={{ position: 'fixed', bottom: 15, right: 15, width: 55, height: 55 }}
        >
          <Iconify icon="logos:whatsapp-icon" width={45} />
        </Fab>
      )}
      {isOpen && (
        <Box component={m.div} {...getVariant('fadeInUp')}>
          <Card
            sx={{
              width: { md: 310, xs: 275 },
              height: 365,
              p: 3,
              position: 'fixed',
              bottom: 15,
              right: 15,
            }}
          >
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
              <TextField multiline rows={6} fullWidth label="Message" inputRef={textRef} />
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
