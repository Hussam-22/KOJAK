import { useRef } from 'react';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, Stack, Avatar, Rating, Container, Typography } from '@mui/material';

// components
import { _testimonials } from 'src/_mock';
import Carousel from 'src/components/carousel';
import Iconify from 'src/components/iconify/Iconify';
// utils

export default function LandingTestimonial() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Grid container spacing={3}>
        <Grid md={5} xs={12}>
          <Typography variant="h2" sx={{ zIndex: 9, color: 'common.white', mb: 2 }}>
            What our customers say
          </Typography>
          <Typography variant="h6" sx={{ zIndex: 9, fontWeight: theme.typography.fontWeightLight }}>
            At KOJAK, we take immense pride in providing top-notch services for Mercedes car owners.
            But don&#39;t just take our word for it – here&#39;s what our valued customers have to
            say about their experiences with us:
          </Typography>
        </Grid>

        <Grid md={7} xs={12}>
          <Stack direction="row" spacing={4}>
            <Stack
              spacing={2}
              sx={{ p: 3, borderRadius: 1, bgcolor: 'primary.main', color: 'common.black' }}
            >
              <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.black' }} />
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, illo! Aperiam,
                inventore iste culpa explicabo fuga ipsam atque cupiditate corrupti laudantium nisi
                ab odio fugiat quae eaque eligendi, exercitationem repudiandae.
              </Typography>
              <Stack direction="row" alignItems="center">
                <Avatar src="/assets/images/avatar/avatar_8.svg" sx={{ width: 48, height: 48 }} />
                <Typography>Rashed Mohamed</Typography>
              </Stack>
            </Stack>

            <Stack
              spacing={2}
              sx={{ p: 3, borderRadius: 1, bgcolor: 'common.white', color: 'common.black' }}
            >
              <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.black' }} />
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, illo! Aperiam,
                inventore iste culpa explicabo fuga ipsam atque cupiditate corrupti laudantium nisi
                ab odio fugiat quae eaque eligendi, exercitationem repudiandae.
              </Typography>
              <Stack direction="row" alignItems="center">
                <Avatar src="/assets/images/avatar/avatar_7.svg" sx={{ width: 48, height: 48 }} />
                <Typography>Moza Ahmad</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* <Carousel ref={carouselRef} {...carouselSettings}>
        {_testimonials.slice(0, 6).map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1 }}>
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          </Box>
        ))}
      </Carousel> */}
    </Container>
  );
}

// LandingTestimonial.propTypes = {
//   data: PropTypes.array,
// };

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
