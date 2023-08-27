import { useNavigate } from 'react-router';

import { Stack, useTheme, Container, Typography } from '@mui/material';

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

export default function AboutVideo() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={3} sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h1">Our Services & How it works</Typography>
        <Typography>
          We understand the importance of a well-maintained vehicle. Our team of skilled technicians
          is committed to keeping your car running smoothly and safely. With years of experience and
          state-of-the-art equipment, we offer a comprehensive range of auto repair and maintenance
          services to keep your vehicle in top condition.
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative', width: 1, borderRadius: 2, overflow: 'hidden' }}
      >
        <video width="100%" height="25%" muted loop autoPlay playsInline>
          <source src="/assets/demo-video.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* <Player controls url="/assets/videos/students_class.mp4" /> */}
      </Stack>
    </Container>
  );
}

// ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']
