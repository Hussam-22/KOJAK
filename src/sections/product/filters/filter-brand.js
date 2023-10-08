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
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterBrand() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);

  console.log(filter);

  const schema = Yup.object().shape({
    class: Yup.string().required('Car Class is required'),
    model: Yup.string().when('class', {
      is: (selectedClass) => selectedClass !== '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
  });

  const defaultValues = {
    class: filter.class || '',
    model: filter.model || '',
    // partName: '',
  };

  console.log({ defaultValues });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (filter.class === '' && filter.model === '' && filter.partNo === '') reset();
  }, [filter, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    dispatch(
      rdxUpdateFilter({
        ...formData,
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  const handleClearAll = () => {
    reset({ class: '', mode: 'None' });
    dispatch(rdxClearFilter());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2.5}>
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
          {_mercedesClasses
            .find((option) => option.class === values.class)
            ?.models.map((option) => (
              <MenuItem key={option.model} value={option.model}>
                {`${option.model} - ${option.productionYears}`}
              </MenuItem>
            ))}
        </RHFSelect>

        {/* <RHFTextField
          name="partName"
          label="Part Name"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={clearPartNameFieldHandler}>
                  <Iconify icon="carbon:close-outline" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        <Stack spacing={2}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            sx={{
              whiteSpace: 'nowrap',
            }}
            startIcon={<Iconify icon="octicon:search-16" />}
            fullWidth
          >
            Find Part
          </LoadingButton>

          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            variant="contained"
            startIcon={<Iconify icon="carbon:trash-can" />}
            onClick={handleClearAll}
          >
            Clear All
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
