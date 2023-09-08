import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';
import Carousel, { useCarousel } from 'src/components/carousel';

export default function AutoMaintenance() {
  return (
    <GroupSection
      brand="Kojak Auto-Maintenance"
      backgroundURL="/assets/images/original/6.webp"
      mainText="Looking for Mercedes Auto Repair Shop ?"
      subText="Book an Appointment Online or Visit Kojak Auto-Maintenance Shop and let our expert team
                fix your car with experience since 1986 in Mercedes-Benz Cars"
      buttonText="Visit Kojak Auto-Maintenance Website"
    />
  );
}

function GroupSection({ brand, backgroundURL, mainText, subText, buttonText }) {
  const theme = useTheme();
  const { translate } = useLocales();

  const carousel = useCarousel({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2 },
      },
    ],
  });

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Stack
          sx={{
            textAlign: 'center',
          }}
          spacing={3}
        >
          <Box>
            <Typography variant="overline">{brand}</Typography>

            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                lineHeight: 1.25,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {mainText}
            </Typography>
          </Box>

          {/* <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(7,1fr)', xs: 'repeat(1,1fr)' },
                gap: 1,
                my: 6,
              }}
            >
              {_autoRepairServices
                .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                .map((service) => (
                  <ServiceItem service={service} key={service.id} />
                ))}
            </Box>
          </Box> */}

          <Box sx={{ bgcolor: 'custom.auto', py: 2, borderRadius: 1 }}>
            <Carousel {...carousel.carouselSettings}>
              {_autoRepairServices
                .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                .map((service) => (
                  <ServiceItem service={service} key={service.id} />
                ))}
            </Carousel>
          </Box>

          <Box>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              // onClick={() => navigate(paths.website.bookAppointment)}
            >
              {buttonText}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

GroupSection.propTypes = {
  brand: PropTypes.string,
  backgroundURL: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  buttonText: PropTypes.string,
};
