import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Card, Stack, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';
import { SLACK_WEBHOOK_URL, SPACE_INQUIRY_FORM } from 'src/config-global';

// ----------------------------------------------------------------------

const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجاك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};
export default function PropertyDetailsContactForm({ spaceInfo }) {
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
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .min(9, 'Contact Number must be at least 9 numbers'),
    email: Yup.string().email('That is not an email'),
    inquiry: Yup.string().required('Inquiry message is required'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
    email: '',
    inquiry: '',
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
      const dataToSend = Object.entries({ ...formData, building: spaceInfo.buildingName })
        .join('\r\n')
        .replaceAll(',', ': ');

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };

      await fetch(SLACK_WEBHOOK_URL, requestOptions);

      // axios.post(url, JSON.stringify({ text: dataToSend }), {
      //   withCredentials: false,
      //   transformRequest: [(data, Headers) => data],
      // });

      addNewForm({
        ...formData,
        source: SPACE_INQUIRY_FORM,
        subject: spaceInfo.description,
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
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {translate('propertyCard.requestCallBack')}
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            <RHFTextField variant="outlined" name="fullName" label={translate('form.name')} />
            <RHFTextField variant="outlined" name="mobile" label={translate('form.mobile')} />
            <RHFTextField variant="outlined" name="email" label={translate('form.email')} />

            <RHFTextField
              variant="outlined"
              name="inquiry"
              multiline
              rows={4}
              label={translate('form.message')}
            />

            <Stack alignItems="center" width={1}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                loading={isSubmitting}
              >
                {translate('propertyCard.requestCallBack')}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Card>
      <ConfirmationDialog
        title={DIALOG_TEXT.en}
        content={DIALOG_CONTENT.en}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

PropertyDetailsContactForm.propTypes = {
  spaceInfo: PropTypes.object,
};
