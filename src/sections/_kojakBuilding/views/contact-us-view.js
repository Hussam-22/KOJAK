// @mui

import {
  Link,
  Stack,
  Divider,
  useTheme,
  Container,
  IconButton,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
// components
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/_kojakBuilding/contact-us/contactUsForm';

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
          <Stack spacing={3} alignItems="flex-start">
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center">
                <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> Email
              </Stack>

              <Link color="inherit" variant="body2" href="mailto:hello@kojak-building.com">
                hello@kojak-building.com
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center">
                <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> Phone
              </Stack>

              <Typography variant="body2">052 9242728</Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center">
                <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> Address
              </Stack>

              <Typography variant="body2">
                <Link
                  href="https://www.google.com/maps/place/Kojak+Group+of+Companies/@25.3253059,55.4046755,15z/data=!4m6!3m5!1s0x3e5f57dbcabe0c49:0x67452d730806d23a!8m2!3d25.3253059!4d55.4046755!16s%2Fg%2F11bbwn0zxl?entry=ttu"
                  target="_blank"
                  rel="noopener"
                >
                  Industrial Area 4, Sharjah, United Arab Emirates
                </Link>
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center">
                <Iconify icon="mingcute:time-line" width={24} sx={{ mr: 1 }} /> Working Hours
              </Stack>

              <Typography variant="body2">8 AM to 6 PM - Saturday to Thursday</Typography>
            </Stack>

            <Divider sx={{ border: 'dashed 1px #CCCCCC' }} flexItem />

            <Stack spacing={1}>
              <Typography variant="overline">Follow Us</Typography>
              <Stack direction="row">
                {_socials.map((social) => (
                  <Link
                    key={social.value}
                    href={social.path}
                    noWrap
                    underline="none"
                    target="_blank"
                  >
                    <IconButton color="inherit">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Stack>
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
