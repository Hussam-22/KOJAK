import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
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
    slidesToShow: 3,
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
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Stack
            spacing={3}
            flexGrow={1}
            sx={{ maxWidth: { md: '60%', xs: '100%' }, textAlign: { md: 'left', xs: 'center' } }}
          >
            <Typography variant="h2">Properties</Typography>
            <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
              At Kojak Building , we take pride in offering an extensive selection of both
              commercial and residential spaces that cater to all your needs. Whether you&#39;re
              looking to upgrade your business headquarters or find a cozy abode to call home,
              we&#39;ve got you covered.
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
