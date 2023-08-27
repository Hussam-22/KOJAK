import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, Stack, Button, Rating, Avatar, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
// utils

export default function LandingTestimonial() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
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

          {mdUp && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => navigate(paths.website.bookAppointment)}
            >
              {translate('common.exploreProperties')}
            </Button>
          )}
        </Grid>

        <Grid md={7} xs={12}>
          <Stack direction={{ md: 'row', xs: 'column' }} spacing={4}>
            <Stack
              spacing={2}
              sx={{ p: 3, borderRadius: 1, bgcolor: 'primary.main', color: 'common.black' }}
            >
              <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.black' }} />
              <Typography>
                {` Exceptional Service! I've been a loyal customer of KOjak for years, and I couldn't be happier with the level of expertise and care they provide for my Mercedes. From routine maintenance to complex repairs, their team of skilled technicians always goes above and beyond. My car runs like a dream, thanks to Kojak. I wouldn't trust anyone else with my Mercedes!`}
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
                {`I can't express how grateful I am for Kojak. Their Mercedes expertise is unmatched, and their dedication to customer satisfaction is truly commendable. They took the time to explain the issues with my car and provided a transparent breakdown of the costs. The repairs were done quickly, and my Mercedes feels brand new. I highly recommend Kojak to all Mercedes owners`}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Avatar src="/assets/images/avatar/avatar_7.svg" sx={{ width: 48, height: 48 }} />
                <Typography>Moza Ahmad</Typography>
              </Stack>
            </Stack>
          </Stack>

          {!mdUp && (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 4 }}
                // onClick={() => navigate(paths.website.properties)}
              >
                {translate('common.exploreProperties')}
              </Button>
            </Box>
          )}
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
