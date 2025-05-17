import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { Container, Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import getVariant from 'src/components/animate/variants/get-variant';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';
import LandingSearchParts from 'src/sections/components/landing-search-parts';
import { textGradient } from 'src/theme/css';

const LandingHero = () => {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();
  const textGradientColor = textGradient(theme.palette.primary.main, theme.palette.info.main);

  return (
    <Box
      sx={{
        height: { md: '100dvh', xs: 'unset' },
        bgcolor: 'common.black',
        py: { md: 'unset', xs: 10 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ position: 'relative' }}>
          <Grid size={12} sx={{ textAlign: { md: 'center', xs: 'center' } }}>
            <Box component={m.div} {...getVariant('fadeInUp')} sx={{ my: 2 }}>
              <Typography variant="overline" sx={{ color: 'secondary.light' }}>
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant="h2">
                <Box component="span" sx={{ color: 'common.white' }}>
                  {translate('landing.hero.partOne')}
                </Box>
                <Box component="span" sx={{ ...textGradientColor }}>
                  {translate('landing.hero.partTwo')}
                </Box>
                <Box component="span" sx={{ color: 'common.white' }}>
                  {translate('landing.hero.partThree')}
                </Box>
              </Typography>
            </Box>
          </Grid>

          <Grid size={12}>
            <LandingSearchParts />
          </Grid>

          <Grid size={12}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
                gap: 2,
                mt: 2,
                textAlign: 'center',
              }}
            >
              <ProofIcon icon="lets-icons:check-fill" text="Genuine Spare Parts" />
              <ProofIcon icon="la:shipping-fast" text="Fast Delivery & International Shipping" />
              <ProofIcon icon="basil:headset-outline" text="Responsive Customer Support" />
              <ProofIcon icon="solar:money-bag-outline" text="Best Price Guarantee" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingHero;

// ----------------------------------------------------------------------------

function ProofIcon({ icon, text }) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Iconify icon={icon} width={32} height={32} sx={{ color: 'primary.main' }} />
      <Typography color="white">{text}</Typography>
    </Stack>
  );
}

ProofIcon.propTypes = { icon: PropTypes.string, text: PropTypes.string };
