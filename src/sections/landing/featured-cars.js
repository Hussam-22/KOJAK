import { m } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import getVariant from 'src/components/animate/variants/get-variant';
import SideBar from 'src/sections/featured-cars/components/side-bar';
import FeaturesBar from 'src/sections/featured-cars/components/features-bar';

export default function FeaturedCars() {
  const mdUp = useResponsive('up', 'md');

  return mdUp ? <RenderDesktopHero /> : <RenderMobileHero />;
}

function RenderDesktopHero() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  const { getFeaturedCars } = useAuthContext();

  const [featuredCars, setFeatureCars] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedCarIndexHandler = (index) => setSelectedIndex(index);

  useEffect(() => {
    (async () => {
      setFeatureCars(await getFeaturedCars());
    })();
  }, [getFeaturedCars]);

  // useEffect(() => {
  //   (() => {
  //     if (featuredCars.length !== 0)
  //       featuredCars.map(async (car) => {
  //         const imgUrl = await fsGetImgDownloadUrl(car.bucketID, 0);
  //         setHeroImages((state) => [...state, imgUrl]);
  //       });
  //   })();
  // }, [featuredCars, fsGetImgDownloadUrl]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', left: '5%', top: '10%', zIndex: 2 }}>
        <Typography variant="h2" color="primary" sx={{ mixBlendMode: 'darken' }}>
          Featured Cars
        </Typography>
      </Box>
      {featuredCars.length !== 0 && (
        <Box
          component={m.img}
          src={featuredCars[selectedIndex].coverURL}
          {...getVariant('fadeIn')}
          sx={{
            width: '100dvw',
            height: '82dvh',
            objectFit: 'cover',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
          }}
          key={featuredCars[selectedIndex].id}
        />
      )}
      {featuredCars.length !== 0 && (
        <SideBar featuredCars={featuredCars} updateIndex={updateSelectedCarIndexHandler} />
      )}
      {featuredCars.length !== 0 && <FeaturesBar selectedCardInfo={featuredCars[selectedIndex]} />}

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
