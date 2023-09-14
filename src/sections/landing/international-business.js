import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

const PRACTICE = [
  { title: 'Spare-Parts', icon: 'spare-parts-icon' },
  { title: 'Repair Shop', icon: 'auto-icon' },
  { title: 'Dealership', icon: 'exclusive-icon' },
  { title: 'Property', icon: 'building-icon' },
];

function InternationalBusiness() {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', py: 8 }}>
      <Container
        maxWidth="xl"
        sx={{
          p: 8,
          mr: '35%',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1,
          borderBottom: `solid 4px`,
          bgcolor: 'background.light',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: -120,
            display: 'grid',
            gridTemplateColumns: 'repeat(1,1fr)',
            gap: 1,
          }}
        >
          {PRACTICE.map((item) => (
            <Box
              key={item.title}
              sx={{
                px: 1,
                py: 3,
                // border: `solid 2px ${theme.palette.primary.light}`,
                borderRadius: 3,
                maxWidth: 150,
                maxHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.light',
              }}
            >
              <Image src={`/assets/illustrations/${item.icon}.svg`} width={48} height={48} />
              <Typography
                key={item.title}
                variant="h6"
                sx={{
                  p: 1,
                  color: 'common.black',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box>
          <Image src="/assets/illustrations/illustration_map.svg" />
        </Box>
        <Stack spacing={3} sx={{ px: 3, width: { md: '85%' } }}>
          <Box>
            <Typography variant="overline" color="primary">
              International Business
            </Typography>
            <Typography variant="h1" sx={{ color: 'common.black' }}>
              Global Reach, Local Excellence
            </Typography>
          </Box>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
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
