import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/services/service-item';

export default function Services() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ py: 15 }}>
      <Stack spacing={1} sx={{ width: '60dvw' }}>
        <Typography variant="h2">Auto Repair Services</Typography>
        <Typography
          sx={{ fontWeight: theme.typography.fontWeightLight }}
        >{` Our expert technicians are dedicated to providing top-notch care for your Mercedes vehicle. From routine maintenance to intricate repairs, we have the knowledge and experience to keep your Mercedes running at its best. We use cutting-edge technology and genuine Mercedes parts to ensure the highest quality service. Experience the luxury of specialized care for your Mercedes-Benz. Drive in today and let us elevate your Mercedes-driving experience.`}</Typography>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, my: 6 }}>
        {_autoRepairServices.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </Box>

      <Button variant="contained" color="secondary" size="large">
        Check full list of services
      </Button>
    </Container>
  );
}
