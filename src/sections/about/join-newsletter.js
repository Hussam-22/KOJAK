import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { useAuthContext } from 'src/auth/hooks';
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
      /* const dataToSend = Object.entries(formData).join('\r\n').replaceAll(',', ': ');
      const url =
        'https://hooks.slack.com/services/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';
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };
      // Add Form Submit to Slack Channel
      await fetch(url, requestOptions); */

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
            // ...bgGradient({
            //   direction: 'to right',
            //   startColor: `${alpha(theme.palette.grey[900], 0.9)}`,
            //   endColor: `${alpha(theme.palette.grey[100], 0)}`,
            // }),
            bgcolor: 'background.paper',
            display: 'flex',
            py: 4,
            borderTop: 'solid 1px #999',
          }}
        >
          <Container maxWidth="md" sx={{ alignSelf: 'flex-end' }}>
            <Grid container spacing={3}>
              <Grid md={4} xs={12} sx={{ p: { md: 7, xs: 2 }, textAlign: 'center' }}>
                <Image
                  src="/assets/illustrations/mail.svg"
                  width={!mdUp ? '40%' : 'unset'}
                  alt="newsletter-illustration"
                />
              </Grid>

              <Grid md={8} xs={12} sx={{ my: 'auto' }}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h4">{translate('newsLetter.title')}</Typography>
                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {translate('newsLetter.subTitle')}
                  </Typography>

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
