import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';
import { useResponsive } from 'src/hooks/use-responsive';
import getVariant from 'src/components/animate/variants/get-variant';

const LandingHero = () => {
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();
  const navigate = useNavigate();
  const handleContactUsClick = () => {
    navigate(paths(currentLang.value).website.contactUs);
  };

  return (
    <Box
      sx={{
        height: '100dvh',
        backgroundImage: mdUp
          ? `url(/assets/images/hero/hero-1${currentLang.value === 'ar' ? '-ar' : ''}.webp)`
          : 'url(/assets/images/hero/hero-2-mobile.webp)',
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
            <Box component={m.div} {...getVariant('fadeInRight')}>
              <SvgColor
                src="/assets/mercedes-logo.svg"
                sx={{ width: { sm: 175, xs: 75 }, height: { sm: 175, xs: 75 }, bgcolor: '#FFF' }}
                alt="mercedes-logo"
              />
            </Box>
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
                onClick={handleContactUsClick}
              >
                {translate('header.contactUs')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingHero;
