import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
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

export default function KojakBuildingLandingHero() {
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
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        <Image
          src={`/assets/images/hero/hero-${currentLang.value === 'en' ? 'left' : 'right'}.webp`}
          height="100dvh"
          visibleByDefault
          disabledEffect
          alt="kojak-auto-maintenance-hero-img"
        />
      </Box>

      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Grid md={6} xs={12} />

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
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: 'primary.main',
                    lineHeight: currentLang.value === 'ar' ? 1.5 : 'unset',
                  }}
                >
                  {translate('hero.heroText')}
                </Box>
                {translate('hero.title')}
              </Typography>

              <Typography>{translate('hero.subText')}</Typography>

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
  const { translate, currentLang } = useLocales();

  return (
    <Box
      sx={{
        height: '100dvh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        backgroundImage: 'url(/assets/images/hero/hero-mobile.png)',
        backgroundSize: 'cover',
      }}
    >
      <Stack spacing={3} sx={{ p: 3, alignItems: 'center', textAlign: 'center', py: 11 }}>
        {/* <Image
          src="/assets/images/hero/hero-mobile.png"
          alt="kojak-auto-maintenance-hero-img"
          height="25dvh"
        /> */}
        <Typography
          sx={{
            textTransform: 'capitalize',
            fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
            lineHeight: 1.25,
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          <Box
            component="span"
            sx={{
              color: 'primary.main',
              lineHeight: currentLang.value === 'ar' ? 1.5 : 'unset',
            }}
          >
            {translate('hero.heroText')}
          </Box>
          {translate('hero.title')}
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
