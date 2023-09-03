import { Box } from '@mui/material';

import SpareParts from 'src/sections/landing/spare-parts';
import LandingHero from 'src/sections/landing/LandingHero';
import CustomOrder from 'src/sections/landing/custom-order';
import LandingAbout from 'src/sections/landing/LandingAbout';
import FeaturedCars from 'src/sections/landing/featured-cars';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import AutoMaintenance from 'src/sections/landing/auto-maintenance';
import InternationalBusiness from 'src/sections/landing/internatioanl-business';

export default function LandingView() {
  return (
    <Box>
      <LandingHero />
      <FeaturedCars />
      <InternationalBusiness />
      <LandingAbout />
      <CustomOrder />
      <AutoMaintenance />
      <SpareParts />
      <JoinNewsletter />
    </Box>
  );
}
