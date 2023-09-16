import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Card, alpha, Button, Container } from '@mui/material';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

export default function LandingHero() {
  return <RenderDesktopHero />;
}

function RenderDesktopHero() {
  const mdUp = useResponsive('up', 'md');
  const { translate } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '85dvh',
        // bgcolor: 'primary.lighter',
        // backgroundImage: mdUp
        //   ? 'url(/assets/images/hero/hero-1.png)'
        //   : 'url(/assets/images/hero/hero-5.png)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ p: 5 }}>
          <Grid
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              alignContent: 'center',
              justifyContent: 'center',
              gap: 3,
              position: 'relative',
            }}
          >
            <Image src="/assets/shape/shape-1.svg" sx={{ position: 'absolute', zIndex: -1 }} />
            <Box>
              <Typography variant="overline" color="primary">
                {translate('landing.hero.heroText')}
              </Typography>
              <Typography variant="h1">{translate('landing.hero.partOne')}</Typography>
            </Box>
            <Box>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => navigate(paths.website.contactUs)}
              >
                {translate('header.contactUs')}
              </Button>
            </Box>
          </Grid>
          <Grid md={3} sx={{ px: 3 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 5,
                height: 0.5,
                bgcolor: 'error.main',
                mt: 8,
                mb: 2,
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '-10px 10px 0 0 #000',
              }}
            >
              <Typography variant="h1" color="white">
                Kojak
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 1)}`,
                  color: alpha('#000000', 0),
                }}
              >
                Spare Parts
              </Typography>
            </Card>
            <Card
              sx={{
                p: 3,
                borderRadius: 5,
                height: 0.5,
                bgcolor: 'primary.main',
                color: 'secondary.main',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '-10px 10px 0 0 #000',
              }}
            >
              <Typography variant="h1">Kojak</Typography>
              <Typography
                variant="h1"
                sx={{
                  WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 1)}`,
                  color: alpha('#000000', 0),
                }}
              >
                Exclusive
              </Typography>
            </Card>
          </Grid>
          <Grid md={3}>
            {/* <Image src="/assets/images/hero/hero-4.jpg" sx={{ borderRadius: 3 }} /> */}

            <Card
              sx={{
                p: 3,
                borderRadius: 5,
                height: 0.5,
                bgcolor: 'secondary.main',
                color: 'primary.main',
                mb: 2,
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: `-10px 10px 0 0 ${theme.palette.primary.main}`,
              }}
            >
              <Typography variant="h1">Kojak</Typography>
              <Typography
                variant="h1"
                sx={{
                  WebkitTextStroke: `1px ${alpha(theme.palette.primary.main, 1)}`,
                  color: alpha('#000000', 0),
                }}
              >
                Auto Maintenance
              </Typography>
            </Card>
            <Card
              sx={{
                p: 3,
                borderRadius: 5,
                height: 0.5,
                bgcolor: 'background.neutral',
                color: 'secondary.main',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '-10px 10px 0 0 #000',
              }}
            >
              <Typography variant="h1">Kojak</Typography>
              <Typography
                variant="h1"
                sx={{
                  WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 1)}`,
                  color: alpha('#000000', 0),
                }}
              >
                Building
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
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
