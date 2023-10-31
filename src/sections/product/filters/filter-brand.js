import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Select,
  Divider,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { _mercedesClasses } from 'src/_mock/_mercedesClasses';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { rdxUpdatePage, rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

const TEMP_CATEGORY = [
  'ACCESSORIES',
  'ATTACHMENT PARTS',
  'ATTACHMENT PARTS FOR UNITS',
  'ATTACHMENT/BODY PARTS',
  'BRAKES',
  'SERVICE PARTS',
  'COOLER',
  'COOLING/AUXILIARY HEATING',
  'ENGINE COOLING',
  'FANS',
  'HEATING AND VENTILATION',
  'POWER STEERING PUMP, AC COMPRESSOR',
  'RADIATOR',
  'BATTERY',
  'ELEC',
  'ELECTRICAL EQUIPMENT AND INSTRUMENTS',
  'ELECTRICAL SYSTEM',
  'ENGINE ELECTRICAL EQUIPMENT',
  'AIR CLEANER AND ENGINE CHARGING',
  'ENGINE',
  'ENGINE LUBRICATION',
  'ENGINE SUSPENSION',
  'ENGINE TIMING',
  'SHEET METAL PARTS',
  'CHASSIS SHEET METAL / AIR INTAKE',
  'EXHAUST SYSTEM',
  'INTAKE AND EXHAUST MANIFOLDS',
  'BODY KIT',
  'COWL,​FRONT PANEL',
  'DOORS',
  'FENDER',
  'FRONT DOORS',
  'FRONT-END ASSEMBLY, FRONT PANEL',
  'REAR DOORS',
  'SIDE PANELS',
  'SLIDING ROOF',
  'SUBFRAME',
  'SUBSTRUCTURE',
  'TRANSFER CASE',
  'TRUNK LID',
  'TRUNKS AND CASES',
  'WINDOWS',
  'WINDSHIELD WASHER,EMERGENCY EQUIPMT',
  'OIL  AND LUBRICANTS',
  'OIL AND ACCESSORIES',
  'PANELLING',
  'FUEL INJECTION',
  'FUEL SYSTEM',
  'INTERIOR',
  'FRONT AXLE',
  'STEERING',
  'SPRINGS,​SUSPENSION AND HYDRAULICS',
  'SUSPENSION',
  'COVERING AND LINING',
  'REAR AXLE',
  'WHEELS',
  'AUTOMATIC TRANSMISSION',
  'MB AUTOMATIC TRANSMISSION',
  'MB PARTS',
  'PROPELLER SHAFT',
];

// ----------------------------------------------------------------------

export default function FilterBrand({ closeDrawer }) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);

  const schema = Yup.object().shape({
    class: Yup.string().when('partNo', {
      is: (selectedClass) => selectedClass === '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
    model: Yup.string().when('class', {
      is: (selectedClass) => selectedClass !== '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
  });

  const defaultValues = {
    class: filter.class || '',
    model: filter.model || '',
    partNo: filter.partNo || '',
    category: filter.category || '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(rdxClearFilter());

    dispatch(
      rdxUpdateFilter({
        ...formData,
      })
    );
    dispatch(rdxUpdatePage({ page: 1 }));
    reset({}, { keepValues: true });
    closeDrawer();
  });

  const resetSearchHandler = () => {
    reset({ class: '', model: '', partNo: '', category: '' });
    dispatch(rdxClearFilter());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
        <RHFTextField name="partNo" label="Part Number" variant="outlined" />

        <Divider sx={{ borderStyle: 'dashed' }} orientation="vertical" flexItem />

        <RHFSelect name="class" label="Mercedes Class" variant="outlined">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_mercedesClasses.map((option) => (
            <MenuItem key={option.class} value={option.class}>
              {option.class}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFSelect
          name="model"
          label="Production Year"
          variant="outlined"
          disabled={values.class === ''}
        >
          <Divider sx={{ borderStyle: 'dashed' }} />
          {values.class !== '' &&
            _mercedesClasses
              .find((option) => option.class === values.class)
              ?.models.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
        </RHFSelect>

        <RHFSelect
          name="category"
          label="Category"
          variant="outlined"
          disabled={values.model === '' || values.class === ''}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {TEMP_CATEGORY.sort((a, b) => a.localeCompare(b)).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </RHFSelect>

        <Stack spacing={2} direction="row">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={!isDirty}
            size="large"
          >
            <Iconify icon="octicon:search-16" />
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="error"
            loading={isSubmitting}
            disabled={values.model === '' && values.partNo === ''}
            onClick={resetSearchHandler}
            size="large"
          >
            <Iconify icon="system-uicons:reset" />
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

FilterBrand.propTypes = {
  closeDrawer: PropTypes.func,
};
