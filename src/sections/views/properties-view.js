import { useEffect } from 'react';

import { Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertiesList from 'src/sections/properties/list/properties-list';
import WebsiteFilters from 'src/sections/properties/filters/website-filters';

// ----------------------------------------------------------------------

export default function PropertiesView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const mdUp = useResponsive('up', 'md');
  const { addNewSpace } = useAuthContext();
  const { translate } = useLocales();

  // const addSpaceHandler = async () => addNewSpace();

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

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

      <Grid container spacing={5}>
        <Grid md={3}>
          <Stack spacing={3}>
            <WebsiteFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
          </Stack>
        </Grid>
        <Grid md={9}>
          <PropertiesList />
        </Grid>
      </Grid>
    </Container>
  );
}
