import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';
import Image from 'src/components/image';
import CountUp from 'src/components/count-up';
import { fShortenNumber } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const IMAGES = [...Array(4)].map(
  (_, index) => `/assets/kojak-building/images/about-${index + 1}.webp`
);

const SUMMARY = [
  { name: 'Apartments', number: 220 },
  { name: 'Happy Tenants', number: 1192 },
  { name: 'Years of Experience', number: 22 },
  { name: 'Total Leases processed', number: 12482 },
];

// ----------------------------------------------------------------------

export default function AboutUs() {
  const smUp = useResponsive('up', 'sm');

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
        }}
      >
        <Typography variant="h1">About Us</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          At Kojak Building, we are more than just a property rental company – we are your partners
          in finding the perfect space that aligns with your lifestyle and business needs. Whether
          you are searching for your dream home or a strategic location for your business, Kojak
          Building offers a diverse portfolio of residential and commercial spaces tailored to cater
          to your unique requirements.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {(smUp ? IMAGES : IMAGES.slice(0, 1)).map((img, index) => (
          <Grid key={img} xs={12} sm={6} md={index === 0 ? 6 : 2}>
            <Image alt={img} src={img} sx={{ height: 350, borderRadius: 2, width: 1 }} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          textAlign: 'center',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          pt: { xs: 3, md: 7 },
          pb: 10,
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.name} spacing={1}>
            <Typography variant="h2">
              <CountUp
                start={value.number / 5}
                end={value.number}
                formattingFn={(newValue) => fShortenNumber(newValue)}
              />

              <Typography
                variant="h4"
                component="span"
                sx={{ verticalAlign: 'top', ml: 0.5, color: 'primary.main' }}
              >
                +
              </Typography>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {value.name}
            </Typography>
          </Stack>
        ))}
      </Box>

      <Grid
        container
        spacing={{ xs: 5, md: 3 }}
        justifyContent="space-between"
        sx={{
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid xs={12} md={6} lg={5}>
          <Box
            sx={{
              mb: 2,
              width: 24,
              height: 3,
              borderRadius: 3,
              bgcolor: 'primary.main',
              mx: { xs: 'auto', md: 0 },
            }}
          />
          <Typography variant="h4">
            Quality is the foundation of everything we do at Kojak Building. From selecting the
            finest properties to maintaining them to the highest standards, we are dedicated to
            delivering excellence in every aspect of our service.
          </Typography>
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" color="primary">
                Our Vision
              </Typography>

              <Typography sx={{ color: 'text.secondary' }} paragraph>
                Our vision is to enrich lives and empower businesses by providing them with spaces
                that inspire creativity, productivity, and growth. We strive to be the preferred
                choice for individuals and enterprises seeking top-notch residential and commercial
                properties that reflect their aspirations and contribute to their success.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" color="primary">
                Our Mission
              </Typography>

              <Typography sx={{ color: 'text.secondary' }} paragraph>
                At Kojak Building, our mission is to create lasting impressions and enrich lives by
                providing exceptional residential and commercial spaces that inspire, elevate, and
                empower individuals and businesses alike.
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
