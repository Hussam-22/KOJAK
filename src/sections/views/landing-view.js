import FixOffer from 'src/sections/landing/fix-offer';
import LandingHero from 'src/sections/landing/LandingHero';
import FeaturedParts from 'src/sections/landing/featured-parts';
import LandingTestimonial from 'src/sections/landing/LandingTestimonial';
import InternationalBusiness from 'src/sections/landing/international-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FixOffer />
      <InternationalBusiness />
      <LandingTestimonial />
      {/* <FeaturedParts /> */}
    </>
  );
}
