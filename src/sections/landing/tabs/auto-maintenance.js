import { Box } from '@mui/material';

import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { md: 'repeat(6,1fr)', xs: 'repeat(2,1fr)' },
      }}
    >
      {_autoRepairServices
        .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
        .map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
    </Box>
  );
}
