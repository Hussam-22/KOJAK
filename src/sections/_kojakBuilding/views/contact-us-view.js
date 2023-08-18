// @mui

import { Stack, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

// components
import { useLocales } from 'src/locales';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsInfo from 'src/sections/_kojakBuilding/contact-us/contactUsInfo';
import ContactUsForm from 'src/sections/_kojakBuilding/contact-us/contactUsForm';

export default function ContactUsView() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const { translate } = useLocales();

  return (
    <Container
      sx={{
        overflow: 'hidden',
        py: 5,
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
        {/* <Box
          sx={{
            position: 'absolute',
            fontSize: '7rem',
            lineHeight: 1,
            left: 0,
            right: 0,
            mx: 'auto',
            top: -30,
            zIndex: -1,
            color: theme.palette.grey[50],
          }}
        >
          CONTACT US
        </Box> */}
        <Typography variant="h1">{translate('contactUs.title')}</Typography>

        <Typography sx={{ color: 'text.secondary' }}>{translate('contactUs.subTitle')}</Typography>
      </Stack>
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
  );
}
