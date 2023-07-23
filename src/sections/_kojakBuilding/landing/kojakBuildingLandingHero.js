import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          ...bgGradient({
            direction: '115deg',
            startColor: `${alpha(theme.palette.custom.peach, 0.05)} 20%`,
            endColor: `${alpha(theme.palette.custom.peach, 0.2)} 60%`,
          }),
          //   border:'solid 2px #000000',
          borderRadius: 3,
          py: 15,
          mt: 12,
          display: { md: 'flex' },
          alignItems: { md: 'center' },
          height: { md: `80vh` },
        }}
        maxWidth="xl"
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              px: 8,
            }}
          >
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              Looking for residential or commercial space ?
            </Typography>

            <Typography variant="h1" sx={{ my: 3, textTransform: 'capitalize' }}>
              Find Your Perfect Space for Living or Business Thriving!
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              {`Your ideal residential or commercial space awaits, and we can't wait to be a part of your journey towards a brighter future. Let's find your perfect space together!`}
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'center', md: 'unset' }}
              justifyContent={{ xs: 'center', md: 'unset' }}
              sx={{ mt: 5 }}
            >
              <Button variant="contained" color="secondary" size="large">
                Explore Available Spaces
              </Button>
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={6} lg={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src="/assets/kojak-building/hero/hero-img-1.png"
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
