import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { Container, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import VehicleCard from 'src/sections/services/vehicle-card';
import { varFade, MotionContainer } from 'src/components/animate';
import FeaturesBar from 'src/sections/featured-cars/components/features-bar';
import Carousel, { useCarousel, CarouselArrows, CarouselArrowIndex } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function SpotlightVehicles() {
  const { getFeaturedCars } = useAuthContext();
  const [featuredCars, setFeatureCars] = useState([]);
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
  });

  useEffect(() => {
    (async () => {
      setFeatureCars(await getFeaturedCars());
    })();
  }, [getFeaturedCars]);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, maxWidth: { md: '60%' } }}>
        <Typography variant="h1" color="secondary">
          Spotlight Vehicles
        </Typography>
        <Typography color="secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora maxime esse voluptate
          pariatur placeat perspiciatis, sequi repellendus, nostrum consequuntur, ea quibusdam modi
          sit. Molestias modi accusantium architecto suscipit nobis!
        </Typography>
      </Box>

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
    </Container>
  );
}

// CarouselAnimation.propTypes = {
//   data: PropTypes.array,
// };

// ----------------------------------------------------------------------

function CarouselItem({ vehicleInfo, active }) {
  const theme = useTheme();
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    (async () => {
      setCoverUrl(await fsGetImgDownloadUrl(vehicleInfo.id, 0));
    })();
  }, [fsGetImgDownloadUrl, vehicleInfo.id]);

  const variants = theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image dir="ltr" alt={vehicleInfo.model} src={coverUrl} ratio="16/9" />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
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
        {/* <m.div variants={variants}>
          <Typography variant="h3" gutterBottom>
            {vehicleInfo.brand}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Typography variant="body2" noWrap gutterBottom>
            {vehicleInfo.model}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Button variant="contained" sx={{ mt: 3 }}>
            View More
          </Button>
        </m.div> */}

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
