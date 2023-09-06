import { m } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { alpha } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

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

  // return mdUp ? <RenderDesktopHero /> : <RenderMobileHero />;
  return <RenderDesktopHero />;
}

function RenderDesktopHero() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  const { getFeaturedCars, fsGetImgDownloadUrl } = useAuthContext();
  const [index, setIndex] = useState(0);
  const [featuredCars, setFeatureCars] = useState([]);
  const [featuredCarsImages, setFeatureCarsImages] = useState([]);

  const selectedVehicleHandler = (vehicleID) =>
    setIndex(featuredCarsImages.findIndex((car) => car.id === vehicleID));

  useEffect(() => {
    (async () => {
      setFeatureCars(await getFeaturedCars());
    })();
  }, [getFeaturedCars]);

  useEffect(() => {
    const fetchData = async () => {
      if (featuredCars.length !== 0) {
        const newFeatureCarsImages = await Promise.all(
          featuredCars
            .filter((car) => car.isFeatured)
            .map(async (car) => {
              const imageUrl = await Promise.all(
                [...Array(4)].map(async (_, i) => fsGetImgDownloadUrl(car.id, i))
              );
              return { id: car.id, url: imageUrl };
            })
        );

        // Update state once with all the data
        setFeatureCarsImages((state) => [...state, ...newFeatureCarsImages]);
      }
    };

    fetchData();
  }, [featuredCars, fsGetImgDownloadUrl]);

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, maxWidth: '60%' }}>
          <Typography variant="h1" color="secondary">
            Featured Cars
          </Typography>
          <Typography color="secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora maxime esse
            voluptate pariatur placeat perspiciatis, sequi repellendus, nostrum consequuntur, ea
            quibusdam modi sit. Molestias modi accusantium architecto suscipit nobis!
          </Typography>
        </Box>

        <Grid container sx={{ bgcolor: 'background.neutral', p: 5, borderRadius: 2 }}>
          <Grid
            md={4}
            sx={{
              display: 'flex',
              alignItems: 'right',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            {featuredCars.length !== 0 && featuredCarsImages.length !== 0 && (
              <SideBar
                featuredCars={featuredCars}
                selectedVehicleID={selectedVehicleHandler}
                selectedCarID={featuredCarsImages[index].id}
              />
            )}
          </Grid>

          <Grid
            md={8}
            sx={{
              border: `solid 5px ${theme.palette.primary.main}`,
              borderRadius: 1,
            }}
          >
            {featuredCarsImages.length !== 0 && (
              <Box component={m.div} {...getVariant('fadeIn')}>
                <Image
                  src={featuredCarsImages[index].url[0]}
                  key={featuredCarsImages[index].url[0]}
                  ratio="16/9"
                  sx={{ borderRadius: '2px 2px 0 0' }}
                />
              </Box>
            )}

            {featuredCars.length !== 0 && featuredCarsImages.length !== 0 && (
              <FeaturesBar
                selectedCardInfo={featuredCars.find(
                  (car) => car.id === featuredCarsImages[index].id
                )}
                images={featuredCarsImages[index].url}
              />
            )}
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
