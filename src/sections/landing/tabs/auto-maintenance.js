import { Box, Stack, Button, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
  const { translate } = useLocales();

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
