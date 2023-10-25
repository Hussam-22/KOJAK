import * as Yup from 'yup';
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
import { rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FilterBrand() {
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
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (filter.class === '' && filter.model === '' && filter.partNo === '')
      reset({ class: '', model: '', partNo: '' });
  }, [filter, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(rdxClearFilter());

    dispatch(
      rdxUpdateFilter({
        ...formData,
      })
    );
  });

  const resetSearchHandler = () => {
    reset({ class: '', model: '', partNo: '' });
    dispatch(rdxClearFilter());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2.5}>
        <RHFTextField name="partNo" label="Part Number" variant="outlined" />

        <Divider sx={{ borderStyle: 'dashed' }} />

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
                  {`${option}`}
                </MenuItem>
              ))}
        </RHFSelect>

        <Stack spacing={2}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={values.model === '' && values.partNo === ''}
            sx={{
              whiteSpace: 'nowrap',
            }}
            startIcon={<Iconify icon="octicon:search-16" />}
            fullWidth
          >
            Find Part
          </LoadingButton>
          <LoadingButton
            size="large"
            variant="contained"
            color="error"
            loading={isSubmitting}
            disabled={values.model === '' && values.partNo === ''}
            onClick={resetSearchHandler}
            sx={{
              whiteSpace: 'nowrap',
            }}
            startIcon={<Iconify icon="octicon:search-16" />}
            fullWidth
          >
            Reset Search
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
