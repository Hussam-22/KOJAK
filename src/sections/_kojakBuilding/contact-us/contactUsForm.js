import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';

// ----------------------------------------------------------------------
const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجاك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};

export default function ContactUsForm() {
  const { addNewForm } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { translate, currentLang } = useLocales();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .min(9, 'Contact Number must be at least 9 numbers'),
    email: Yup.string().required().email('That is not an email'),
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
    resolver: yupResolver(schema),
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

      addNewForm({
        ...formData,
        source: 'Contact Us',
        inquiry: formData.messageText,
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
        <Stack spacing={2.5} alignItems="flex-start">
          <RHFTextField name="fullName" label={translate('form.name')} />

          <RHFTextField name="mobile" label={translate('form.mobile')} />

          <RHFTextField name="email" label={translate('form.email')} />

          <RHFTextField name="subject" label={translate('form.subject')} />

          <RHFTextField
            name="messageText"
            multiline
            rows={4}
            label={translate('form.message')}
            sx={{ pb: 2.5 }}
          />

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
            {translate('form.sendMsg')}
          </LoadingButton>
        </Stack>
      </FormProvider>
      <ConfirmationDialog
        title={currentLang.value === 'ar' ? DIALOG_TEXT.ar : DIALOG_TEXT.en}
        content={currentLang.value === 'ar' ? DIALOG_CONTENT.ar : DIALOG_CONTENT.en}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

// ContactUsForm.propTypes = {
//   spaceInfo: PropTypes.object,
// };
