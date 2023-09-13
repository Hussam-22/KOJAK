import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';
import Label from 'src/components/label';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

const PRACTICE = [
  'Mercedes Spare-Parts',
  'Mercedes Repair Shop',
  'Mercedes Dealership',
  'Find Property',
];

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
        backgroundImage: 'url(/assets/images/hero/hero-1.jpg)',
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
            <Logo large showText={false} />
          </Box>
          <Typography variant="h3" sx={{ color: 'grey.400' }}>
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
              background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {translate('landing.hero.partOne')}
          </Typography>

          <Stack
            spacing={2}
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: '#333' }} />}
            sx={{ justifyContent: 'space-around', alignItems: 'center', mt: 2 }}
          >
            {PRACTICE.map((item) => (
              <Typography
                key={item}
                variant="h6"
                sx={{
                  p: 1,
                  color: 'warning.main',
                  // bgcolor: 'background.paper',
                  // border: 'solid 1px #222',
                  // borderRadius: 0.5,
                  fontWeight: theme.typography.fontWeightLight,
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
