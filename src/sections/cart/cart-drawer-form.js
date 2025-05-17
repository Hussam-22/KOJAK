import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, MenuItem, Stack, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { CART_FORM, SLACK_WEBHOOK_URL } from 'src/config-global';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useLocales } from 'src/locales';
import { rdxFormPayload, rdxLoadCartFromStorage, rdxToggleDrawer } from 'src/redux/slices/products';

// ----------------------------------------------------------------------
const DIALOG_CONTENT = {
  ar: `لقد قمنا باستلام قائمة قطع الغيار, سيتم التواصل معك قريباً`,
  en: 'We have received the parts list, we will get back to you soon',
};

const hearAboutEn = ['Search Engine (e.g., Google)', 'Social Media', 'Word of Mouth'];
const hearAboutAr = ['محرك البحث (مثل جوجل)', 'وسائل التواصل الاجتماعي', 'صديق'];

export default function CartDrawerForm() {
  const dispatch = useDispatch();
  const { addNewForm, fsUpdatePartStatistics } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { translate, currentLang } = useLocales();
  const { cart, formPayload } = useSelector((state) => state.products);
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(rdxToggleDrawer());
    dispatch(
      rdxFormPayload({
        fullName: '',
        mobile: '',
        email: '',
        subject: '',
        messageText: '',
        hearAbout: '',
        source: '',
        parts: [],
      })
    );

    setOpen(false);
  };

  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .min(9, 'Contact Number must be at least 9 numbers'),
    email: Yup.string().required('Email is Required').email('That is not an email'),
    hearAbout: Yup.string().required('How did you hear about us is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      mobile: '',
      email: '',
      messageText: '',
      hearAbout: '',
    }),
    []
  );

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
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_ids: cart.map((item) => item.partNumber),
        content_type: 'product',
        value: cart.reduce((acc, item) => acc + item.price * item.qty, 0),
        currency: 'AED',
      });
    }

    const slackCart = cart.map((item) => `%${item.partNumber} | x${item.qty}*`);
    try {
      const dataToSend = Object.entries({ ...formData, ...slackCart })
        .join('\r\n')
        .replaceAll('%', '')
        .replaceAll('*', '')
        .replaceAll(',', ': ');
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };

      // Add Form Submit to Slack Channel
      await fetch(SLACK_WEBHOOK_URL, requestOptions);

      // ADD FORM SUBMIT AND SEND EMAIL
      addNewForm({
        ...formData,
        parts: slackCart.join('\r\n').replaceAll('%', '<p>').replaceAll('*', '</p>'),
        source: CART_FORM,
      });

      // UPDATE PART(S) STATISTICS
      if (formPayload.parts.length !== 0)
        formPayload.parts.map((part) => fsUpdatePartStatistics(part, formPayload.source));

      // CLEAR LOCAL-STORAGE AND CLOSE
      await new Promise((resolve) =>
        setTimeout(() => {
          dispatch(rdxLoadCartFromStorage([]));
          setLocalStorageCart([]);
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

          <RHFTextField
            name="messageText"
            multiline
            rows={4}
            label={translate('form.specialRequests')}
            sx={{ pb: 1 }}
            variant="outlined"
          />

          <Typography variant="caption">
            {`Our sales representative will reach out to you within one hour, unless your request
            falls outside of our regular business hours or the afternoon break.`}
          </Typography>

          <Typography variant="caption" sx={{ whiteSpace: 'pre-line' }}>
            {`Business hours are 
            Saturday to Thursday, 
            8 AM to 1 PM and 4 PM to 8 PM, with an afternoon break in between.`}
          </Typography>

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            endIcon={<Iconify icon="fluent:slide-arrow-right-20-regular" width={24} height={24} />}
          >
            {translate('form.inquire')}
          </LoadingButton>
        </Stack>
      </FormProvider>
      <ConfirmationDialog
        content={currentLang.value === 'ar' ? DIALOG_CONTENT.ar : DIALOG_CONTENT.en}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

// CartDrawerForm.propTypes = {
//   payload: PropTypes.object,
// };
