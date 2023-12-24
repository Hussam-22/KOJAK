import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Divider, MenuItem } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { _partsCategory } from 'src/_mock/_partsCategory';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { rdxUpdatePage, rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

export default function FilterBrand({ closeDrawer }) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [classModelsList, setClassModelsList] = useState([]);
  const { getClassModelsList } = useAuthContext();

  useEffect(() => {
    (async () => {
      setClassModelsList(await getClassModelsList());
    })();
  }, [getClassModelsList]);

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

        {/* <RHFSelect name="class" label="Mercedes Class" variant="outlined">
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
        </RHFSelect> */}

        <RHFSelect
          native
          name="class"
          label="Class"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        >
          <option key={0} value={0}>
            Select Class
          </option>
          {classModelsList.length !== 0 &&
            classModelsList.map((item) => (
              <option key={item.class} value={item.class}>
                {item.class}
              </option>
            ))}
        </RHFSelect>

        <RHFSelect
          native
          name="model"
          label="model"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        >
          <option key={0} value={0}>
            Select Model
          </option>
          {classModelsList.length !== 0 &&
            classModelsList
              .filter((item) => item.class === values.class)[0]
              ?.models.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
        </RHFSelect>

        <RHFSelect name="category" label="Part Category" variant="outlined">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_partsCategory.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </RHFSelect>

        {/* <RHFSelect
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
        </RHFSelect> */}

        <Stack spacing={2} direction="row">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={!isDirty}
            size="large"
            startIcon={<Iconify icon="octicon:search-16" />}
          >
            search
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="error"
            loading={isSubmitting}
            disabled={values.model === '' && values.partNo === ''}
            onClick={resetSearchHandler}
            size="large"
            startIcon={<Iconify icon="system-uicons:reset" />}
          >
            reset
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

FilterBrand.propTypes = {
  closeDrawer: PropTypes.func,
};
