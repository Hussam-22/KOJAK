import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Tab, Tabs, Stack, Divider, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { _mercedesClasses } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import { _partsCategory } from 'src/_mock/_partsCategory';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

function LandingSearchParts() {
  const mdUp = useResponsive('up', 'md');
  const [currentTab, setCurrentTab] = useState(1);

  const TABS = [
    {
      index: 1,
      value: 'Advanced Search',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SearchAdvanced />,
      siteUrl: '#',
    },
    {
      index: 2,
      value: 'Search By Part Number',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SearchPartNumber />,
      siteUrl: '#',
    },
  ];

  return (
    <>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons={!mdUp}
        value={currentTab}
        onChange={(event, newValue) => setCurrentTab(newValue)}
        sx={{
          borderRadius: 1,
          display: 'flex',
          // bgcolor: 'primary.lighter',
          justifyContent: 'space-between',
        }}
      >
        {TABS.map((tab) => (
          <Tab disableRipple key={tab.index} label={tab.value} icon={tab.icon} value={tab.index} />
        ))}
      </Tabs>

      <Box sx={{ mb: 2 }} />

      {TABS.map((tab) => {
        const isMatched = tab.index === currentTab;
        return (
          isMatched && (
            <Box
              key={tab.index}
              id={tab.index}
              sx={{ bgcolor: 'background.neutral', p: 2, borderRadius: 1 }}
            >
              {tab.component}
            </Box>
          )
        );
      })}
    </>
  );
}
export default LandingSearchParts;

// LandingSearchParts.propTypes = { tables: PropTypes.array };

// ----------------------------------------------------------------------------

function SearchAdvanced() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const CareerContactSchema = Yup.object().shape({
    class: Yup.string().required('Car Class is required'),
    model: Yup.string().when('class', {
      is: (selectedClass) => selectedClass !== '', // Only apply validation when "class" is selected
      then: () => Yup.string().required('Car Year is required'),
    }),
  });

  const defaultValues = {
    class: '',
    model: '',
    category: '',
  };

  const methods = useForm({
    resolver: yupResolver(CareerContactSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);

    dispatch(rdxClearFilter());
    dispatch(
      rdxUpdateFilter({
        ...formData,
        category: formData.category ? [formData.category] : formData.category,
      })
    );
    setTimeout(() => {
      setLoading(false);
      navigate(paths.website.spareParts);
    }, 500);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2.5}>
        <RHFSelect
          name="class"
          label="Mercedes Class"
          variant="outlined"
          size={mdUp ? 'large' : 'unset'}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_mercedesClasses.map((option) => (
            <MenuItem key={option.class} value={option.class}>
              {option.class}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFSelect name="model" label="Model" variant="outlined" size={mdUp ? 'large' : 'unset'}>
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {values.class !== '' &&
            _mercedesClasses
              .find((option) => option.class === values.class)
              .models.map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
        </RHFSelect>

        <RHFSelect
          name="category"
          label="Part Category"
          variant="outlined"
          size={mdUp ? 'large' : 'unset'}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {_partsCategory.map((option) => (
            <MenuItem key={option.category} value={option.category}>
              {option.category}
            </MenuItem>
          ))}
        </RHFSelect>

        <Box sx={{ textAlign: 'center' }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="info"
            loading={loading}
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

// ----------------------------------------------------------------------------

function SearchPartNumber() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CareerContactSchema = Yup.object().shape({
    partNo: Yup.string().required('Car Class is required'),
  });

  const defaultValues = {
    partNo: '',
  };

  const methods = useForm({
    resolver: yupResolver(CareerContactSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    dispatch(rdxClearFilter());
    dispatch(rdxUpdateFilter({ ...formData }));
    navigate(paths.website.spareParts);
    console.log(formData);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2.5}>
        <RHFTextField
          name="partNo"
          label="Part Number"
          variant="outlined"
          fullWidth
          size={mdUp ? 'large' : 'unset'}
        />

        <Box sx={{ textAlign: 'center' }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="info"
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
