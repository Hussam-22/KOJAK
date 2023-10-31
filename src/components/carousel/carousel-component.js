import PropTypes from 'prop-types';

import { Box, useTheme } from '@mui/material';

import useCarousel from 'src/components/carousel/use-carousel';
import Carousel, { CarouselArrows } from 'src/components/carousel';

function CarouselComponent({ children }) {
  const carousel = useCarousel({
    // centerMode: true,
    // centerPadding: '7px',
    infinite: true,
    speed: 500,
    autoplay: true,
    // fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
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
            bgcolor: 'primary.dark',
            '&:hover': { bgcolor: 'primary.darker' },
            top: 0,
            bottom: 0,
            margin: 'auto 0',
            position: 'absolute',
            height: 35,
          },
        }}
        rightButtonProps={{
          sx: {
            right: -5,
            opacity: 1,
            color: 'common.white',
            bgcolor: 'primary.dark',
            '&:hover': { bgcolor: 'primary.darker' },
            top: 0,
            bottom: 0,
            margin: 'auto 0',
            position: 'absolute',
            height: 35,
          },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {children}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
export default CarouselComponent;

CarouselComponent.propTypes = { children: PropTypes.node };
