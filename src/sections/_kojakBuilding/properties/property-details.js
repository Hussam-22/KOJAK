import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PropertyDetailsHeader from 'src/sections/_kojakBuilding/properties/details/property-details-header';
import PropertyDetailsSummary from 'src/sections/_kojakBuilding/properties/details/property-details-summary';
import PropertyDetailsGallery from 'src/sections/_kojakBuilding/properties/details/property-details-gallery';
import PropertyDetailsContactForm from 'src/sections/_kojakBuilding/properties/details/property-details-contact-form';
import PropertyDetailsContactCard from 'src/sections/_kojakBuilding/properties/details/property-details-contact-card';

export default function PropertyDetails() {
  const { propertyID } = useParams();
  const [spaceInfo, setSpaceInfo] = useState('');
  const [galleryURLs, setGalleryURLs] = useState([]);
  const { fsGetFolderImages, fsGetSpace } = useAuthContext();

  useEffect(() => {
    (async () => {
      setSpaceInfo(await fsGetSpace(propertyID));
      setGalleryURLs(await fsGetFolderImages(propertyID));
    })();
  }, [fsGetFolderImages, fsGetSpace, propertyID]);

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Properties', href: paths.website.properties },
          {
            name: `${spaceInfo?.description}`,
          },
        ]}
        sx={{ mt: 3, mb: 5 }}
      />

      {galleryURLs.length !== 0 && <PropertyDetailsGallery images={galleryURLs} />}

      {spaceInfo?.docID !== undefined && (
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

            <PropertyDetailsSummary spaceInfo={spaceInfo} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
