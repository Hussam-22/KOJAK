import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Card, Stack, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';

// ----------------------------------------------------------------------
const DIALOG_TEXT = 'We have received your request !!';
const DIALOG_CONTENT =
  'Thank you for contact Kojak Building, one of your customer success agents will contact you soon !!';

export default function ContactUsForm() {
  const { addNewFormGeneralSubmit } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CareerContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('That is not an email'),
    subject: Yup.string().required('Subject is required'),
    messageText: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
    email: '',
    subject: '',
    messageText: '',
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

      // axios.post(url, JSON.stringify({ text: dataToSend }), {
      //   withCredentials: false,
      //   transformRequest: [(data, Headers) => data],
      // });

      await addNewFormGeneralSubmit(formData);
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
        <Stack spacing={2.5} alignItems="flex-start">
          <RHFTextField name="fullName" label="Full name" />

          <RHFTextField name="mobile" label="Contact Number" type="number" />

          <RHFTextField name="email" label="Email" />

          <RHFTextField name="subject" label="Subject" />

          <RHFTextField name="messageText" multiline rows={4} label="Message" sx={{ pb: 2.5 }} />

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
            Send Message
          </LoadingButton>
        </Stack>
      </FormProvider>
      <ConfirmationDialog
        title={DIALOG_TEXT}
        content={DIALOG_CONTENT}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

// ContactUsForm.propTypes = {
//   spaceInfo: PropTypes.object,
// };
