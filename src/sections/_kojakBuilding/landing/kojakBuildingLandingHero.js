import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import CountUp from 'src/components/count-up/count-up';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const SUMMARY = [
  { name: 'Apartments', number: 220 },
  { name: 'Happy Tenants', number: 1192 },
  { name: 'Years of Experience', number: 22 },
  { name: 'Total Leases processed', number: 12482 },
];

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const scrollToElement = () => {
    document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        zIndex: 9,
        position: 'relative',
      }}
    >
      <Container
        sx={{
          ...bgGradient({
            direction: '115deg',
            startColor: `${alpha(theme.palette.common.white, 0.15)} 30%`,
            endColor: `${alpha(theme.palette.primary.lighter, 0.1)} 70%`,
          }),
          border: 'solid 2px #000000',
          width: { xs: '90vw' },
          borderRadius: 1,
          py: { md: 15, xs: 8 },
          mt: { md: 12, xs: 8 },
          display: { md: 'flex' },
          alignItems: { md: 'center' },
          height: { md: `80vh`, xs: '80vh' },
        }}
        maxWidth="xl"
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          <Grid
            xs={12}
            md={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              px: { md: 8 },
            }}
          >
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              Looking for residential or commercial space ?
            </Typography>

            <Typography variant="h1" sx={{ mb: 3, textTransform: 'capitalize' }}>
              Find Your Perfect Space for Living or Business Thriving with{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                }}
              >
                KOJAK!
              </Box>
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              {`Your ideal residential or commercial space awaits, Let's find your perfect space together!`}
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'center', md: 'unset' }}
              justifyContent={{ xs: 'center', md: 'unset' }}
              sx={{ mt: 5 }}
            >
              <Button variant="contained" color="primary" size="large" onClick={scrollToElement}>
                Explore Available Spaces
              </Button>
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src="/assets/kojak-building/hero/hero-img-1.png"
              />

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
                  pt: 4,
                }}
              >
                {SUMMARY.map((value) => (
                  <Stack key={value.name} spacing={1}>
                    <Typography variant="h2">
                      <CountUp
                        start={value.number / 5}
                        end={value.number}
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
                      {value.name}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
