import { Box } from '@mui/material';

import GroupAd from 'src/sections/landing/GroupAd';
import LandingHero from 'src/sections/landing/LandingHero';
import FeaturedCars from 'src/sections/landing/featured-cars';

export default function LandingView() {
  return (
    <Box>
      <LandingHero />
      <FeaturedCars />
      <GroupAd />
    </Box>
  );
}
