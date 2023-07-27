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

export default function SpaceDetails() {
  const { spaceId } = useParams();
  const loading = useBoolean(true);
  const [spaceInfo, setSpaceInfo] = useState('');
  const [galleryURLs, setGalleryURLs] = useState([]);

  const { fsGetImgDownloadUrl, getSpaceInfo } = useAuthContext();

  useEffect(() => {
    (async () => {
      setSpaceInfo(await getSpaceInfo(spaceId));
    })();
  }, [getSpaceInfo, spaceId]);

  useEffect(() => {
    if (spaceInfo.imagesIDs && spaceInfo?.imagesIDs?.length !== 0) {
      (async () => {
        setGalleryURLs(
          await Promise.all(spaceInfo.imagesIDs.map((id) => fsGetImgDownloadUrl(spaceId, id)))
        );
      })();
    }
  }, [spaceInfo, fsGetImgDownloadUrl, getSpaceInfo, spaceInfo.imagesIDs, spaceId]);

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

            <SpaceDetailsSummary spaceFeatures={spaceInfo.features} type={spaceInfo.type} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
