import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { SLACK_WEBHOOK_URL } from 'src/config-global';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';

// ----------------------------------------------------------------------
const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};

export default function ContactUsForm({ payload }) {
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

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      mobile: '',
      email: '',
      subject: payload?.subject || '',
      messageText: '',
    }),
    [payload?.subject]
  );

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

  useEffect(() => {
    if (payload?.subject !== undefined || payload?.subject !== '')
      setValue('subject', payload?.subject);
  }, [payload?.subject, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const dataToSend = Object.entries(formData).join('\r\n').replaceAll(',', ': ');
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };

      // Add Form Submit to Slack Channel
      await fetch(SLACK_WEBHOOK_URL, requestOptions);

      addNewForm({
        ...formData,
        source: payload?.source || 'Contact Us',
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
          <RHFTextField name="fullName" label={translate('form.name')} variant="outlined" />

          <RHFTextField
            name="mobile"
            label={translate('form.mobile')}
            // type="number"
            variant="outlined"
          />

          <RHFTextField name="email" label={translate('form.email')} variant="outlined" />

          <RHFTextField name="subject" label={translate('form.subject')} variant="outlined" />

          <RHFTextField
            name="messageText"
            multiline
            rows={4}
            label={translate('form.message')}
            sx={{ pb: 2.5 }}
            variant="outlined"
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

ContactUsForm.propTypes = {
  payload: PropTypes.object,
};
