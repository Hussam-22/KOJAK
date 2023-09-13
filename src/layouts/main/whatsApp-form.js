import * as Yup from 'yup';
import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Fab, Card, Stack, IconButton, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { WHATSAPP_MOBILE } from 'src/config-global';
import Iconify from 'src/components/iconify/Iconify';
import getVariant from 'src/components/animate/variants/get-variant';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function WhatsAppForm() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef();
  const mobileNumberRef = useRef();
  const { addNewForm } = useAuthContext();
  const { translate } = useLocales();

  const openWhatsAppForm = () => {
    setIsOpen(true);
  };

  const schema = Yup.object().shape({
    mobile: Yup.string()
      .required('Mobile number is required')
      .min(9, 'Contact Number must be at least 9 numbers'),
    messageText: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    mobile: '',
    messageText: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (formData) => {
    const message = formData.messageText;
    const CustomerMobileNumber = formData.mobile;

    // Appending the phone number & Message to the URL
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_MOBILE}&text=${encodeURI(
      message
    )}&app_absent=0`;

    addNewForm({
      source: 'WhatsApp',
      fullName: '',
      mobile: CustomerMobileNumber,
      email: '',
      subject: 'K-Exclusive Website WhatsApp Message',
      inquiry: message,
      sentTo: WHATSAPP_MOBILE,
    });

    setIsOpen(false);
    if (!isSubmitting) window.location.href = url;
  };

  return (
    <>
      {!isOpen && (
        <Fab
          aria-label="whatsapp"
          onClick={openWhatsAppForm}
          sx={{
            position: 'fixed',
            bottom: 15,
            right: 15,
            width: 55,
            height: 55,
            zIndex: 98,
            border: 'solid 2px #000000',
            p: 0.5,
          }}
        >
          <Iconify icon="mdi:whatsapp" width={45} />
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
            bottom: 35,
            right: 15,
            zIndex: 99,
          }}
        >
          <Card sx={{ p: 3, bgcolor: 'background.paper' }}>
            <IconButton
              aria-label="delete"
              sx={{ position: 'absolute', top: 5, right: 5 }}
              onClick={() => setIsOpen(false)}
            >
              <Iconify icon="carbon:close-filled" />
            </IconButton>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {translate('form.whatsApp.howCanWeHelpYou')}
                </Typography>

                <RHFTextField
                  name="mobile"
                  label={translate('form.mobile')}
                  // type="number"
                  variant="outlined"
                />

                <RHFTextField
                  name="messageText"
                  multiline
                  rows={4}
                  label={translate('form.message')}
                  variant="outlined"
                />

                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {translate('contactUs.details.hours')}
                </Typography>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  sx={{
                    mx: { xs: 'auto !important', md: 'unset !important' },
                  }}
                >
                  {translate('form.sendMsg')}
                </LoadingButton>
              </Stack>
            </FormProvider>
          </Card>
        </Box>
      )}
    </>
  );
}
