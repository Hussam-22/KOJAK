import { Box, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import ServiceItem from 'src/sections/components/service-item';
import CarouselComponent from 'src/components/carousel/carousel-component';

export default function Services() {
  const theme = useTheme();
  const { translate } = useLocales();
  const smUp = useResponsive('up', 'sm');

  const services = _autoRepairServices
    .filter((service) => !service.isOffer && !['minor', 'major'].includes(service.icon))
    .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
    .map((service) => <ServiceItem service={service} key={service.id} />);

  return (
    <Container maxWidth="xl" sx={{ my: 8 }}>
      <Typography variant="h2">{translate('services.title')}</Typography>

      {/* Major & Minor Services */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(2,1fr)', sm: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
          gap: 3,
          my: 6,
          height: 1,
        }}
      >
        {_autoRepairServices
          .filter((service) => !service.isOffer && ['minor', 'major'].includes(service.icon))
          .map((service) => (
            <ServiceItem service={service} key={service.id} major />
          ))}
      </Box>

      {/* Other Services */}
      {smUp && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(3,1fr)', sm: 'repeat(2,1fr)' },
            gap: 3,
            my: 6,
          }}
        >
          {services}
        </Box>
      )}

      {!smUp && <CarouselComponent>{services}</CarouselComponent>}
    </Container>
  );
}
