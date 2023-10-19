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
        overflow: 'hidden',
        py: 3,
        bgcolor: 'background.default',
      }}
    >
      <Container
        sx={{
          py: 2,
          borderRadius: 2,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            mx: 'auto',
            maxWidth: 860,
            textAlign: 'center',
            pb: { xs: 5, md: 10 },
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Typography variant="h1">{translate('contactUs.title')}</Typography>

          <Typography>{translate('contactUs.subTitle')}</Typography>
        </Stack>
        <Grid
          container
          spacing={5}
          justifyContent={{ md: 'space-between' }}
          sx={{ p: isMdUp ? 3 : 1, bgcolor: 'background.neutral', borderRadius: 3 }}
        >
          <Grid
            xs={12}
            md={5}
            sx={{
              p: 3,
              px: { md: 5, xs: 2 },
            }}
          >
            <ContactUsInfo />
          </Grid>
          <Grid xs={12} md={7} sx={{ textAlign: { xs: 'center' } }}>
            <ContactUsForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
