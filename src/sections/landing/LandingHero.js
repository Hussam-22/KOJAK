import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, Button, TextField, Container } from '@mui/material';

import Image from 'src/components/image';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { useResponsive } from 'src/hooks/use-responsive';
import SearchParts from 'src/sections/components/search-parts';
import getVariant from 'src/components/animate/variants/get-variant';

const LandingHero = () => {
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();
  const navigate = useNavigate();
  const handleContactUsClick = () => {
    navigate(paths.website.contactUs);
  };

  return (
    <Box
      sx={{
        height: { md: '60dvh', xs: '100dvh' },
        bgcolor: 'background.dark',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ p: 5, position: 'relative' }}>
          {/* <Image
            src="/assets/illustrations/engine.svg"
            sx={{ position: 'absolute', right: 0, transform: 'rotate(-90deg)', zIndex: 0 }}
          /> */}
          <Grid md={12} xs={12}>
            {/* <Image src="/assets/mercedes-logo.svg" width={100} height={100} /> */}
            <Box component={m.div} {...getVariant('fadeInUp')} sx={{ my: 2 }}>
              <Typography variant="overline" color="primary">
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant={mdUp ? 'h1' : 'h2'} color="white">
                {translate('landing.hero.partOne')}
              </Typography>
            </Box>
          </Grid>

          <Grid md={12} xs={12}>
            <Typography sx={{ ml: 1, color: 'secondary.light' }}>
              Search Available Spare Parts
            </Typography>
            <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.neutral', flexGrow: 1 }}>
              <SearchParts />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingHero;
