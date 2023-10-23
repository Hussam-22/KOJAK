// @mui

import { Box, Stack, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

// components
import { useLocales } from 'src/locales';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsInfo from 'src/sections/contact-us/contactUsInfo';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';

export default function ContactUsView() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const { translate } = useLocales();

  return (
    <Box
      sx={{
        py: 5,
      }}
    >
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1">{translate('contactUs.title')}</Typography>
          <Typography>{translate('contactUs.subTitle')}</Typography>
        </Box>

        <Grid
          container
          spacing={5}
          justifyContent={{ md: 'space-between' }}
          sx={{ p: isMdUp ? 3 : 1 }}
        >
          <Grid
            xs={12}
            md={5}
            sx={{
              p: 3,
              borderRight: 'dashed 1px #222',
            }}
          >
            <ContactUsInfo />
          </Grid>
          <Grid xs={12} md={7} sx={{ textAlign: { xs: 'center' }, pl: 5 }}>
            <ContactUsForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
