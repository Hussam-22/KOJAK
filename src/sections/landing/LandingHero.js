import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Card, alpha, Button, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';
import { MotionContainer } from 'src/components/animate';
import getVariant from 'src/components/animate/variants/get-variant';

export default function LandingHero() {
  return <RenderDesktopHero />;
}

function RenderDesktopHero() {
  const mdUp = useResponsive('up', 'md');
  const { translate } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100dvh',
        // bgcolor: 'primary.lighter',
        backgroundImage: mdUp
          ? 'url(/assets/images/hero/hero-1.png)'
          : 'url(/assets/images/hero/hero-2-mobile.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'visible',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ p: 5 }}>
          <Grid
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              alignContent: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Box component={m.div} {...getVariant('fadeInUp')}>
              <Typography variant="overline" color="primary">
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant="h1" color="white">
                {translate('landing.hero.partOne')}
              </Typography>
            </Box>
            <Box component={m.div} {...getVariant('fadeInLeft')}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => navigate(paths.website.contactUs)}
              >
                {translate('header.contactUs')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
