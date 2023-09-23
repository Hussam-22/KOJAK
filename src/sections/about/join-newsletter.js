import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { useAuthContext } from 'src/auth/hooks';
import { NEWSLETTER_FORM } from 'src/config-global';
import { useResponsive } from 'src/hooks/use-responsive';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';

const DIALOG_TEXT = {
  ar: 'لقد تم اضافتك الى قائمة المتابعين , شكراً !!',
  en: 'You have been added to our newsletter list, Thank you !!',
};

// ----------------------------------------------------------------------

export default function JoinNewsletter() {
  const theme = useTheme();
  const { addNewForm } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { translate, currentLang } = useLocales();
  const mdUp = useResponsive('up', 'md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CareerContactSchema = Yup.object().shape({
    email: Yup.string().email('That is not an email').required('That is not an email'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(CareerContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      // add form to FireBase
      addNewForm({
        ...formData,
        source: NEWSLETTER_FORM,
      });

      await new Promise((resolve) =>
        setTimeout(() => {
          handleClickOpen();
          return resolve();
        }, 500)
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} sx={{ textAlign: { md: 'center', xs: 'center' } }}>
          <Box>
            <Image
              src="/assets/illustrations/mail.svg"
              width={!mdUp ? '20%' : '30%'}
              alt="newsletter-illustration"
            />
          </Box>

          <Typography variant="h3" color="white">
            {translate('newsLetter.title')}
          </Typography>
          <Typography color="white">{translate('newsLetter.subTitle')}</Typography>

          <Stack direction="row" spacing={1}>
            <RHFTextField name="email" label={translate('form.email')} />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              sx={{
                mx: { xs: 'auto !important', md: 'unset !important' },
              }}
            >
              {translate('form.register')}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
      <ConfirmationDialog
        title={currentLang.value === 'ar' ? DIALOG_TEXT.ar : DIALOG_TEXT.en}
        content=""
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
