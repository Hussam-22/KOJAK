import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import {
  Box,
  Card,
  alpha,
  Stack,
  Button,
  Skeleton,
  useTheme,
  Container,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

export default function Offers() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { addOffer, getOffers } = useAuthContext();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    (async () => {
      setOffers(await getOffers());
    })();
  }, [getOffers]);

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
          {mdUp && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
                gap: 4,
              }}
            >
              {offers.length === 0 &&
                [...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={300}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              {offers.length !== 0 && <OffersCard offers={offers} />}
            </Box>
          )}

          {!mdUp && (
            <Box>
              {offers.length === 0 && (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              )}

              {offers.length !== 0 && <MobileCarousel offers={offers} />}
            </Box>
          )}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate(paths.website.bookAppointment)}
              // onClick={() => addOffer()}
            >
              {translate('common.bookAppointment')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function OffersCard({ offers }) {
  const theme = useTheme();
  const { currentLang } = useLocales();
  return offers.map((offer, index) => (
    <Card
      sx={{ bgcolor: 'primary.main', color: 'common.black', p: 3, borderRadius: 1 }}
      key={offer.id}
    >
      <Stack spacing={1}>
        <Iconify icon={offer.icon} width={64} />
        <Typography variant="h4">
          {currentLang.value === 'en' ? offer.offerDetails.service : offer.translated.service.ar}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
            color: alpha(theme.palette.background.default, 0),
            fontFamily: 'Segoe UI',
            letterSpacing: 2,
          }}
        >
          {offer.isFree && (currentLang.value === 'en' ? 'FREE' : 'مجاناً')}
          {!offer.isFree &&
            (currentLang.value === 'en' ? offer.offerDetails.price : offer.translated.price.ar)}
        </Typography>
        <Typography
          sx={{
            textTransform: 'capitalize',
            fontWeight: theme.typography.fontWeightLight,
          }}
        >
          {currentLang.value === 'en'
            ? offer.offerDetails.description
            : offer.translated.description.ar}
        </Typography>

        <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
          {new Date(offer.validTill.seconds * 1000).toDateString()}
        </Typography>
      </Stack>
    </Card>
  ));
}

OffersCard.propTypes = {
  offers: PropTypes.array,
};

// -----------------------------------------------------

function MobileCarousel({ offers }) {
  const { currentLang } = useLocales();
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
          {offers.map((offer, index) => (
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
                    {currentLang.value === 'en'
                      ? offer.offerDetails.service
                      : offer.translated.service.ar}
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
                      color: alpha(theme.palette.background.default, 0),
                    }}
                  >
                    {offer.isFree && (currentLang.value === 'en' ? 'FREE' : 'مجاناً')}
                    {!offer.isFree &&
                      (currentLang.value === 'en'
                        ? offer.offerDetails.price
                        : offer.translated.price.ar)}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: theme.typography.fontWeightLight,
                    }}
                  >
                    {currentLang.value === 'en'
                      ? offer.offerDetails.description
                      : offer.translated.description.ar}
                  </Typography>

                  <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
                    {new Date(offer.validTill.seconds * 1000).toDateString()}
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

MobileCarousel.propTypes = {
  offers: PropTypes.array,
};
