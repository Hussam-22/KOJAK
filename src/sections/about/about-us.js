import { locales } from 'numeral';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';
import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import CountUp from 'src/components/count-up';
import { useResponsive } from 'src/hooks/use-responsive';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const IMAGES = [...Array(4)].map(
  (_, index) => `/assets/kojak-building/images/about-${index + 1}.webp`
);

const SUMMARY = [
  { label: 'happyTenants', value: 842, color: 'success', icon: 'ion:happy-outline' },
  { label: 'leasesProcessed', value: 12482, color: 'info', icon: 'solar:document-outline' },
  { label: 'apartments', value: 220, color: 'warning', icon: 'bx:building-house' },
  // { label: 'Years of Experience', value: 22, color: 'error', icon: 'ri:shield-star-line' },
];

// ----------------------------------------------------------------------

export default function AboutUs() {
  const smUp = useResponsive('up', 'sm');
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
        }}
      >
        <Typography variant="h1">{translate('about.aboutUs.title')}</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {translate('about.aboutUs.subTitle')}
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
          gridTemplateColumns: 'repeat(3, 1fr)',
          pt: { xs: 3, md: 7 },
          pb: 10,
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.label} spacing={1}>
            <Typography variant="h2">
              <CountUp
                start={value.value / 5}
                end={value.value}
                formattingFn={(newValue) => newValue}
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
              {translate(`hero.${value.label}`)}
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
          <Typography variant="h4">{translate('about.aboutUs.subTitle2')}</Typography>
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" color="primary">
                {translate('about.vision')}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }} paragraph>
                {translate('about.visionText')}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" color="primary">
                {translate('about.mission')}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }} paragraph>
                {translate('about.missionText')}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
