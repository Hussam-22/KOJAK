import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Box, Card, Stack, useTheme, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { fNumber } from 'src/utils/format-number';
// import { _products } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { SplashScreen } from 'src/components/loading-screen';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VehicleFeature from 'src/sections/services/components/vehicle-feature';
import ProductDetailsCarousel from 'src/sections/services/components/product-details-carousel';

// ----------------------------------------------------------------------

export default function ServiceDetailsView() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const loading = useBoolean(true);
  const { vehicleID } = useParams();
  const { getVehicleInfo } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();

  const payload = {
    subject: `I would like to inquire about, ${vehicleInfo?.brand} ${vehicleInfo?.model} ${vehicleInfo?.price}`,
    source: 'Vehicle Inquiry',
  };

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  useEffect(() => {
    (async () => {
      setVehicleInfo(await getVehicleInfo(vehicleID));
    })();
  }, [getVehicleInfo, vehicleID]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <Box sx={{ bgcolor: 'background.neutral', pt: 5, pb: 10 }}>
      <Container sx={{ overflow: 'hidden', px: { md: 8 }, borderRadius: 3 }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Inventory',
              href: paths.website.services,
            },
            {
              name: `${vehicleInfo?.brand || ''} - ${vehicleInfo?.model || ''}`,
            },
          ]}
          sx={{ my: 2 }}
        />

        <Grid container spacing={3}>
          {vehicleInfo?.id && (
            <Grid xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack
                  direction={{ md: 'row', xs: 'column' }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack sx={{ mb: 2 }}>
                    <Typography variant="h2" color="primary">
                      {vehicleInfo.price}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h4">{vehicleInfo.brand}</Typography>
                      <Typography variant="h4">{vehicleInfo.model}</Typography>
                    </Stack>
                    <Typography sx={{ color: 'text.disabled' }}>
                      {vehicleInfo.description}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: { md: '40%', xs: '100%' },
                    }}
                  >
                    <VehicleFeature
                      icon="mdi:car-door"
                      value={vehicleInfo.exteriorColor}
                      large={!!mdUp}
                      color
                    />
                    <VehicleFeature
                      icon="mdi:car-seat"
                      value={vehicleInfo.interiorColor}
                      large={!!mdUp}
                      color
                    />

                    <VehicleFeature icon="uim:calender" value={vehicleInfo.year} large={!!mdUp} />
                    <VehicleFeature
                      icon="fa-solid:road"
                      value={`${fNumber(vehicleInfo.milage)} Km`}
                      large={!!mdUp}
                    />
                    <VehicleFeature
                      icon="ph:engine"
                      value={vehicleInfo.engineType}
                      large={!!mdUp}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          )}

          <Grid xs={12} md={12}>
            <Card sx={{ pb: 2 }}>
              <ProductDetailsCarousel />
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, display: 'flex', height: 1, flexDirection: 'column' }}>
              <Typography variant="h2">Vehicle Details</Typography>
              <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                {vehicleInfo.features}
              </Typography>
              {/* <VehicleDetailsInfo vehicleInfo={vehicleInfo.features} /> */}
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, display: 'flex', height: 1, flexDirection: 'column' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Make it Yours !!
              </Typography>
              <ContactUsForm payload={payload} />
            </Card>
          </Grid>

          <Grid xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h2">Warranty</Typography>
                  <Typography
                    sx={{ whiteSpace: 'pre-line', fontWeight: theme.typography.fontWeightLight }}
                  >
                    {translate('inventory.warranty')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h2">Export</Typography>
                  <Typography
                    sx={{ whiteSpace: 'pre-line', fontWeight: theme.typography.fontWeightLight }}
                  >
                    {translate('inventory.export')}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
