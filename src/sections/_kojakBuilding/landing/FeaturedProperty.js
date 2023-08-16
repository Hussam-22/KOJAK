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
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          py: 5,
          textAlign: { md: 'left', xs: 'center' },
        }}
        component={m.div}
        variants={varFade().inRight}
      >
        <Box
          sx={{
            border: `solid 3px #000000`,
            borderRadius: 3,
            bgcolor: 'common.white',
            p: 10,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
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

function PropertyFeatures({ featuredPropertyInfo }) {
  return (
    <>
      {/* <OverviewItem icon="icomoon-free:office" label="Type" text={featuredPropertyInfo.type} /> */}

      {featuredPropertyInfo.features.bedrooms !== 0 && (
        <OverviewItem
          icon="fluent:bed-24-regular"
          label="Bedrooms"
          text={`${featuredPropertyInfo.features.bedrooms}`}
        />
      )}

      <OverviewItem
        icon="cil:shower"
        label="Bathrooms"
        text={`${featuredPropertyInfo.features.bathrooms}`}
      />

      {/* <OverviewItem
        icon="carbon:location"
        label="Location"
        text={`${featuredPropertyInfo.city}, ${featuredPropertyInfo.location}`}
      /> */}
      <OverviewItem
        icon="tabler:ruler-measure"
        label="Total Area"
        text={`${featuredPropertyInfo.features.area} sqft`}
      />

      {/* <OverviewItem icon="carbon:floorplan" label="Layout" text={featuredPropertyInfo.spaceType} /> */}

      <OverviewItem
        icon="iconoir:air-conditioner"
        label="AC Type"
        text={featuredPropertyInfo.features.ac}
      />
      {featuredPropertyInfo.features.parking !== 0 && (
        <OverviewItem
          icon="tabler:parking"
          label="Parking"
          text={+featuredPropertyInfo.features.parking}
        />
      )}

      {featuredPropertyInfo.features.healthClub !== 0 && (
        <OverviewItem icon="iconoir:gym" label="Health Club" text="Available" />
      )}

      {featuredPropertyInfo.features.cctv && (
        <OverviewItem icon="bx:cctv" label="CCTV" text="Available" />
      )}
      {featuredPropertyInfo.features.security && (
        <OverviewItem
          icon="healthicons:security-worker-outline"
          label="Security"
          text="Available"
        />
      )}
      <OverviewItem
        icon="material-symbols:payments-outline"
        label="Payment Terms"
        text={`${featuredPropertyInfo.features.chequesNo} cheques`}
      />
    </>
  );
}

PropertyFeatures.propTypes = {
  featuredPropertyInfo: PropTypes.object,
};

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Stack spacing={1.5} direction="column" alignItems="left">
        <Iconify icon={icon} width={isMdUp ? 55 : 32} color="secondary.lighter" />
        <Typography sx={{ color: 'secondary.light', typography: { md: 'h6', xs: 'body1' } }}>
          {label}
        </Typography>
        <Typography sx={{ typography: { md: 'h5', xs: 'body1' } }}>{text}</Typography>
      </Stack>
    </Box>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};
