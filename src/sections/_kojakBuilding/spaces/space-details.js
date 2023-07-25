import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _tours } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SpaceDetailsHeader from 'src/sections/_kojakBuilding/spaces/details/space-details-header';
import SpaceDetailsGallery from 'src/sections/_kojakBuilding/spaces/details/space-details-gallery';
import SpaceDetailsSummary from 'src/sections/_kojakBuilding/spaces/details/space-details-summary';
import SpaceDetailsContactCard from 'src/sections/_kojakBuilding/spaces/details/space-details-contact-card';
import SpaceDetailsContactForm from 'src/sections/_kojakBuilding/spaces/details/space-details-contact-form';

const _mockTour = _tours[0];

const _mockSpace = {
  id: 'space-1',
  type: 'Residential',
  rent: 33000,
  listingDate: new Date().toDateString(),
  city: 'Sharjah',
  location: 'Al Qasemeyah',
  buildingName: 'Kojak Tower',
  contactDetails: { fullName: 'Mohamed', mobile: '050-1234567', email: 'mohamed@kojak-group.com' },
  features: {
    area: '1250 sqft',
    bedrooms: 3,
    bathrooms: 3,
    ac: 'Central AC',
    parking: 0,
    cctv: true,
    security: true,
    healthClub: false,
    chequesNo: 6,
  },
  gallery: [
    'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
};

export default function SpaceDetails() {
  const { spaceId } = useParams();
  const loading = useBoolean(true);
  const [data, setData] = useState('');

  const { getProjectInfo } = useAuthContext();

  console.log(data);

  useEffect(() => {
    (async () => {
      setData(await getProjectInfo());
    })();
  }, [getProjectInfo]);

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
        links={[{ name: 'Home', href: '/' }, { name: _mockSpace.buildingName }]}
        sx={{ mt: 3, mb: 5 }}
      />

      <SpaceDetailsGallery images={_mockSpace.gallery} />

      <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
        <Grid xs={12} md={5} lg={4}>
          <Stack spacing={3}>
            <SpaceDetailsContactCard contactInfo={_mockSpace.contactDetails} />
            <SpaceDetailsContactForm tour={_mockTour} />
          </Stack>
        </Grid>

        <Grid xs={12} md={7} lg={8} sx={{ mb: 4 }}>
          <SpaceDetailsHeader spaceInfo={_mockSpace} />

          <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

          <SpaceDetailsSummary spaceFeatures={_mockSpace.features} />
        </Grid>
      </Grid>
    </Container>
  );
}
