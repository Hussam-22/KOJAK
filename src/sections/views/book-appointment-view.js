// import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Divider, MenuItem, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { SLACK_WEBHOOK_URL } from 'src/config-global';
import { _mercedesClasses, _autoRepairServices } from 'src/_mock';
import ConfirmationDialog from 'src/components/Dialog/confirmationDialog';
import FormProvider, { RHFSelect, RHFTextField, RHFMultiSelect } from 'src/components/hook-form';

const thisYear = new Date().getFullYear();
const yearsDiff = thisYear - 2014;
// -------------------------------------------------------------------
const DIALOG_TEXT = { ar: 'لقد وصلنا طلبك !!', en: 'We have received your request !!' };
const DIALOG_CONTENT = {
  ar: 'شكرًا للتواصل مع كوجك، سيقوم أحد وكلاء نجاح العملاء بالتواصل معك قريبًا!!',
  en: 'Thank you for contact Kojak, one of your customer success agents will contact you soon !!',
};

export default function BookAppointmentView() {
  const { addNewForm } = useAuthContext();
  const { translate, currentLang } = useLocales();
  const [open, setOpen] = useState(false);

  const today = new Date();

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6);

  // Define a function to check if a date is a Friday
  const isFriday = (date) => {
    const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Friday = 5, Saturday = 6
    return dayOfWeek === 5; // 5 corresponds to Friday
  };

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
    service: Yup.array().min(1, 'Must have at least 1 items'),
    messageText: Yup.string().required('Message is required'),
    class: Yup.string().required('Car Class is required'),
    year: Yup.string().when('class', {
      is: (selectedClass) => selectedClass !== '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
    appointmentDate: Yup.mixed().nullable().required('Start date is required'),
  });

  const defaultValues = {
    fullName: '',
    mobile: '',
    email: '',
    service: [],
    messageText: '',
    class: '',
    year: '',
    appointmentDate: isFriday(today) ? new Date(today.setDate(today.getDate() + 1)) : today,
  };

  const methods = useForm({
    resolver: yupResolver(CareerContactSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (values.class === '') setValue('year', '');
  }, [setValue, values.class]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const dataToSend = Object.entries({
        ...formData,
        appointment: new Date(formData.appointmentDate).toLocaleDateString(),
      })
        .join('\r\n')
        .replaceAll(',', ': ');
      // const url =
      //   'https://hooks.slack.com/services/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';
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ text: dataToSend }),
        credentials: 'omit', // This is equivalent to withCredentials: false in Axios
      };

      // Add Form Submit to Slack Channel
      await fetch(SLACK_WEBHOOK_URL, requestOptions);
      // axios.post(url, JSON.stringify({ text: dataToSend }), {
      //   withCredentials: false,
      //   transformRequest: [(data, Headers) => data],
      // });

      addNewForm({
        ...formData,
        source: 'Book an Appointment',
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
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Image src="/assets/illustrations/schedule.svg" width="25%" alt="schedule-illustration" />
          <Typography variant="h2">{translate('common.bookAppointment')}</Typography>
        </Box>
        <Box sx={{ bgcolor: 'background.neutral', borderRadius: 1, p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <RHFTextField name="fullName" label={translate('form.name')} />

              <RHFTextField name="mobile" label={translate('form.mobile')} />

              <RHFTextField name="email" label={translate('form.email')} />

              {/* <RHFTextField name="subject" label={translate('form.subject')} /> */}

              <RHFSelect name="class" label={translate('form.class')}>
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {_mercedesClasses.map((option) => (
                  <MenuItem key={option.class} value={option.class}>
                    {option.class}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="year" label={translate('form.year')}>
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[...Array(yearsDiff + 1)].map((_, index) => (
                  <MenuItem key={thisYear - index} value={thisYear - index}>
                    {thisYear - index}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFMultiSelect
                chip
                checkbox
                fullWidth
                name="service"
                label={translate('form.serviceType')}
                options={_autoRepairServices
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .sort((a, b) => b.isOffer - a.isOffer)
                  .map((service, index) => ({
                    isOffer: service.isOffer,
                    value: service.isOffer
                      ? `${translate(`hotOffers.cards.${index + 1}.title`)} - ${translate(
                          `hotOffers.cards.${index + 1}.price`
                        )}`
                      : translate(`services.items.${service.icon}.serviceName`),
                    label: service.isOffer
                      ? `${translate(`hotOffers.cards.${index + 1}.title`)} - ${translate(
                          `hotOffers.cards.${index + 1}.price`
                        )}`
                      : translate(`services.items.${service.icon}.serviceName`),
                  }))}
              />

              <Typography variant="caption">{translate('contactUs.details.hours')}</Typography>

              <Controller
                name="appointmentDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    // TODO: Fix mobile action buttons color
                    {...field}
                    disablePast
                    views={['day']}
                    maxDate={maxDate}
                    shouldDisableDate={isFriday}
                    label={translate('form.appointmentDate')}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <RHFTextField
                name="messageText"
                multiline
                rows={4}
                label={translate('form.issue')}
                sx={{ pb: 2.5 }}
              />

              <Box sx={{ textAlign: 'center' }}>
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
                  {translate('common.bookAppointment')}
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Container>
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
