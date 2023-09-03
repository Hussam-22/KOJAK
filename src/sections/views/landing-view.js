import { Box } from '@mui/material';

import GroupAd from 'src/sections/landing/GroupAd';
import LandingHero from 'src/sections/landing/LandingHero';
import CustomOrder from 'src/sections/landing/custom-order';
import LandingAbout from 'src/sections/landing/LandingAbout';
import FeaturedCars from 'src/sections/landing/featured-cars';

export default function LandingView() {
  return (
    <Box>
      <LandingHero />
      <FeaturedCars />
      <CustomOrder />
      <LandingAbout />
      <GroupAd />
    </Box>
  );
}
