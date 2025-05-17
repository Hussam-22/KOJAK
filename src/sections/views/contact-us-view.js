// @mui

import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

// components
import { useLocales } from 'src/locales';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';
import ContactUsInfo from 'src/sections/contact-us/contactUsInfo';

export default function ContactUsView() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 5 }}>
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
              borderRight: { md: 'dashed 1px #222' },
              borderBottom: { xs: 'dashed 1px #999', md: 'unset' },
              mb: { xs: 2, md: 'unset' },
            }}
          >
            <ContactUsInfo />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center' }, pl: { md: 5 } }}>
            <ContactUsForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
