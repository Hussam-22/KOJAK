import { useRef } from 'react';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Stack, Rating, Container, Typography } from '@mui/material';

// components
import { _testimonials } from 'src/_mock';
import Carousel from 'src/components/carousel';
// utils

export default function LandingTestimonial() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const carouselSettings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: 'linear',
    infinite: true,
    pauseOnHover: false,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 15 }}>
      <Stack
        spacing={2}
        sx={{ width: { md: '66%', xs: 'auto' }, textAlign: { md: 'left', xs: 'center' }, mb: 5 }}
      >
        <Typography variant="h2" sx={{ zIndex: 9, color: 'common.white' }}>
          Don&#39;t Take Our Word for Granted
        </Typography>
        <Typography variant="h6" sx={{ zIndex: 9, fontWeight: theme.typography.fontWeightLight }}>
          At KOJAK, we take immense pride in providing top-notch services for Mercedes car owners.
          But don&#39;t just take our word for it – here&#39;s what our valued customers have to say
          about their experiences with us:
        </Typography>
      </Stack>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {_testimonials.slice(0, 6).map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1 }}>
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}

LandingTestimonial.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function TestimonialItem({ testimonial, index, sx, ...other }) {
  const { name, review, rating } = testimonial;
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          textAlign: 'center',
          ...sx,
        }}
        {...other}
      >
        <Rating value={5} readOnly />

        <Typography
          sx={{
            my: 3,
            lineHeight: 1.75,
            color: 'common.white',
            fontWeight: theme.typography.fontWeightLight,
          }}
        >
          {review}
        </Typography>

        <Typography variant="h6" color="primary">
          {name}
        </Typography>
      </Stack>
    </Card>
  );
}

TestimonialItem.propTypes = {
  sx: PropTypes.object,
  testimonial: PropTypes.object,
  index: PropTypes.number,
};
