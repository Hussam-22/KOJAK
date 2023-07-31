import { m } from 'framer-motion';
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
import { MotionContainer } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';
import getVariant from 'src/sections/examples/animate-view/get-variant';

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
          backgroundImage: 'url(/assets/kojak-building/hero/hero-img-2.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
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
            </Typography>
            <MotionContainer
              component={m.h1}
              sx={{
                typography: 'h1',
                display: 'flex',
                overflow: 'hidden',
                lineHeight: 1,
                mt: -2,
                color: 'primary.main',
                justifyContent: { xs: 'center', md: 'unset' },
              }}
            >
              {'KOJAK'.split('').map((letter, index) => (
                <m.span key={index} variants={getVariant('fadeIn')}>
                  {letter}
                </m.span>
              ))}
            </MotionContainer>

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

          {/* {mdUp && (
            <Grid xs={12} md={7}>
              <Box component={m.div} {...getVariant('fadeInUp')}>
                <Image
                  visibleByDefault
                  disabledEffect
                  alt="marketing market"
                  src="/assets/kojak-building/hero/hero-img-2.jpg"
                />
              </Box>
            </Grid>
          )} */}
        </Grid>
      </Container>
    </Box>
  );
}
