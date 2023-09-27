import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Stack, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
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
        height: { md: '100dvh', xs: '100dvh' },
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
        <Grid container spacing={4} sx={{ position: 'relative' }}>
          {/* <Image
            src="/assets/illustrations/engine.svg"
            sx={{ position: 'absolute', right: 0, transform: 'rotate(-90deg)', zIndex: 0 }}
          /> */}
          <Grid md={12} xs={12}>
            {/* <Image src="/assets/mercedes-logo.svg" width={100} height={100} /> */}
            <Box component={m.div} {...getVariant('fadeInUp')} sx={{ my: 2 }}>
              <Typography variant="overline" sx={{ color: 'secondary.light' }}>
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant={mdUp ? 'h1' : 'h2'}>
                <Box component="span">{translate('landing.hero.partOne')}</Box>
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {translate('landing.hero.partTwo')}
                </Box>
                <Box component="span">{translate('landing.hero.partThree')}</Box>
              </Typography>
            </Box>
          </Grid>

          <Grid md={12} xs={12}>
            <SearchParts />
          </Grid>

          <Grid md={12} xs={12}>
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
              <ProofIcon icon="codicon:workspace-trusted" text="Genuine Spare Parts" />
              <ProofIcon icon="la:shipping-fast" text="Fast Delivery & International Shipping" />
              <ProofIcon icon="basil:headset-outline" text="Responsive Customer Support" />
              <ProofIcon icon="solar:money-bag-outline" text="Best Price Grantee" />
            </Stack>
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
