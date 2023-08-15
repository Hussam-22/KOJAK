import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { memo, useState, useEffect } from 'react';

import { Masonry } from '@mui/lab';
import { useTheme } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Unstable_Grid2 as Grid } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';

function FeaturedProperty() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMdUp = useResponsive('up', 'md');
  const { fsGetFeaturedProperty, fsGetImgDownloadUrl } = useAuthContext();
  const [images, setImages] = useState([]);
  const [featuredProperty, setFeaturedProperty] = useState([]);

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
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.darker} 100%)`,
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          py: 10,
          textAlign: { md: 'left', xs: 'center' },
        }}
        component={m.div}
        variants={varFade().inRight}
        maxWidth="xl"
      >
        <Typography variant="h2" sx={{ color: 'common.white', mb: 3 }}>
          Hot Deal Property{' '}
          <Box component="span" sx={{ typography: 'h4' }}>
            <Iconify icon="noto:fire" width={54} /> {featuredProperty.rent}/y
          </Box>
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: 'common.white' }}
        >{`${featuredProperty.description} - ${featuredProperty.spaceType} at ${featuredProperty.location}, ${featuredProperty.city}`}</Typography>

        {!isMdUp && (
          <Box
            sx={{
              borderRadius: 1,
              border: `solid 3px ${theme.palette.primary.main}`,
              p: 1,
              mt: 4,
            }}
          >
            <Image src={images[0]} alt="property-img-1" ratio="4/3" sx={{ borderRadius: 1 }} />
          </Box>
        )}

        <Grid container columnSpacing={12}>
          <Grid md={6} xs={12}>
            <Box
              sx={{
                rowGap: 2.5,
                columnGap: 3,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                my: 6,
              }}
            >
              {featuredProperty.id !== undefined && (
                <PropertyFeatures featuredPropertyInfo={featuredProperty} />
              )}
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: 'common.white', color: 'primary.main' }}
              onClick={() => navigate(`/properties/${featuredProperty.id}`)}
            >
              Check Property
            </Button>
          </Grid>
          {isMdUp && (
            <Grid md={6} xs={12} sx={{ my: 6, zIndex: 9 }}>
              <Masonry columns={{ xs: 1, md: 2 }} spacing={0.5}>
                {images.length !== 0 &&
                  images.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      // ratio="4/3"
                      sx={{
                        borderRadius: 1,
                        border: `solid 3px ${theme.palette.primary.main}`,
                        p: 1,
                        // boxShadow: `8px 8px 0 0 ${theme.palette.common.black}`,
                      }}
                    />
                  ))}
              </Masonry>
            </Grid>
          )}
        </Grid>
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
        border: `solid 2px ${theme.palette.primary.main}`,
        p: isMdUp ? 2 : 1.5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={1.5} direction="column" alignItems="center">
        <Iconify icon={icon} width={isMdUp ? 55 : 32} color="primary.light" />
        <Typography sx={{ color: 'primary.light', typography: { md: 'h6', xs: 'body1' } }}>
          {label}
        </Typography>
        <Typography sx={{ color: 'common.white', typography: { md: 'h5', xs: 'body1' } }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};
