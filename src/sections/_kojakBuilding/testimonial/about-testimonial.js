import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import { TestimonialItemContent, TestimonialItemThumbnail } from './about-testimonial-item';

const REVIEWS = [
  {
    arabic: 'الخدمة التي تلقيتها من فريق التأجير لديكم كانت ممتازة...',
    english: 'The service I received from your leasing team was excellent...',
  },
  {
    arabic: 'أنا سعيد جداً بتجربتي معكم في تأجير العقارات...',
    english: 'I am extremely pleased with my experience with you in property leasing...',
  },
  {
    arabic: 'أردت أن أشكركم على خدمتكم الممتازة في تأجير المكاتب التجارية...',
    english: 'I wanted to thank you for your excellent service in leasing commercial offices...',
  },
  {
    arabic: 'تجربتي مع فريق التأجير كانت مذهلة...',
    english: 'My experience with the leasing team was amazing...',
  },
  {
    arabic: 'لا يمكنني سوى تقديم الإشادة بجودة الخدمة التي حصلت عليها من موقعكم...',
    english: 'I can only praise the quality of service I received from your website...',
  },
  {
    arabic: 'شكرًا لكم على جهودكم في مساعدتي على العثور على منزل مريح وجميل...',
    english: 'Thank you for your efforts in helping me find a comfortable and beautiful home...',
  },
  {
    arabic: 'لا يمكنني التعبير عن مدى سعادتي بالشقة التي استأجرتها...',
    english: "I can't express how happy I am with the apartment I rented...",
  },
  {
    arabic: 'تجربة تأجيري معكم كانت ممتازة وسهلة للغاية...',
    english: 'My leasing experience with you was excellent and very easy...',
  },
];

// ----------------------------------------------------------------------

export default function AboutTestimonial({ testimonials }) {
  const theme = useTheme();
  const { translate } = useLocales();

  const carouselLarge = useCarousel({
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });

  const carouselThumb = useCarousel({
    autoplay: true,
    slidesToShow: 5,
    centerMode: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),

    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        textAlign: 'center',
        overflow: 'hidden',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 5 }}>
              {translate('testimonial.title')}
            </Typography>

            <CarouselArrows
              onNext={carouselThumb.onNext}
              onPrev={carouselThumb.onPrev}
              leftButtonProps={{
                sx: { display: { xs: 'none', md: 'inline-flex' } },
                'aria-label': 'Left Arrow',
              }}
              rightButtonProps={{
                sx: { display: { xs: 'none', md: 'inline-flex' } },
                'aria-label': 'Right Arrow',
              }}
            >
              <Carousel
                {...carouselLarge.carouselSettings}
                asNavFor={carouselThumb.nav}
                ref={carouselLarge.carouselRef}
              >
                {testimonials.map((_, index) => (
                  <TestimonialItemContent key={index} review={REVIEWS[index]} />
                ))}
              </Carousel>

              <Box sx={{ mb: 3, mx: 'auto', maxWidth: { xs: 360, sm: 420 } }}>
                <Carousel
                  {...carouselThumb.carouselSettings}
                  asNavFor={carouselLarge.nav}
                  ref={carouselThumb.carouselRef}
                >
                  {testimonials.map((testimonial, index) => (
                    <TestimonialItemThumbnail
                      key={testimonial.id}
                      testimonial={testimonial}
                      selected={carouselLarge.currentIndex === index}
                    />
                  ))}
                </Carousel>
              </Box>
            </CarouselArrows>

            {testimonials.map(
              (testimonial, index) =>
                carouselLarge.currentIndex === index && (
                  <Stack key={testimonial.id} spacing={0.5}>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {testimonial.role}
                    </Typography> */}
                  </Stack>
                )
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

AboutTestimonial.propTypes = {
  testimonials: PropTypes.array,
};
