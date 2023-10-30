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
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        py: 15,
        bgcolor: 'background.neutral',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ mb: 5, px: 1 }}>
          <Typography variant="overline" color="primary">
            Testimonials
          </Typography>
          <Typography variant="h1">Don&#39;t Take Our Word for Granted</Typography>
          <Typography variant="h5" sx={{ fontWeight: theme.typography.fontWeightLight }}>
            At KOJAK, we take immense pride in providing top-notch services for Mercedes car owners.
            But don&#39;t just take our word for it – here&#39;s what our valued customers have to
            say about their experiences with us:
          </Typography>
        </Stack>
      </Container>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {_testimonials.slice(0, 6).map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1 }}>
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>
      {/* </CarouselArrows> */}
    </Box>
  );
}

LandingTestimonial.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function TestimonialItem({ testimonial, index, sx, ...other }) {
  const { name, review, car } = testimonial;
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        borderRadius: 1,
        minHeight: 250,
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          textAlign: 'center',
        }}
        spacing={3}
      >
        <Rating
          value={5}
          sx={{
            '& .MuiRating-iconHover': {
              color: '#ff3d47',
            },
          }}
          readOnly
        />

        <Typography
          sx={{
            lineHeight: 1.75,
            fontWeight: theme.typography.fontWeightLight,
            // color: 'common.white',
          }}
        >
          {review}
        </Typography>

        <Box>
          <Typography variant="h6" color="primary">
            {name}
          </Typography>
          <Typography sx={{ color: 'secondary.light' }}>{car}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

TestimonialItem.propTypes = {
  sx: PropTypes.object,
  testimonial: PropTypes.object,
  index: PropTypes.number,
};
