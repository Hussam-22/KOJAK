import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';

const DIALOG_TEXT = {
  ar: 'لقد تم اضافتك الى قائمة المتابعين , شكراً !!',
  en: 'You have been added to our newsletter list, Thank you !!',
};

// ----------------------------------------------------------------------

export default function JoinNewsletter() {
  const emailRef = useRef();
  const { addNewForm } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { translate, currentLang } = useLocales();

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
      const dataToSend = Object.entries(formData).join('\r\n').replaceAll(',', ': ');
      const url =
        'https://hooks.slack.com/services/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';
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };
      // Add Form Submit to Slack Channel
      await fetch(url, requestOptions);
      addNewForm({
        source: 'newsletter',
        fullName: '',
        mobile: '',
        email: formData.email,
        subject: '',
        inquiry: '',
        sentTo: '',
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
        <Box
          sx={{
            py: { xs: 5, md: 10 },
            overflow: 'hidden',
            // bgcolor: 'background.neutral',
          }}
        >
          <Container>
            <Grid
              container
              spacing={{ xs: 5, md: 3 }}
              alignItems={{ md: 'center' }}
              justifyContent={{ md: 'space-between' }}
              direction={{ xs: 'column-reverse', md: 'row' }}
            >
              <Grid xs={12} md={5} sx={{ textAlign: 'center' }}>
                <Typography variant="h3">{translate('newsLetter.title')}</Typography>

                <Typography sx={{ mt: 2.5, mb: 5 }}>{translate('newsLetter.subTitle')}</Typography>

                <Stack direction="row" spacing={1}>
                  <RHFTextField name="email" label={translate('form.email')} />

                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={isSubmitting}
                    sx={{
                      mx: { xs: 'auto !important', md: 'unset !important' },
                    }}
                  >
                    {translate('form.register')}
                  </LoadingButton>
                </Stack>
              </Grid>

              <Grid xs={12} md={5}>
                <Image
                  alt="newsletter"
                  src="/assets/illustrations/illustration_newsletter.svg"
                  sx={{ maxWidth: 366, mx: 'auto' }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
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
