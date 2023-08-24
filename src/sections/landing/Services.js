import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function Services() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ my: 8 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h2">Auto Repair Services</Typography>
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography sx={{ fontWeight: theme.typography.fontWeightLight, width: { md: '82%' } }}>
            Our expert technicians are dedicated to providing top-notch care for your Mercedes
            vehicle. From routine maintenance to intricate repairs, we have the knowledge and
            experience to keep your Mercedes running at its best. We use cutting-edge technology and
            genuine Mercedes parts to ensure the highest quality service. Experience the luxury of
            specialized care for your Mercedes-Benz. Drive in today and let us elevate your
            Mercedes-driving experience.
          </Typography>

          <Button variant="outlined" color="primary" size="large" sx={{ width: { md: '18%' } }}>
            Full list of services
          </Button>
        </Stack>
      </Stack>
      {/* <Box sx={{ p: { md: 10, xs: 1 } }}>
        <Image
          src="/assets/images/hero/car-services-2.png"
          sx={{ borderRadius: 1, border: `solid 4px ${theme.palette.primary.main}` }}
        />
      </Box> */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(3,1fr)', xs: 'repeat(1,1fr)' },
          gap: 3,
          my: 6,
        }}
      >
        {_autoRepairServices.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </Box>
    </Container>
  );
}
