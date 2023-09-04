import { Container } from '@mui/material';

import VehiclesList from 'src/sections/services/vehicles-list';

export default function ServicesView() {
  return (
    <Container
      maxWidth="xl"
      sx={{ my: 10, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
    >
      <VehiclesList />
    </Container>
  );
}
