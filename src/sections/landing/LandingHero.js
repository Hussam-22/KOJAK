import { useNavigate } from 'react-router';

import { alpha } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

export default function LandingHero() {
  return <RenderDesktopHero />;
}

function RenderDesktopHero() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        ...bgGradient({
          direction: mdUp ? 'to right' : 'to bottom',
          startColor: `${alpha(theme.palette.grey[900], 0.9)}`,
          endColor: `${alpha(theme.palette.grey[100], 0)}`,
          imgUrl: mdUp ? '/assets/images/hero/hero-4.webp' : '/assets/images/hero/hero-mobile.webp',
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
                {translate('landing.hero.heroText')}
                <Box
                  component="span"
                  sx={{
                    background: `-webkit-linear-gradient(45deg,${theme.palette.warning.light},${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {translate('landing.hero.partOne')}
                </Box>
                <Box component="span">{translate('landing.hero.partTwo')}</Box>
              </Typography>

              <Typography sx={{ color: 'common.white' }}>
                {translate('landing.hero.subText')}
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(paths(currentLang.value).website.services)}
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
