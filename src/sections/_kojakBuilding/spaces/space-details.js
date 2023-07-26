import { useParams } from 'react-router';
import { useState, useEffect, useCallback } from 'react';

import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

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

// const _mockSpace = {
//   id: 'space-1',
//   type: 'Residential',
//   rent: 33000,
//   listingDate: new Date().toDateString(),
//   city: 'Sharjah',
//   location: 'Al Qasemeyah',
//   buildingName: 'Kojak Tower',
//   contactDetails: { fullName: 'Mohamed', mobile: '050-1234567', email: 'mohamed@kojak-group.com' },
//   features: {
//     area: '1250 sqft',
//     bedrooms: 3,
//     bathrooms: 3,
//     ac: 'Central AC',
//     parking: 0,
//     cctv: true,
//     security: true,
//     healthClub: false,
//     chequesNo: 6,
//   },
//   gallery: [
//     'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F0_800x800.webp?alt=media&token=c0c61571-7806-445f-88b7-1bb1fccf1e1e',
//     'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F14_800x800.webp?alt=media&token=d820708b-4559-4d74-a162-48920a877d13',
//     'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   ],
// };

export default function SpaceDetails() {
  const { spaceId } = useParams();
  const loading = useBoolean(true);
  const [spaceInfo, setSpaceInfo] = useState('');
  const [galleryURLs, setGalleryURLs] = useState([]);

  const { fsGetImgDownloadUrl, getSpaceInfo } = useAuthContext();

  console.log(spaceInfo);

  useEffect(() => {
    (async () => {
      setSpaceInfo(await getSpaceInfo('C1001-1'));
    })();
  }, [getSpaceInfo]);

  useEffect(() => {
    if (spaceInfo.imagesIDs && spaceInfo?.imagesIDs?.length !== 0) {
      (async () => {
        setGalleryURLs(
          await Promise.all(spaceInfo.imagesIDs.map((id) => fsGetImgDownloadUrl('C1001-1', id)))
        );
      })();
    }
  }, [spaceInfo, fsGetImgDownloadUrl, getSpaceInfo, spaceInfo.imagesIDs]);

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
        links={[{ name: 'Home', href: '/' }, { name: spaceInfo.buildingName }]}
        sx={{ mt: 3, mb: 5 }}
      />

      {galleryURLs.length !== 0 && <SpaceDetailsGallery images={galleryURLs} />}

      {spaceInfo.id && (
        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <Stack spacing={3}>
              <SpaceDetailsContactCard contactInfo={spaceInfo.contactDetails} />
              <SpaceDetailsContactForm spaceInfo={spaceInfo} />
            </Stack>
          </Grid>

          <Grid xs={12} md={7} lg={8} sx={{ mb: 4 }}>
            <SpaceDetailsHeader spaceInfo={spaceInfo} />

            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

            <SpaceDetailsSummary spaceFeatures={spaceInfo.features} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
