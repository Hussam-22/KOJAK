import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';

// ----------------------------------------------------------------------
export default function PopularProperties({ spaceInfo }) {
  return (
    <Box sx={{ backgroundImage: 'url(/assets/background/hot-bg.webp)' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10 },
        }}
        maxWidth="md"
      >
        <FeaturedProperty spaceInfo={spaceInfo} />
      </Container>
    </Box>
  );
}

PopularProperties.propTypes = {
  spaceInfo: PropTypes.object,
};
