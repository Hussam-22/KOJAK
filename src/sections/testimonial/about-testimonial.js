// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify/Iconify';
// utils

export default function LandingTestimonial() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Container maxWidth="xl" sx={{ py: 15 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ zIndex: 9, mb: 2 }}>
          {translate('testimonial.title')}
        </Typography>
        <Typography
          variant="h6"
          sx={{ zIndex: 9, fontWeight: theme.typography.fontWeightLight, maxWidth: { md: '60%' } }}
        >
          {translate('testimonial.description')}
        </Typography>
      </Box>

      <Stack direction={{ md: 'row', xs: 'column' }} spacing={4}>
        <Stack
          spacing={2}
          sx={{ p: 3, borderRadius: 1, bgcolor: 'primary.main', color: 'common.white' }}
        >
          <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.white' }} />
          <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {translate('testimonial.testimonialOne.text')}
          </Typography>

          <Typography variant="quote">
            {`"${translate('testimonial.testimonialOne.author')}"`}
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          sx={{ p: 3, borderRadius: 1, color: 'common.black', border: 'solid 2px #000' }}
        >
          <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.black' }} />
          <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {translate('testimonial.testimonialTwo.text')}
          </Typography>

          <Typography variant="quote">
            {`"${translate('testimonial.testimonialTwo.author')}"`}
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          sx={{ p: 3, borderRadius: 1, bgcolor: 'common.black', color: 'common.white' }}
        >
          <Iconify icon="carbon:quotes" sx={{ width: 48, height: 48, color: 'common.white' }} />
          <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {translate('testimonial.testimonialThree.text')}
          </Typography>

          <Typography variant="quote">
            {`"${translate('testimonial.testimonialThree.author')}"`}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
