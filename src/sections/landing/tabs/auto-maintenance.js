import { Box, Stack, Button, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
  const { translate } = useLocales();

  return (
    <Box>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        sx={{ p: 3, justifyContent: 'space-between', textAlign: { md: 'unset', xs: 'center' } }}
      >
        <Typography variant="h3" color="primary">
          Auto Repair Services
        </Typography>
        <Button variant="text" color="warning" endIcon={<Iconify icon="quill:link-out" />}>
          Visit Website
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(6,1fr)', xs: 'repeat(2,1fr)' },
          p: 2,
        }}
      >
        {_autoRepairServices
          .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
          .map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
      </Box>
    </Box>
  );
}
