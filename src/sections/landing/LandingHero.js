import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import Label from 'src/components/label';
import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

export default function LandingHero() {
  return <RenderDesktopHero />;
}

function RenderDesktopHero() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        height: '100dvh',

        ...bgGradient({
          direction: mdUp ? 'to right' : 'to bottom',
          startColor: `${alpha(theme.palette.grey[50], 0.4)}`,
          endColor: `${alpha(theme.palette.grey[900], 0)}`,
          imgUrl: '/assets/images/hero/hero-1.jpg',
        }),

        // backgroundImage: 'url(/assets/images/hero/hero-1.jpg)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid container sx={{ height: 1 }}>
        <Grid
          md={6}
          sx={{
            px: 10,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack spacing={0}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                textAlign: 'left',
              }}
            >
              <Logo large showText={false} />
            </Box>
            <Typography variant="h3" sx={{ color: 'grey.800' }}>
              {translate('landing.hero.partTwo')}
            </Typography>

            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                lineHeight: 1.25,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {translate('landing.hero.heroText')}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: '3.05rem', md: '2.05rem', xs: '1.55rem' },
                // background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.main})`,
                // WebkitBackgroundClip: 'text',
                // WebkitTextFillColor: 'transparent',
                color: 'common.white',
              }}
            >
              {translate('landing.hero.partOne')}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
