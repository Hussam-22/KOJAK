import { useEffect } from 'react';

import { Box, Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { _courses } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertiesList from 'src/sections/_kojakBuilding/properties/list/properties-list';
import WebsiteFilters from 'src/sections/_kojakBuilding/properties/filters/website-filters';
import DidNotFindWhatYouAreLookingFor from 'src/sections/_kojakBuilding/properties/did-not-find-property-card';

// ----------------------------------------------------------------------

export default function PropertiesView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const mdUp = useResponsive('up', 'md');

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
        <Typography variant="h2">Properties</Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: 'none' },
          }}
        >
          Filters
        </Button>
      </Stack>

      <Grid container spacing={5}>
        <Grid md={3}>
          <Stack spacing={3}>
            <WebsiteFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
            {mdUp && <DidNotFindWhatYouAreLookingFor />}
          </Stack>
        </Grid>
        <Grid md={9}>
          <PropertiesList courses={_courses} loading={loading.value} />
          {!mdUp && <DidNotFindWhatYouAreLookingFor />}
        </Grid>
      </Grid>
    </Container>
  );
}
