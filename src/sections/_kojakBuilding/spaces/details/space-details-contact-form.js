import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Card, Stack, Typography } from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SpaceContactForm({ spaceID }) {
  const CareerContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('That is not an email'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Request a Callback
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="fullName" label="Full name" />

          <RHFTextField name="mobile" label="Mobile" />

          <RHFTextField name="email" label="Email" />

          <Stack alignItems="center" width={1}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              loading={isSubmitting}
            >
              Request Callback
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  );
}

SpaceContactForm.propTypes = {
  spaceID: PropTypes.string,
};
