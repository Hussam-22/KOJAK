import { useNavigate } from 'react-router';

import { Box, Card, Stack, alpha, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { _autoRepairServices } from 'src/_mock';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

export default function Offers() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Typography variant="h2">{translate('hotOffers.title')}</Typography>
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
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate(paths.website.bookAppointment)}
            >
              {translate('common.bookAppointment')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function OffersCard() {
  const theme = useTheme();
  const { translate } = useLocales();
  return _autoRepairServices
    .filter((service) => service.isOffer)
    .map((offer, index) => (
      <Card
        sx={{ bgcolor: 'primary.main', color: 'common.black', p: 3, borderRadius: 1 }}
        key={offer.id}
      >
        <Stack spacing={1}>
          <Iconify icon={offer.icon} width={64} />
          <Typography variant="h4">{translate(`hotOffers.cards.${index + 1}.title`)}</Typography>
          <Typography
            variant="h1"
            sx={{
              WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
              color: alpha(theme.palette.background.default, 0),
            }}
          >
            {translate(`hotOffers.cards.${index + 1}.price`)}
          </Typography>
          <Typography
            sx={{
              textTransform: 'capitalize',
              fontWeight: theme.typography.fontWeightLight,
            }}
          >
            {translate(`hotOffers.cards.${index + 1}.description`)}
          </Typography>

          {/* <Button variant="contained" color="secondary" size="large">
            Book your offer now!
          </Button> */}

          <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
            {translate(`hotOffers.cards.${index + 1}.endDate`)}
          </Typography>
        </Stack>
      </Card>
    ));
}

function MobileCarousel() {
  const { translate } = useLocales();
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
          {_autoRepairServices
            .filter((service) => service.isOffer)
            .map((offer, index) => (
              <Box key={offer.id} sx={{ p: 2 }}>
                <Card
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'common.black',
                    p: 3,
                    borderRadius: 1,
                  }}
                >
                  <Stack spacing={1}>
                    <Iconify icon={offer.icon} width={64} />
                    <Typography variant="h4">
                      {translate(`hotOffers.cards.${index + 1}.title`)}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
                        color: alpha(theme.palette.background.default, 0),
                      }}
                    >
                      {translate(`hotOffers.cards.${index + 1}.price`)}
                    </Typography>
                    <Typography
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: theme.typography.fontWeightLight,
                      }}
                    >
                      {translate(`hotOffers.cards.${index + 1}.description`)}
                    </Typography>

                    {/* <Button variant="contained" color="secondary" size="large">
            Book your offer now!
          </Button> */}

                    <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
                      {translate(`hotOffers.cards.${index + 1}.endDate`)}
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
