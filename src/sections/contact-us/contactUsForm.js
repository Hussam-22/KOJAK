import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, MenuItem, Stack } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { CONTACT_US_FORM, SITE_NAME } from 'src/config-global';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------
const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};

const hearAboutEn = ['Search Engine (e.g., Google)', 'Social Media', 'Word of Mouth'];
const hearAboutAr = ['محرك البحث (مثل جوجل)', 'وسائل التواصل الاجتماعي', 'صديق'];

export default function ContactUsForm({ payload,isMakeItYoursForm=false ,vehicleInfo={} }) {
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
    hearAbout: Yup.string().required('How did you hear about us is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      mobile: '',
      email: '',
      subject: payload?.subject || '',
      messageText: '',
      hearAbout: '',
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
      if (window.dataLayer) {
        window.dataLayer.push(isMakeItYoursForm ? {
          event: 'generate_lead',
          ecommerce: {
 transaction_id: `LEAD-${Date.now()}`,
 currency: 'AED',
 value: vehicleInfo?.price || 0,
 items: [{
item_id: vehicleInfo?.docID,
item_name: `${vehicleInfo?.brand} ${vehicleInfo?.model}` || 'unknown',
item_category: 'vehicle',
quantity: 1,
price: vehicleInfo?.price || 0
 }]
},
        } : {
          event: 'contact',
          contact_method: 'Contact form',
        });
      }

      addNewForm({
        ...formData,
        subject: `${SITE_NAME} - New Contact Us Form`,
        source: CONTACT_US_FORM,
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

          <RHFSelect name="hearAbout" label={translate('form.hearAbout')} variant="outlined">
            <MenuItem value="">None</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {[...(currentLang.value === 'en' ? hearAboutEn : hearAboutAr)].map((item, index) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </RHFSelect>

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
  isMakeItYoursForm: PropTypes.bool,
  vehicleInfo: PropTypes.object,
};
