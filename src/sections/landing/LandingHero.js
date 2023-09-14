import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { alpha, Button, Divider } from '@mui/material';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import Label from 'src/components/label';
import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

const PRACTICE = [
  { title: 'Spare-Parts', icon: 'spare-parts-icon' },
  { title: 'Repair Shop', icon: 'auto-icon' },
  { title: 'Dealership', icon: 'exclusive-icon' },
  { title: 'Property', icon: 'building-icon' },
];

export default function LandingHero() {
  const mdUp = useResponsive('up', 'md');
  return mdUp ? <RenderDesktopHero /> : <RenderMobileHero />;
}

function RenderDesktopHero() {
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        p: 25,
        position: 'relative',
        overflow: 'hidden',
        height: '90dvh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(to top in oklab, #FFFFFF 20%, #F1E2D0 194% 144%)`,
        m: 12,
        borderRadius: 5,
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 9, p: 15 }}>
        <Image
          src="/assets/images/hero/hero-4.jpg"
          sx={{ borderRadius: 5, width: 1300, height: 600, boxShadow: '7px 7px 0 1px #000' }}
        />
      </Box>
      <Box sx={{ width: '35%', zIndex: 9 }}>
        <Typography variant="overline" color="primary">
          {translate('landing.hero.heroText')}
        </Typography>
        <Typography variant="h1">{translate('landing.hero.partOne')}</Typography>
      </Box>
    </Box>
  );
}

function RenderMobileHero() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        p: 25,
        position: 'relative',
        overflow: 'hidden',
        height: '90dvh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(to top in oklab, #FFFFFF 20%, #F1E2D0 194% 144%)`,
        m: 12,
        borderRadius: 5,
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 9, p: 15 }}>
        <Image
          src="/assets/images/hero/hero-4.jpg"
          sx={{ borderRadius: 5, width: 1300, height: 600, boxShadow: '7px 7px 0 1px #000' }}
        />
      </Box>
      <Box sx={{ width: '35%', zIndex: 9 }}>
        <Typography variant="overline" color="primary">
          {translate('landing.hero.heroText')}
        </Typography>
        <Typography variant="h1">{translate('landing.hero.partOne')}</Typography>
      </Box>
    </Box>
  );
}

/* 
<Box
sx={{
  height: '75dvh',
  position: 'relative',
  backgroundImage: 'url(/assets/images/hero/hero-4.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
}}
>
<Grid container sx={{ height: 1 }}>
  <Grid
    md={5}
    sx={{
      px: 10,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Stack spacing={0}>
      <Typography variant="h1">{translate('landing.hero.partOne')}</Typography>
    </Stack>
  </Grid>
</Grid>
</Box> */

/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                textAlign: 'left',
              }}
            >
              <Logo large showText={false} />
            </Box> */

/* <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                lineHeight: 1.25,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {translate('landing.hero.heroText')}
            </Typography> */

/* <Typography variant="h3" sx={{ color: 'grey.800' }}>
              {translate('landing.hero.partTwo')}
            </Typography> */
