import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';

// ----------------------------------------------------------------------
export default function PopularProperties() {
  return (
    <Box sx={{ bgcolor: 'background.dark' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10 },
        }}
        // maxWidth="xl"
      >
        <FeaturedProperty />
      </Container>
    </Box>
  );
}
