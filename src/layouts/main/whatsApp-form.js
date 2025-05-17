import { yupResolver } from '@hookform/resolvers/yup';
import { m } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Fab, IconButton, Stack, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import getVariant from 'src/components/animate/variants/get-variant';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/Iconify';
import { WHATSAPP_FORM, WHATSAPP_MOBILE } from 'src/config-global';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';

export default function WhatsAppForm() {
  const mdUp = useResponsive('up', 'md');
  const { translate } = useLocales();
  const { addNewForm } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  window.onscroll = function () {
    if (
      !mdUp &&
      document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 200
    ) {
      setHide(true);
    } else setHide(false);
  };

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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    // Create WhatsApp link
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_MOBILE}&text=${encodeURI(
      formData.messageText
    )}&app_absent=0`;

    // add form to FireBase
    addNewForm({
      ...formData,
      source: WHATSAPP_FORM,
      mobile: formData.mobile,
    });

    setIsOpen(false);
    setTimeout(() => {
      if (!isSubmitting) window.location.href = url;
    }, 1000);
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
            visibility: hide ? 'hidden' : 'visible',
            opacity: hide ? 0 : 1,
            transition: 'visibility 0.5s ease-out, opacity 0.5s ease-out',
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
                  focused
                />

                <RHFTextField
                  name="messageText"
                  multiline
                  rows={4}
                  label={translate('form.message')}
                  variant="outlined"
                  focused
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
