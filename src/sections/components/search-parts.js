import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Divider, MenuItem, Container, Typography } from '@mui/material';

import { _mercedesClasses } from 'src/_mock';
import Image from 'src/components/image/Image';
import { RHFSelect } from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import { _partsCategory } from 'src/_mock/_partsCategory';
import FormProvider from 'src/components/hook-form/form-provider';

function SearchParts() {
  const mdUp = useResponsive('up', 'md');
  const CareerContactSchema = Yup.object().shape({
    class: Yup.string().required('Car Class is required'),
    year: Yup.string().when('class', {
      is: (selectedClass) => selectedClass !== '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
  });

  const defaultValues = {
    class: '',
    year: '',
    category: '',
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

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2.5}>
        <RHFSelect name="class" label="Mercedes Class" variant="outlined">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_mercedesClasses.map((option) => (
            <MenuItem key={option.class} value={option.class}>
              {option.class}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFSelect name="year" label="Production Year" variant="outlined">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {values.class !== '' &&
            _mercedesClasses
              .find((option) => option.class === values.class)
              .models.map((option) => (
                <MenuItem key={option.productionYears} value={option.productionYears}>
                  {`${option.model} - ${option.productionYears}`}
                </MenuItem>
              ))}
        </RHFSelect>

        <RHFSelect name="category" label="Part Category" variant="outlined">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_partsCategory.map((option) => (
            <MenuItem key={option.category} value={option.category}>
              {option.category}
            </MenuItem>
          ))}
        </RHFSelect>

        {/* <RHFMultiSelect
      chip
      checkbox
      fullWidth
      name="service"
      label={translate('form.serviceType')}
      options={servicesList
        .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
        .sort((a, b) => b.isOffer - a.isOffer)
        .map((service, index) => ({
          isOffer: service.isOffer,
          value: service.isOffer
            ? `${service.serviceName} - ${service.price}`
            : translate(`services.items.${service.icon}.serviceName`),
          label: service.isOffer
            ? `${service.serviceName} - ${service.price}`
            : translate(`services.items.${service.icon}.serviceName`),
        }))}
    /> */}

        <Box sx={{ textAlign: 'center' }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            sx={{
              whiteSpace: 'nowrap',
            }}
            fullWidth
          >
            Find Part
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
}
export default SearchParts;

// SearchParts.propTypes = { tables: PropTypes.array };
