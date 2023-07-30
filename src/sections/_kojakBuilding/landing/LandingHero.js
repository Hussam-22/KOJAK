import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import CountUp from 'src/components/count-up/count-up';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  // const scrollToElement = () => {
  //   document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        zIndex: 9,
        // position: 'relative',
        height: { md: `100vh`, xs: '80vh' },
        ...bgGradient({
          direction: '125deg',
          startColor: `${alpha(theme.palette.primary.light, 0.15)} 30%`,
          endColor: `${alpha(theme.palette.primary.lighter, 0.1)} 70%`,
        }),
      }}
    >
      <Container
        sx={{
          // border: 'solid 2px #000000',
          width: { xs: '90vw' },
          borderRadius: 1,
          py: { md: 10, xs: 8 },
          mt: { md: 12, xs: 8 },
          display: { md: 'flex' },
          alignItems: { md: 'center' },
          position: 'relative',
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate(paths.website.properties)}
              >
                Explore Available Properties
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
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
