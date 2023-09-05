import { useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

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

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <CustomBreadcrumbs
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
      />

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <EcommerceProductDetailsCarousel images={_mockProduct.images} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <VehicleDetailsInfo />
        </Grid>
      </Grid>
    </Container>
  );
}
