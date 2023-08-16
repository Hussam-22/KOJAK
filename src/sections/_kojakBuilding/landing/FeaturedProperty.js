import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { memo, useState, useEffect } from 'react';

import { Masonry } from '@mui/lab';
import { useTheme } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Divider, Unstable_Grid2 as Grid } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertyDetailsHeader from 'src/sections/_kojakBuilding/properties/details/property-details-header';
import PropertyDetailsSummary from 'src/sections/_kojakBuilding/properties/details/property-details-summary';
import PropertyDetailsGallery from 'src/sections/_kojakBuilding/properties/details/property-details-gallery';

function FeaturedProperty() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMdUp = useResponsive('up', 'md');
  const { fsGetFeaturedProperty, fsGetImgDownloadUrl } = useAuthContext();
  const [images, setImages] = useState([]);
  const [featuredProperty, setFeaturedProperty] = useState([]);
  const { translate } = useLocales();

  useEffect(() => {
    (async () => {
      setFeaturedProperty(await fsGetFeaturedProperty());
    })();
  }, [fsGetFeaturedProperty]);

  useEffect(() => {
    if (Object.entries(featuredProperty).length !== 0) {
      (async () => {
        const getImages = [...Array(5)].map(async (_, index) =>
          fsGetImgDownloadUrl(featuredProperty.bucketID, index + 1)
        );
        setImages(await Promise.all([...getImages]));
      })();
    }
  }, [featuredProperty, fsGetImgDownloadUrl]);

  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
      }}
    >
      <Container
        sx={{
          py: 5,
        }}
      >
        <Box
          sx={{
            border: `solid 3px #000000`,
            borderRadius: 3,
            bgcolor: 'common.white',
            p: { md: 10, xs: 3 },
          }}
        >
          <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between">
            <Typography variant="h2" sx={{ mb: 3 }}>
              {translate('featuredProperty.title')}
              <Iconify icon="noto:fire" width={54} />
            </Typography>

            <Button variant="text" onClick={() => navigate(`/properties/${featuredProperty.id}`)}>
              {translate('common.moreDetails')}
            </Button>
          </Stack>

          {images.length !== 0 && <PropertyDetailsGallery images={images} />}

          {featuredProperty.id !== undefined && (
            <PropertyDetailsHeader spaceInfo={featuredProperty} />
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

          {featuredProperty.id !== undefined && (
            <PropertyDetailsSummary
              spaceFeatures={featuredProperty.features}
              spaceType={featuredProperty.spaceType}
              hideSummery
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default memo(FeaturedProperty);

// ----------------------------------------------------------------------
