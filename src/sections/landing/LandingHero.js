import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, useTheme, Container } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { textGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import getVariant from 'src/components/animate/variants/get-variant';
import LandingSearchParts from 'src/sections/components/landing-search-parts';

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
          <Grid md={10} xs={12} sx={{ textAlign: { md: 'unset', xs: 'center' } }}>
            <Box component={m.div} {...getVariant('fadeInUp')} sx={{ my: 2 }}>
              {!mdUp && (
                <Box sx={{ mb: 2 }}>
                  <Image
                    src="/assets/mercedes-logo.svg"
                    width={{ md: 200, xs: 100 }}
                    height={{ md: 200, xs: 100 }}
                  />
                </Box>
              )}
              <Typography variant="overline" sx={{ color: 'secondary.light' }}>
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant="h1">
                <Box component="span">{translate('landing.hero.partOne')}</Box>
                <Box component="span" sx={{ ...textGradientColor }}>
                  {translate('landing.hero.partTwo')}
                </Box>
                <Box component="span">{translate('landing.hero.partThree')}</Box>
              </Typography>
            </Box>
          </Grid>

          {mdUp && (
            <Grid
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src="/assets/mercedes-logo.svg"
                width={{ md: 200, xs: 100 }}
                height={{ md: 200, xs: 100 }}
              />
            </Grid>
          )}

          <Grid md={12} xs={12}>
            <LandingSearchParts />
          </Grid>

          <Grid md={12} xs={12}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
                gap: 2,
                mt: 2,
                textAlign: 'center',
              }}
            >
              <ProofIcon icon="simple-icons:mercedes" text="Genuine Spare Parts" />
              <ProofIcon icon="la:shipping-fast" text="Fast Delivery & International Shipping" />
              <ProofIcon icon="basil:headset-outline" text="Responsive Customer Support" />
              <ProofIcon icon="solar:money-bag-outline" text="Best Price Grantee" />
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
      <Typography>{text}</Typography>
    </Stack>
  );
}

ProofIcon.propTypes = { icon: PropTypes.string, text: PropTypes.string };
