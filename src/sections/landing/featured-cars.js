import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function FeaturedCars() {
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
          src="/assets/images/hero/hero-4.jpeg"
          height="82dvh"
          width="100dvw"
          visibleByDefault
          disabledEffect
          alt="kojak-auto-maintenance-hero-img"
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          // right: 0,
          height: '18dvh',
          width: 1,
          p: 3,
          background: alpha('#FFFFFF', 0.85),
        }}
      >
        <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }} direction="row">
          <Stack direction="column">
            <Typography variant="h1" color="primary">
              Mercedes
            </Typography>
            <Typography variant="h3" sx={{ color: 'grey.400' }}>
              G 63 AMG
            </Typography>
          </Stack>

          <Stack direction="row" spacing={6}>
            <Stack direction="column">
              <Typography variant="h4" color="primary">
                HP
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.400' }}>
                556
              </Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="h4" color="primary">
                Type
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.400' }}>
                Electric
              </Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="h4" color="primary">
                Year
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.400' }}>
                2023
              </Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="h4" color="primary">
                Price
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.400' }}>
                765,000 AED
              </Typography>
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography variant="h4" color="primary">
                Color
              </Typography>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    border: 'solid 1px #000',
                    borderRadius: '50%',
                    backgroundColor: '#159753',
                  }}
                />
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    border: 'solid 1px #000',
                    borderRadius: '50%',
                    backgroundColor: '#224853',
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Image src="/assets/images/cars/car-1.webp" height="10vh" sx={{ borderRadius: 1 }} />
            <Image src="/assets/images/cars/car-2.webp" height="10vh" sx={{ borderRadius: 1 }} />
            <Image src="/assets/images/cars/car-3.webp" height="10vh" sx={{ borderRadius: 1 }} />
          </Stack>

          <Box>
            <Button variant="contained" size="large">
              View Details
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* <Container maxWidth="xl" sx={{ height: 1 }}>
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
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '19dvw',
                  WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 0.1)}`,
                  color: alpha(theme.palette.background.default, 0),
                }}
              >
                {currentLang.value === 'en' ? 'KOJAK' : 'كوجك'}
              </Typography>
            </Box>
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
                <Box component="span" sx={{ color: 'primary.main' }}>
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
      </Container> */}
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
