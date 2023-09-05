import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Box, Stack, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
// import { _products } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VehicleDetailsInfo from 'src/sections/services/details/vehicle-details-info';
import EcommerceProductDetailsInfo from 'src/sections/_ecommerce/product/details/ecommerce-product-details-info';
import EcommerceProductDetailsCarousel from 'src/sections/_ecommerce/product/details/ecommerce-product-details-carousel';
import EcommerceProductDetailsDescription from 'src/sections/_ecommerce/product/details/ecommerce-product-details-description';

// import EcommerceProductDetailsInfo from '../product/details/ecommerce-product-details-info';
// import EcommerceProductDetailsCarousel from '../product/details/ecommerce-product-details-carousel';
// import EcommerceProductDetailsDescription from '../product/details/ecommerce-product-details-description';

// ----------------------------------------------------------------------

const _mockProduct = [];

export default function ServiceDetailsView() {
  const loading = useBoolean(true);
  const { vehicleID } = useParams();
  const { getVehicleInfo } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();

    (async () => {
      setVehicleInfo(await getVehicleInfo(vehicleID));
    })();
  }, [getVehicleInfo, loading, vehicleID]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <Box sx={{ bgcolor: 'background.neutral', pt: 5, pb: 10 }}>
      <Container
        sx={{ overflow: 'hidden', bgcolor: 'background.paper', py: 3, px: 8, borderRadius: 3 }}
      >
        {/* <CustomBreadcrumbs
        links={[
          {
            name: 'Home',
          },
          {
            name: 'Mobile Phones',
          },
          {
            name: 'Apple iPhone 14',
          },
        ]}
        sx={{ my: 5 }}
      /> */}

        <Stack sx={{ mb: 2 }}>
          <Typography variant="overline">{vehicleInfo.brand}</Typography>
          <Typography variant="h2">{vehicleInfo.model}</Typography>
        </Stack>

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel />
          </Grid>

          <Grid xs={12} md={6} lg={5} />

          <Grid xs={12} md={6} lg={5}>
            <VehicleDetailsInfo vehicleInfo={vehicleInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
