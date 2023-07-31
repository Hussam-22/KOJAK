import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack, Button, Unstable_Grid2 as Grid } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------
export default function WhatWeOffer() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [properties, setProperties] = useState([]);
  const { getAllSpacesInfo } = useAuthContext();

  useEffect(() => {
    (async () => {
      setProperties(await getAllSpacesInfo());
    })();
  }, [getAllSpacesInfo]);

  const carousel = useCarousel({
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      {/* <MotionViewport disableAnimatedMobile> */}
      <Container
        sx={{
          pt: { xs: 5, md: 10 },
        }}
        maxWidth="xl"
        // component={m.div}
        // variants={varFade().inRight}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Stack spacing={3} flexGrow={1} sx={{ maxWidth: '650px' }}>
            <Typography variant="h2">Featured Properties</Typography>
            <Typography>
              At{' '}
              <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Kojak Building
              </Box>{' '}
              , we take pride in offering an extensive selection of both commercial and residential
              spaces that cater to all your needs. Whether you&#39;re looking to upgrade your
              business headquarters or find a cozy abode to call home, we&#39;ve got you covered.
            </Typography>
          </Stack>

          {/* {mdUp && <CarouselArrows spacing={2} onNext={carousel.onNext} onPrev={carousel.onPrev} />} */}
        </Stack>

        <Box
          sx={{
            position: 'relative',
            ml: { md: -2 },
            width: { md: 'calc(100% + 32px)' },
          }}
        >
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: -5,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                // ...(mdUp && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: -5,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                // ...(mdUp && { display: 'none' }),
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {properties
                .filter((property) => property.isAvailable)
                .map((property) => (
                  <Box
                    key={property.id}
                    sx={{
                      px: 2,
                      pt: { xs: 8, md: 10 },
                      pb: { xs: 10, md: 15 },
                    }}
                  >
                    <PropertyCard key={property.id} space={property} vertical />
                  </Box>
                ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
      {/* </MotionViewport> */}
    </Box>
  );
}
