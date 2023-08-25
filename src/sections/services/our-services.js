import { Box, Stack, Typography } from '@mui/material';

import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function OurServices() {
  return (
    <Stack spacing={2} sx={{ pt: 12 }}>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Our Services
      </Typography>
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
  );
}
