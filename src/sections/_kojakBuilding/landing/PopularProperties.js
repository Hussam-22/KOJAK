import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';

// ----------------------------------------------------------------------
export default function PopularProperties() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [properties, setProperties] = useState([]);
  const { getAllSpacesInfo } = useAuthContext();
  const { translate } = useLocales();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setProperties(await getAllSpacesInfo(true));
    })();
  }, [getAllSpacesInfo]);

  return (
    <Box sx={{ bgcolor: 'primary.lighter' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10 },
        }}
        maxWidth="xl"
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Stack spacing={3} flexGrow={1} sx={{ textAlign: { md: 'left', xs: 'center' } }}>
            <Typography variant="h2">{translate('properties.title')}</Typography>

            <Box sx={{ width: { md: '60%', xs: 'unset' } }}>
              <Typography variant="h6" sx={{ fontWeight: theme.typography.fontWeightLight }}>
                {translate('properties.subTitle')}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ my: 4 }}>
          <Grid md={6} xs={12}>
            {mdUp && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
                  gap: 4,
                }}
              >
                {properties.length !== 0 &&
                  properties
                    .filter((property) => property.bucketID !== '')
                    .slice(0, 4)
                    .map((property) => (
                      <Box key={property.id} sx={{}}>
                        <PropertyCard key={property.id} space={property} vertical />
                      </Box>
                    ))}
              </Box>
            )}

            {!mdUp && <CarouselProperties properties={properties} />}

            <Box sx={{ my: 5, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, typography: 'h4' }}
                onClick={() => navigate(paths.website.properties)}
              >
                {translate('common.exploreProperties')}
              </Button>
            </Box>
          </Grid>
          <Grid md={6} xs={12}>
            <FeaturedProperty />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function CarouselProperties({ properties }) {
  const theme = useTheme();
  const carousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    // vertical: true,
    // verticalSwiping: true,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        leftButtonProps={{
          sx: {
            left: -5,
            opacity: 1,
            color: 'common.white',
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            // ...(mdUp && { display: 'none' }),
          },
        }}
        rightButtonProps={{
          sx: {
            right: -5,
            opacity: 1,
            color: 'common.white',
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            // ...(mdUp && { display: 'none' }),
          },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {properties.length !== 0 &&
            properties
              .filter((property) => property.bucketID !== '')
              .slice(0, 4)
              .map((property) => (
                <Box
                  key={property.id}
                  sx={{
                    px: 2,
                  }}
                >
                  <PropertyCard key={property.id} space={property} vertical />
                </Box>
              ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

CarouselProperties.propTypes = {
  properties: PropTypes.array,
  // space: PropTypes.shape({
  //   id: PropTypes.string,
  //   spaceType: PropTypes.string,
  //   description: PropTypes.string,
  //   bucketID: PropTypes.string,
  //   coverImgID: PropTypes.string,
  //   listingDate: PropTypes.object,
  //   location: PropTypes.string,
  //   city: PropTypes.string,
  //   rent: PropTypes.any,
  //   rentSale: PropTypes.any,
  //   buildingName: PropTypes.string,
  //   type: PropTypes.string,
  //   isAvailable: PropTypes.bool,

  //   features: PropTypes.shape({
  //     bedrooms: PropTypes.number,
  //     bathrooms: PropTypes.number,
  //     area: PropTypes.string,
  //   }),
  // }),
};
