import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { rdxClearFilter } from 'src/redux/slices/properties';
import PropertiesList from 'src/sections/_kojakBuilding/properties/list/properties-list';
import WebsiteFilters from 'src/sections/_kojakBuilding/properties/filters/website-filters';

// ----------------------------------------------------------------------

export default function PropertiesView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const { translate } = useLocales();
  const dispatch = useDispatch();

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
    dispatch(rdxClearFilter());
  }, [dispatch, loading]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h2">{translate('header.properties')}</Typography>
        {/* <Button onClick={addSpaceHandler}>Add Space</Button> */}

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: 'none' },
          }}
        >
          {translate('common.search')}
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid md={3}>
          <WebsiteFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
        </Grid>
        <Grid md={9}>
          <PropertiesList />
        </Grid>
      </Grid>
    </Container>
  );
}
