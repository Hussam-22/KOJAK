import { Box, Card, Stack, alpha, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

const OFFERS = [
  {
    title: 'Car Inspection',
    description: 'get free car inspection prior booking online',
    icon: 'solar:clipboard-check-outline',
    price: 'Free',
  },
  {
    title: 'AC Gas Refill',
    description: 'get cool air in this hot summer, Inspect your AC & get Gas Refill',
    icon: 'ph:fan',
    price: '80 AED',
  },
  {
    title: 'Break Replacement',
    description: 'Breaks Inspection, Replacement & Resurfacing of break pads',
    icon: 'icon-park-twotone:brake-pads',
    price: '320 AED',
  },
  {
    title: 'Computer Diagnosis',
    description: 'diagnosis your car computer for any errors and get full report',
    icon: 'solar:cpu-linear',
    price: '100 AED',
  },
];

export default function Offers() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        pb: 8,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Typography variant="h2">HOT OFFERS</Typography>
          {mdUp ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
                gap: 4,
              }}
            >
              <OffersCard />
            </Box>
          ) : (
            <MobileCarousel />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function OffersCard() {
  const theme = useTheme();
  return OFFERS.map((offer) => (
    <Card
      sx={{ bgcolor: 'primary.main', color: 'common.black', p: 3, borderRadius: 1 }}
      key={offer.title}
    >
      <Stack spacing={1}>
        <Iconify icon={offer.icon} width={64} />
        <Typography variant="h4">{offer.title}</Typography>
        <Typography
          variant="h1"
          sx={{
            WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
            color: alpha(theme.palette.background.default, 0),
          }}
        >
          {offer.price}
        </Typography>
        <Typography
          sx={{
            textTransform: 'capitalize',
            fontWeight: theme.typography.fontWeightLight,
          }}
        >
          {offer.description}
        </Typography>

        <Button variant="contained" color="secondary" size="large">
          Book your offer now!
        </Button>

        <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
          valid until 29-Aug-2023
        </Typography>
      </Stack>
    </Card>
  ));
}

function MobileCarousel() {
  const theme = useTheme();
  const carousel = useCarousel({
    centerMode: true,
    centerPadding: '30px',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        leftButtonProps={{
          sx: {
            left: -5,
            opacity: 1,
            color: 'common.white',
            bgcolor: 'primary.dark',
            '&:hover': { bgcolor: 'primary.darker' },
            top: 0,
            bottom: 0,
            margin: 'auto 0',
            position: 'absolute',
            height: 35,
          },
        }}
        rightButtonProps={{
          sx: {
            right: -5,
            opacity: 1,
            color: 'common.white',
            bgcolor: 'primary.dark',
            '&:hover': { bgcolor: 'primary.darker' },
            top: 0,
            bottom: 0,
            margin: 'auto 0',
            position: 'absolute',
            height: 35,
          },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {OFFERS.map((offer) => (
            <Box key={offer.title} sx={{ p: 2 }}>
              <Card sx={{ bgcolor: 'primary.main', color: 'common.black', p: 3, borderRadius: 1 }}>
                <Stack spacing={1}>
                  <Iconify icon={offer.icon} width={64} />
                  <Typography variant="h4">{offer.title}</Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
                      color: alpha(theme.palette.background.default, 0),
                    }}
                  >
                    {offer.price}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: theme.typography.fontWeightLight,
                    }}
                  >
                    {offer.description}
                  </Typography>

                  <Button variant="contained" color="secondary" size="large">
                    Book your offer now!
                  </Button>

                  <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
                    valid until 29-Aug-2023
                  </Typography>
                </Stack>
              </Card>
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
