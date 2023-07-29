import { useEffect } from 'react';

import { Box, Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { _courses } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import PropertiesList from 'src/sections/_kojakBuilding/properties/list/properties-list';
import WebsiteFilters from 'src/sections/_kojakBuilding/properties/filters/elearning-filters';
import DidNotFindWhatYouAreLookingFor from 'src/sections/_kojakBuilding/properties/did-not-find-property-card';

// ----------------------------------------------------------------------

export default function PropertiesView() {
  const mobileOpen = useBoolean();

  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <>
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

        {/* <Stack direction={{ xs: 'column', md: 'row' }}>
          <Stack spacing={3} sx={{ width: { md: `calc(47% - ${280}px)` } }}>
            <WebsiteFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
            <DidNotFindWhatYouAreLookingFor />
          </Stack>

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            <PropertiesList courses={_courses} loading={loading.value} />
          </Box>
        </Stack> */}

        <Grid container spacing={5}>
          <Grid md={3}>
            <Stack spacing={3}>
              <WebsiteFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
              <DidNotFindWhatYouAreLookingFor />
            </Stack>
          </Grid>
          <Grid md={9}>
            <PropertiesList courses={_courses} loading={loading.value} />
          </Grid>
        </Grid>
      </Container>

      {/* <ElearningNewsletter /> */}
    </>
  );
}
