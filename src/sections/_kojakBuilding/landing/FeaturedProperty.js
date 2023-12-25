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
  const { fsGetFeaturedProperty, fsGetFolderImages } = useAuthContext();
  const [images, setImages] = useState([]);
  const [featuredProperty, setFeaturedProperty] = useState([]);
  const { translate, currentLang } = useLocales();

  useEffect(() => {
    (async () => {
      setFeaturedProperty(await fsGetFeaturedProperty());
    })();
  }, [fsGetFeaturedProperty]);

  useEffect(() => {
    (async () => {
      if (featuredProperty?.docID) setImages(await fsGetFolderImages(featuredProperty.docID));
    })();
  }, [featuredProperty.docID, fsGetFolderImages]);

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
          onClick={() => navigate(`/properties/${featuredProperty?.docID}`)}
        >
          {translate('common.moreDetails')}
        </Button>
      </Stack>

      {images.length !== 0 && <PropertyDetailsGallery images={images} />}

      {featuredProperty?.docID && <PropertyDetailsHeader spaceInfo={featuredProperty} />}

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      {featuredProperty?.docID && (
        <PropertyDetailsSummary spaceInfo={featuredProperty} hideSummery />
      )}
    </Box>
  );
}

export default memo(FeaturedProperty);

// ----------------------------------------------------------------------
