import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function Services() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Container maxWidth="xl" sx={{ my: 8 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h2">{translate('services.title')}</Typography>
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          {/* <Typography sx={{ fontWeight: theme.typography.fontWeightLight, width: { md: '82%' } }}>
            {translate('services.description')}
          </Typography> */}
        </Stack>
      </Stack>

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
          gridTemplateColumns: { md: 'repeat(3,1fr)', xs: 'repeat(1,1fr)' },
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
    </Container>
  );
}
