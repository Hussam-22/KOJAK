import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function InternationalBusiness() {
  return (
    <Box sx={{ py: 8, position: 'relative' }}>
      <Container sx={{ bgcolor: 'background.paper', p: 5, borderRadius: 3, mt: 8 }}>
        <Box sx={{ position: 'absolute', top: 50, right: 0 }}>
          <Image src="/assets/illustrations/illustration_map.svg" />
        </Box>
        <Stack spacing={3} sx={{ color: 'common.white', px: 3 }}>
          <Typography variant="h2" color="primary">
            Global Reach, Local Excellence
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-line', zIndex: 99 }}>
            {`At Kojak Group, our commitment to Mercedes-Benz excellence knows no borders. With a proud tradition of delivering the very best in cars and spare parts, we extend our reach far beyond our local roots.

            Our international business division is dedicated to bringing the elegance of Mercedes-Benz to discerning customers worldwide. Through meticulous export processes and a global network of partners, we ensure that the spirit of Mercedes-Benz finds its way to you, wherever you may be.

            Whether you seek the allure of a Mercedes-Benz vehicle or require genuine spare parts for your prized possession, Kojak Group is your trusted partner in the global pursuit of luxury and automotive sophistication.

            Join us in the pursuit of international excellence. Experience Mercedes-Benz the Kojak way, no matter where your journey takes you`}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
export default InternationalBusiness;
