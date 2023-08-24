import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, Stack, Divider, MenuItem } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { _autoRepairServices } from 'src/_mock';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';
import FormProvider, { RHFSelect, RHFTextField, RHFMultiSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------
const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجاك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

export default function BookAppointmentForm() {
  const { addNewForm } = useAuthContext();
  const { translate, currentLang } = useLocales();

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const CareerContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('That is not an email'),
    service: Yup.string().required('service is required'),
    messageText: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
    email: '',
    service: '',
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
    // try {
    //   const dataToSend = Object.entries(formData).join('\r\n').replaceAll(',', ': ');
    //   const url =
    //     'https://hooks.slack.com/services/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';
    //   const requestOptions = {
    //     method: 'POST',
    //     body: JSON.stringify({ text: dataToSend }),
    //     credentials: 'omit', // This is equivalent to withCredentials: false in Axios
    //   };
    //   // Add Form Submit to Slack Channel
    //   await fetch(url, requestOptions);
    //   // axios.post(url, JSON.stringify({ text: dataToSend }), {
    //   //   withCredentials: false,
    //   //   transformRequest: [(data, Headers) => data],
    //   // });
    //   addNewForm({
    //     ...formData,
    //     source: 'Contact Us',
    //     inquiry: formData.messageText,
    //   });
    //   await new Promise((resolve) =>
    //     setTimeout(() => {
    //       handleClickOpen();
    //       return resolve();
    //     }, 500)
    //   );
    //   reset();
    // } catch (error) {
    //   console.error(error);
    // }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-start">
        <RHFTextField name="fullName" label={translate('form.name')} />

        <RHFTextField name="mobile" label={translate('form.mobile')} type="number" />

        <RHFTextField name="email" label={translate('form.email')} />

        {/* <RHFTextField name="subject" label={translate('form.subject')} /> */}

        {/* <RHFMultiSelect
          chip
          checkbox
          name="multiSelect"
          label="Multi select"
          options={_autoRepairServices.map((service) => ({
            value: service.serviceName,
            label: service.serviceName,
          }))}
        /> */}

        <RHFSelect name="service" label="Service Type">
          <MenuItem value="" sx={{ color: 'common.black' }}>
            None
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_autoRepairServices.map((option) => (
            <MenuItem
              key={option.serviceName}
              value={option.serviceName}
              sx={{ color: 'common.black' }}
            >
              {option.serviceName}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFTextField
          name="messageText"
          multiline
          rows={4}
          label="Issue Description"
          sx={{ pb: 2.5 }}
        />

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
          Book Appointment
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

// ContactUsForm.propTypes = {
//   spaceInfo: PropTypes.object,
// };
