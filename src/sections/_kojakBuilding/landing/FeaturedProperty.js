import { useNavigate } from 'react-router';
import { memo, useState, useEffect } from 'react';

import { useTheme } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Divider } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
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
  const { translate, currentLang } = useLocales();

  const descriptionValue =
    currentLang.value === 'ar'
      ? featuredProperty.descriptionAr?.ar || ''
      : featuredProperty.description;

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
        borderRadius: 1,
        p: { md: 5, xs: 2 },
        boxShadow: `-10px 10px 0 0 ${theme.palette.primary.main}`,
        border: `solid 2px ${theme.palette.common.black}`,
        bgcolor: 'background.default',
      }}
    >
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        textAlign={{ md: 'unset', xs: 'center' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h2">
          {translate('featuredProperty.title')}
          <Iconify icon="noto:fire" width={54} />
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/properties/${featuredProperty.id}`)}
        >
          {translate('common.moreDetails')}
        </Button>
      </Stack>

      {images.length !== 0 && <PropertyDetailsGallery images={images} />}

      {featuredProperty.id !== undefined && <PropertyDetailsHeader spaceInfo={featuredProperty} />}

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      {featuredProperty.id !== undefined && (
        <PropertyDetailsSummary
          spaceFeatures={featuredProperty.features}
          spaceType={featuredProperty.spaceType}
          hideSummery
        />
      )}
    </Box>
  );
}

export default memo(FeaturedProperty);

// ----------------------------------------------------------------------
