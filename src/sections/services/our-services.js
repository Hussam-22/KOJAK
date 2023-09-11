import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { _autoRepairServices } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import ServiceItem from 'src/sections/components/service-item';
import ServicesHowItWork from 'src/sections/services/how-it-works';

export default function OurServices() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Container maxWidth="xl" sx={{ pb: 8 }}>
      <Grid container spacing={4}>
        <Grid md={8} xs={12} sx={{ order: mdUp ? 1 : 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
              gap: 3,
              my: 6,
            }}
          >
            {_autoRepairServices
              .filter((service) => !service.isOffer && ['minor', 'major'].includes(service.icon))
              .map((service) => (
                <ServiceItem service={service} key={service.id} major />
              ))}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
              gap: 3,
              my: 6,
            }}
          >
            {_autoRepairServices
              .filter((service) => !service.isOffer && !['minor', 'major'].includes(service.icon))
              .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
              .map((service) => (
                <ServiceItem service={service} key={service.id} />
              ))}
          </Box>
        </Grid>
        <Grid md={4} xs={12} sx={{ mt: 2, order: mdUp ? 2 : 1 }}>
          <ServicesHowItWork />
        </Grid>
      </Grid>
    </Container>
  );
}
