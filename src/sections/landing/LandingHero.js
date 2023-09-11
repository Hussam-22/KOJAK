import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

const GROUPS = ['Spare-parts', 'Auto-Maintenance', 'K-Exclusive', 'Building'];

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
        backgroundImage: 'url(/assets/images/hero/hero-3.png)',
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
        <Stack spacing={3}>
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
            <Box
              component="span"
              sx={{
                background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.darker})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {translate('landing.hero.partOne')}
            </Box>
            {/* <Box component="span">{translate('landing.hero.partTwo')}</Box> */}
          </Typography>

          {/* <Typography sx={{ color: 'common.white' }}>
            {translate('landing.hero.subText')}
          </Typography> */}

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {GROUPS.map((group) => (
              <Typography key={group} sx={{ color: 'common.white' }}>
                {group}
              </Typography>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
