import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';
import ServicesHowItWork from 'src/sections/services/how-it-works';

export default function OurServices() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h2">Our Services & How it works</Typography>
        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
          We understand the importance of a well-maintained vehicle. Our team of skilled technicians
          is committed to keeping your car running smoothly and safely. With years of experience and
          state-of-the-art equipment, we offer a comprehensive range of auto repair and maintenance
          services to keep your vehicle in top condition.
        </Typography>
      </Stack>
      <Grid container spacing={4}>
        <Grid md={8} xs={12}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
                gap: 3,
                my: 6,
              }}
            >
              {_autoRepairServices
                .filter((service) => !service.isOffer)
                .map((service) => (
                  <ServiceItem service={service} key={service.id} />
                ))}
            </Box>
          </Stack>
        </Grid>
        <Grid md={4} xs={12} sx={{ mt: 2 }}>
          <ServicesHowItWork />
        </Grid>
      </Grid>
    </Container>
  );
}
