import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

const REGULAR_MAINTENANCE = [
  {
    service: 'Fluid Inspections and Replacements',
    description:
      'Ensure all vital fluids (coolant, brake fluid, transmission fluid, etc.) are at optimal levels and condition.',
    icon: 'fluids',
  },
  {
    service: 'Tire Rotations and Balancing',
    description: 'Extend the life of your tires and maintain even tread wear.',
    icon: 'tire',
  },
  {
    service: 'Brake Inspections',
    description: 'Ensure your brakes are in good working order for your safety.',
    icon: 'breaks',
  },
  {
    service: 'Battery Testing',
    description: 'Avoid unexpected dead batteries with routine checks.',
    icon: 'battery',
  },
  {
    service: 'Full Car Inspection',
    description:
      'Comprehensive examination of your vehicle to identify and address any issues, ensuring overall safety and performance.',
    icon: 'inspection',
  },
  {
    service: 'Car Wash',
    description: 'Spotless, head-turning finish, inside and out car wash',
    icon: 'carwash',
  },
];

export default function RegularMaintenance() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'common.black',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid container>
        <Grid md={7} xs={12}>
          <Container maxWidth="md">
            <Stack sx={{ px: 7, pt: 7, pb: 3 }}>
              <Typography variant="h2">
                We Offer Comprehensive Regular Maintenance Services
              </Typography>
              <Typography>{`We specialize in providing top-notch regular maintenance services tailored to your vehicle's specific needs. Our team of skilled technicians uses the latest diagnostic tools and follows manufacturer-recommended service schedules to ensure your car receives the care it deserves.`}</Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
                gap: 4,
                p: 7,
              }}
            >
              {REGULAR_MAINTENANCE.map((maintenance) => (
                <Box
                  key={maintenance.service}
                  sx={{ border: 'solid 2px #121212', p: 2, borderRadius: 1 }}
                >
                  <Stack spacing={1} textAlign="center">
                    <Box>
                      <Image
                        src={`/assets/images/service-icons/${maintenance.icon}.svg`}
                        width={65}
                      />
                    </Box>
                    <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>
                      {maintenance.service}
                    </Typography>
                    <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                      {maintenance.description}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Container>
        </Grid>
        <Grid md={5}>
          <Image src="/assets/images/repair/repair-img-2.jpg" ratio="3/4" />
        </Grid>
      </Grid>
    </Box>
  );
}

// ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']
