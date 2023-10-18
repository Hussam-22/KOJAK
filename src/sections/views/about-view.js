import { Box } from '@mui/material';

import Vision from 'src/sections/about/vision';
import AboutUs from 'src/sections/about/about-us';
import OurStory from 'src/sections/about/our-story';
import WhyChoseUs from 'src/sections/about/why-chose-us';

export default function AboutView() {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <AboutUs />
      <OurStory />
      <WhyChoseUs />
      <Vision />
    </Box>
  );
}
