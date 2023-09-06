import SpareParts from 'src/sections/landing/spare-parts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import FeaturedCars from 'src/sections/landing/featured-cars';
import AutoMaintenance from 'src/sections/landing/auto-maintenance';
import InternationalBusiness from 'src/sections/landing/internatioanl-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FeaturedCars />
      <InternationalBusiness />
      <LandingAbout />
      {/* <CustomOrder /> */}
      <SpareParts />
      <AutoMaintenance />
    </>
  );
}
