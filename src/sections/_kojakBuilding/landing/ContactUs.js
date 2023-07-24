// @mui
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Link,
  Stack,
  useTheme,
  Container,
  Typography,
  IconButton,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function ContactUs() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        bgcolor: 'custom.bluishPurpleLighter',
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={5}
          justifyContent={{ md: 'space-between' }}
          sx={{ p: isMdUp ? 3 : 1 }}
        >
          <Grid xs={12} md={7}>
            <ContactKojakForm />
          </Grid>

          <Grid
            xs={12}
            md={5}
            sx={{
              bgcolor: 'common.white',
              p: 3,
              pt: isMdUp ? 0 : 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                my: 5,
                textAlign: { xs: 'center', md: 'left' },
                color: 'common.black',
              }}
            >
              Get In Touch
            </Typography>

            <Stack spacing={3} alignItems="flex-start">
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                  <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> Email
                </Stack>

                <Link color="inherit" variant="body2" href="mailto:hello@example.com">
                  hello@example.com
                </Link>
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                  <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> Phone
                </Stack>

                <Typography variant="body2">(907) 555-0101</Typography>
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                  <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> Address
                </Stack>

                <Typography variant="body2">
                  Industrial Area 1, Sharjah, United Arab Emirates
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                  <Iconify icon="mingcute:time-line" width={24} sx={{ mr: 1 }} /> Working Hours
                </Stack>

                <Typography variant="body2">8 AM to 8 PM - Saturday to Thursday</Typography>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="overline">Follow Us</Typography>
                <Stack direction="row">
                  {_socials.map((social) => (
                    <IconButton key={social.value} color="inherit">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ContactKojakForm() {
  const isMdUp = useResponsive('up', 'md');

  const ElearningContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.number().required('Contact Number is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
    subject: '',
    email: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ElearningContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          mb: 5,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: { xs: 'center', md: 'left' }, color: 'common.black' }}
        >
          Contact Us
        </Typography>
        <Typography sx={{ color: 'common.black', textAlign: { md: 'left', xs: 'center' } }}>
          We&#39;re here to assist you. If you have any questions, feedback, or need support, please
          don&#39;t hesitate to reach out to us. Our dedicated team is ready to help you in any way
          we can.
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5} alignItems="flex-start">
          <RHFTextField name="fullName" label="Full name" />

          <RHFTextField name="mobile" label="Contact Number" type="number" />

          <RHFTextField name="email" label="Email" />

          <RHFTextField name="subject" label="Subject" />

          <RHFTextField name="message" multiline rows={4} label="Message" sx={{ pb: 2.5 }} />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              mx: { xs: 'auto !important', md: 'unset !important' },
            }}
          >
            Send Request
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
