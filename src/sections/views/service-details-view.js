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
  const { translate, currentLang } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const loading = useBoolean(true);
  const { vehicleID } = useParams();
  const { getVehicleInfo } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();

  const payload = {
    subject: `${translate('inventory.formText')} ${translate(
      `common.${vehicleInfo?.brand?.toLowerCase() || ''}`
    )} ${vehicleInfo?.model} ${vehicleInfo?.price.replace(
      'AED',
      currentLang.value === 'en' ? 'AED' : 'درهم'
    )}`,
    source: 'Vehicle Inquiry',
  };

  const newDescription =
    currentLang.value === 'en'
      ? 'Export price outside GCC countries - Price Without VAT & Without Customs Duty'
      : 'سعر التصدير خارج دول مجلس التعاون الخليجي - السعر بدون ضريبة القيمة المضافة وبدون الرسوم الجمركية';

  const usedDescription =
    currentLang.value === 'en'
      ? 'Export price outside GCC countries - Price Without VAT & Without Customs Duty'
      : 'سعر التصدير خارج دول مجلس التعاون الخليجي - السعر بدون ضريبة القيمة المضافة وبدون الرسوم الجمركية';

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
              name: translate('header.home'),
              href: '/',
            },
            {
              name: translate('header.services'),
              href: paths(currentLang.value).website.services,
            },
            {
              name: `${translate(`common.${vehicleInfo?.brand?.toLowerCase() || ''}`)} - ${
                vehicleInfo?.model || ''
              }`,
            },
          ]}
          sx={{ my: 2 }}
        />

        <Grid container spacing={3}>
          {vehicleInfo?.id !== undefined && (
            <Grid xs={12}>
              <Card sx={{ p: 3 }}>
                {vehicleInfo?.isActive ? (
                  <Typography variant="h4" color="primary">
                    {vehicleInfo?.price.replace('AED', currentLang.value === 'en' ? 'AED' : 'درهم')}
                  </Typography>
                ) : (
                  <Typography variant="h4" color="primary">
                    {currentLang.value === 'en' ? 'SOLD' : 'بيعت'}
                  </Typography>
                )}
                <Stack
                  direction={{ md: 'row', xs: 'column' }}
                  spacing={mdUp ? 2 : 0}
                  sx={{ mb: 2 }}
                >
                  <Typography variant={mdUp ? 'h2' : 'h3'}>
                    {translate(`common.${vehicleInfo?.brand.toLowerCase()}`)}
                  </Typography>
                  <Typography variant={mdUp ? 'h2' : 'h3'}>{vehicleInfo?.model}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: { md: '40%', xs: '100%' },
                    }}
                  >
                    <VehicleFeature
                      icon="mdi:car-door"
                      value={vehicleInfo?.exteriorColorString}
                      large={!!mdUp}
                    />
                    <VehicleFeature
                      icon="mdi:car-seat"
                      value={vehicleInfo?.interiorColorString}
                      large={!!mdUp}
                    />

                    <VehicleFeature icon="uim:calender" value={vehicleInfo?.year} large={!!mdUp} />
                    <VehicleFeature
                      icon="fa-solid:road"
                      value={`${fNumber(vehicleInfo?.milage)} Km`}
                      large={!!mdUp}
                    />
                    <VehicleFeature
                      icon="ph:engine"
                      value={vehicleInfo?.engineType}
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
              <Typography variant="h2">{translate('inventory.vehicleDetails')}</Typography>
              <Typography variant="h6" sx={{ whiteSpace: 'pre-line', textTransform: 'capitalize' }}>
                {currentLang.value === 'en'
                  ? vehicleInfo?.translated.en.replaceAll('%', '\n')
                  : vehicleInfo?.translated.ar.replaceAll('%', '\n')}
              </Typography>

              <Typography variant="h6" color="primary">
                {vehicleInfo?.isUsed ? usedDescription : newDescription}
              </Typography>
            </Card>
          </Grid>

          {vehicleInfo?.isActive && (
            <Grid xs={12} md={6}>
              <Card sx={{ p: 3, display: 'flex', height: 1, flexDirection: 'column' }}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {translate('inventory.makeItYours')}
                </Typography>
                {vehicleInfo?.id !== undefined && <ContactUsForm payload={payload} />}
              </Card>
            </Grid>
          )}

          <Grid xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h2"> {translate('inventory.warranty.title')}</Typography>
                  <Typography
                    sx={{ whiteSpace: 'pre-line', fontWeight: theme.typography.fontWeightLight }}
                  >
                    {translate('inventory.warranty.text')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h2">{translate('inventory.export.title')}</Typography>
                  <Typography
                    sx={{ whiteSpace: 'pre-line', fontWeight: theme.typography.fontWeightLight }}
                  >
                    {translate('inventory.export.text')}
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
