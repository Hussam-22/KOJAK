import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';

// ----------------------------------------------------------------------
export default function PopularProperties() {
  return (
    <Box sx={{ backgroundImage: 'url(/assets/background/hot-bg.jpg)' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10 },
        }}
        maxWidth="md"
      >
        <FeaturedProperty />
      </Container>
    </Box>
  );
}
