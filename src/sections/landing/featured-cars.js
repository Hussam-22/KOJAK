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
  const { getFeaturedCars, fsGetImgDownloadUrl } = useAuthContext();
  const [index, setIndex] = useState(0);
  const [featuredCars, setFeatureCars] = useState([]);
  const [featuredCarsImages, setFeatureCarsImages] = useState([]);

  const selectedVehicleHandler = (vehicleID) =>
    setIndex(featuredCarsImages.findIndex((car) => car.id === vehicleID));

  console.log(featuredCarsImages);

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
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      <Box sx={{ position: 'absolute', width: '65%' }}>
        {featuredCarsImages.length !== 0 && (
          <Image src={featuredCarsImages[index].url[0]} ratio="6/4" />
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '35%',
          height: 1,
          right: 0,
          bgcolor: 'common.white',
          py: 10,
          px: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h1" color="secondary" sx={{ mixBlendMode: 'darken' }}>
              Featured Cars
            </Typography>
            <Typography color="secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora maxime esse
              voluptate pariatur placeat perspiciatis, sequi repellendus, nostrum consequuntur, ea
              quibusdam modi sit. Molestias modi accusantium architecto suscipit nobis!
            </Typography>
          </Box>
          {featuredCars.length !== 0 && (
            <SideBar featuredCars={featuredCars} selectedVehicleID={selectedVehicleHandler} />
          )}
        </Stack>
      </Box>

      {/* {featuredCarsImages.length !== 0 && (
        <Box
          component={m.img}
           
          {...getVariant('fadeIn')}
          sx={{
            width: '100dvw',
            height: '82dvh',
            objectFit: 'cover',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            // filter: 'grayscale(40%)',
          }}
          key={featuredCarsImages[index].id}
        />
      )} */}

      {featuredCars.length !== 0 && featuredCarsImages.length !== 0 && (
        <FeaturesBar
          selectedCardInfo={featuredCars.find((car) => car.id === featuredCarsImages[index].id)}
          images={featuredCarsImages[index].url}
        />
      )}
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
