import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
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
        backgroundImage: 'url(/assets/images/hero/hero-5.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={0}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Logo light large showText={false} />
          </Box>
          <Typography
            sx={{
              textTransform: 'capitalize',
              fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
              lineHeight: 1.25,
              fontWeight: theme.typography.fontWeightBold,
              color: 'common.white',
            }}
          >
            {translate('landing.hero.heroText')}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: '3.05rem', md: '2.05rem', xs: '1.55rem' },
              background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.darker})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {translate('landing.hero.partOne')}
          </Typography>

          <Typography variant="h3" sx={{ color: 'grey.600' }}>
            {translate('landing.hero.partTwo')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
