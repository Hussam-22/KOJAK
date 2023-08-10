// @mui

import { Stack, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

// components
// components
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/_kojakBuilding/contact-us/contactUsForm';
import ContactUsInfo from 'src/sections/_kojakBuilding/contact-us/contactUsInfo';

export default function ContactUsView() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

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
        <Typography variant="h1">Contact Us</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We&#39;re here to assist you. If you have any questions, feedback, or need support, please
          don&#39;t hesitate to reach out to us. Our dedicated team is ready to help you in any way
          we can.
        </Typography>
      </Stack>
      <Grid
        container
        spacing={5}
        justifyContent={{ md: 'space-between' }}
        sx={{ p: isMdUp ? 3 : 1 }}
      >
        <Grid
          xs={12}
          md={4}
          sx={{
            p: 3,
            px: 5,
          }}
        >
          <ContactUsInfo />
        </Grid>
        <Grid xs={12} md={8} sx={{ textAlign: { xs: 'center' } }}>
          {!isMdUp && (
            <Typography variant="h2" sx={{ my: 3 }}>
              Drop us a message
            </Typography>
          )}
          <ContactUsForm />
        </Grid>
      </Grid>
    </Container>
  );
}
