import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient, textGradient } from 'src/theme/css';

export default function LandingHero() {
  const mdUp = useResponsive('up', 'md');

  return mdUp ? <RenderDesktopHero /> : <RenderMobileHero />;
}

function RenderDesktopHero() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        ...bgGradient({
          direction: 'to right',
          startColor: `${alpha(theme.palette.grey[900], 0.9)}`,
          endColor: `${alpha(theme.palette.grey[100], 0)}`,
          imgUrl: '/assets/images/hero/hero-4.jpg',
        }),
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'left',
            height: '100%',
          }}
        >
          <Grid md={6} xs={12} sx={{ position: 'relative' }}>
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
              }}
              spacing={3}
            >
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                  lineHeight: 1.25,
                  fontWeight: theme.typography.fontWeightBold,
                  color: 'common.white',
                }}
              >
                {translate('hero.heroText')}
                <Box
                  component="span"
                  sx={{
                    background: `-webkit-linear-gradient(45deg,${theme.palette.info.light},${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {translate('hero.partOne')}
                </Box>
                <Box component="span">{translate('hero.partTwo')}</Box>
              </Typography>

              <Typography sx={{ color: 'common.white' }}>{translate('hero.subText')}</Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(paths.website.services)}
                >
                  {translate('common.actionButton')}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// -------------------------------------------------------

function RenderMobileHero() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        position: 'relative',
      }}
    >
      <Image
        src="/assets/images/hero/hero-mobile.webp"
        sx={{ position: 'absolute', bottom: 0, left: 0 }}
        alt="kojak-auto-maintenance-hero-img"
      />
      <Stack spacing={3} sx={{ p: 3, alignItems: 'center', textAlign: 'center', py: 11 }}>
        <Typography variant="h1" color="primary">
          {translate('hero.heroText')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
          {translate('hero.subText')}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(paths.website.bookAppointment)}
          >
            {translate('common.bookAppointment')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
