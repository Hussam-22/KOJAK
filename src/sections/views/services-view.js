import { useTheme, Container } from '@mui/material';

import OurServices from 'src/sections/services/our-services';
import AboutServices from 'src/sections/services/about-serices';
import ServicesHowItWork from 'src/sections/services/how-it-works';
import RegularMaintenance from 'src/sections/services/regular-maintenance';

export default function ServicesView() {
  const theme = useTheme();
  return (
    <>
      <Container sx={{ py: 5 }}>
        <AboutServices />
        <OurServices />
        <ServicesHowItWork />
      </Container>
      <RegularMaintenance />
    </>
  );
}
