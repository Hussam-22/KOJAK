import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PropertyDetailsHeader from 'src/sections/_kojakBuilding/properties/details/property-details-header';
import PropertyDetailsSummary from 'src/sections/_kojakBuilding/properties/details/property-details-summary';
import PropertyDetailsGallery from 'src/sections/_kojakBuilding/properties/details/property-details-gallery';
import PropertyDetailsContactForm from 'src/sections/_kojakBuilding/properties/details/property-details-contact-form';
import PropertyDetailsContactCard from 'src/sections/_kojakBuilding/properties/details/property-details-contact-card';

const PAGE_NAME = 'PROPERTY-DETAILS';

export default function PropertyDetails() {
  const { propertyID } = useParams();
  const loading = useBoolean(true);
  const [spaceInfo, setSpaceInfo] = useState('');
  const [galleryURLs, setGalleryURLs] = useState([]);
  const { fsGetImgDownloadUrl, getSpaceInfo, updatePageAnalytic } = useAuthContext();
  const { translate, currentLang } = useLocales();

  useEffect(() => {
    (async () => updatePageAnalytic(PAGE_NAME, propertyID))();
  }, [propertyID, updatePageAnalytic]);

  const description =
    currentLang.value === 'ar' ? spaceInfo?.descriptionAr?.ar || '' : spaceInfo?.description || '';

  useEffect(() => {
    (async () => {
      setSpaceInfo(await getSpaceInfo(propertyID));
    })();
  }, [getSpaceInfo, propertyID]);

  useEffect(() => {
    if (spaceInfo.imagesIDs && spaceInfo?.imagesIDs?.length !== 0) {
      (async () => {
        setGalleryURLs(
          await Promise.all(
            spaceInfo.imagesIDs.map((imgID) => fsGetImgDownloadUrl(spaceInfo.bucketID, imgID))
          )
        );
      })();
    }
  }, [spaceInfo, fsGetImgDownloadUrl, getSpaceInfo, spaceInfo.imagesIDs, propertyID]);

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
          { name: translate('header.properties'), href: paths.website.properties },
          {
            name: `${description}`,
          },
        ]}
        sx={{ mt: 3, mb: 5 }}
      />

      {galleryURLs.length !== 0 && <PropertyDetailsGallery images={galleryURLs} />}
      {spaceInfo.bucketID === '' && galleryURLs.length === 0 && (
        <Image
          src="/assets/kojak-building/no_preview.jpg"
          alt="no-preview"
          width={400}
          height={400}
        />
      )}

      {spaceInfo?.id !== undefined && (
        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mb: 8 }}>
          <Grid xs={12} md={5} lg={4}>
            <Stack spacing={3}>
              <PropertyDetailsContactCard contactInfo={spaceInfo.contactDetails} />
              <PropertyDetailsContactForm spaceInfo={spaceInfo} />
            </Stack>
          </Grid>

          <Grid xs={12} md={7} lg={8} sx={{ mb: 4 }}>
            <PropertyDetailsHeader spaceInfo={spaceInfo} />

            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

            <PropertyDetailsSummary
              spaceFeatures={spaceInfo.features}
              spaceType={spaceInfo.spaceType}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
