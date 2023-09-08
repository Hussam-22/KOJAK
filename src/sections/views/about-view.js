import { Box } from '@mui/material';

import Vision from 'src/sections/about/vision';
import AboutUs from 'src/sections/about/about-us';
import CoreValues from 'src/sections/about/core-values';
// import CoreValues from 'src/sections/about/core-values';

export default function AboutView() {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <AboutUs />
      <CoreValues />
      <Vision />
    </Box>
  );
}
