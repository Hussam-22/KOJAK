import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import { Stack, Button, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import VehicleCard from 'src/sections/services/vehicle-card';
import { varFade, MotionContainer } from 'src/components/animate';
import FeaturesBar from 'src/sections/featured-cars/components/features-bar';
import { rdxAddVehiclesToStore, rdxAddVehiclesCoverUrlsToStore } from 'src/redux/slices/siteStore';
import Carousel, { useCarousel, CarouselArrows, CarouselArrowIndex } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function SpotlightVehicles() {
  const { translate } = useLocales();
  const { getFeaturedCars } = useAuthContext();
  const featuredCars = useSelector((state) => state.siteStore.vehiclesList);
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const dispatch = useDispatch();

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    rtl: Boolean(theme.direction === 'rtl'),
  });

  useEffect(() => {
    (async () => {
      if (featuredCars.length === 0) dispatch(rdxAddVehiclesToStore(await getFeaturedCars()));
    })();
  }, [dispatch, featuredCars.length, getFeaturedCars]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        sx={{ p: 1, justifyContent: 'space-between', textAlign: { md: 'unset', xs: 'center' } }}
      >
        <Typography variant="h3" color="white">
          Spotlight Vehicles
        </Typography>
        <Button variant="text" color="warning" endIcon={<Iconify icon="quill:link-out" />}>
          Visit Website
        </Button>
      </Stack>

      <Card>
        <CarouselArrows
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: {
              left: 15,
              opacity: 1,
              color: 'common.white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              // ...(mdUp && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 15,
              opacity: 1,
              color: 'common.white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              // ...(mdUp && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {featuredCars.length !== 0 &&
              featuredCars.map((vehicle, index) =>
                mdUp ? (
                  <CarouselItem
                    key={vehicle.id}
                    vehicleInfo={vehicle}
                    active={index === carousel.currentIndex}
                  />
                ) : (
                  <VehicleCard vehicleInfo={vehicle} key={vehicle.id} />
                )
              )}
          </Carousel>
        </CarouselArrows>

        {mdUp && (
          <CarouselArrowIndex
            index={carousel.currentIndex}
            total={featuredCars.length}
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          />
        )}
      </Card>
    </Box>
  );
}

// CarouselAnimation.propTypes = {
//   data: PropTypes.array,
// };

// ----------------------------------------------------------------------

function CarouselItem({ vehicleInfo, active }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { fsGetImgDownloadUrl } = useAuthContext();
  const vehiclesCoverUrls = useSelector((state) => state.siteStore.vehiclesCoverUrls);
  const url = vehiclesCoverUrls.find((item) => item.id === vehicleInfo.id)?.coverUrl;

  useEffect(() => {
    if (vehiclesCoverUrls.findIndex((item) => item.id === vehicleInfo.id) === -1)
      (async () => {
        dispatch(
          rdxAddVehiclesCoverUrlsToStore({
            id: vehicleInfo.id,
            coverUrl: await fsGetImgDownloadUrl(vehicleInfo.id, 0),
          })
        );
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const variants = theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image dir="ltr" alt={vehicleInfo.model} src={url} ratio="21/9" />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} ${theme.direction === 'rtl' ? '100%' : '0%'} `,
            endColor: `${alpha(theme.palette.grey[900], 0)} 40%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={active}
        action
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '85%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={variants}>
          <FeaturesBar vehicleInfo={vehicleInfo} />
        </m.div>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  active: PropTypes.bool,
  vehicleInfo: PropTypes.shape({
    coverUrl: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    id: PropTypes.string,
  }),
};
