import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function InternationalBusiness() {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', py: 8 }}>
      <Container
        maxWidth="xl"
        sx={{
          p: 8,
          bgcolor: 'background.light',
          borderRadius: 1,
          width: '75%',
          mr: '35%',
          borderBottom: `solid 4px`,
          borderImage: `linear-gradient(to left, ${theme.palette.secondary.main} 10%, transparent 50%) 100% 1`,
        }}
      >
        <Box sx={{ position: 'absolute', top: 50, right: 0, textAlign: 'right' }}>
          <Image src="/assets/illustrations/illustration_map.svg" />
        </Box>
        <Stack spacing={3} sx={{ color: 'common.white', px: 3, width: { md: '75%' } }}>
          <Typography variant="h1" sx={{ color: 'common.black' }}>
            Global Reach, Local Excellence
          </Typography>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              zIndex: 99,
              fontWeight: theme.typography.fontWeightLight,
              color: 'common.black',
            }}
            variant="h5"
          >
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
