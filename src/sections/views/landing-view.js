import FixOffer from 'src/sections/landing/fix-offer';
import PartsCount from 'src/sections/landing/parts-count';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingFaqs from 'src/sections/landing/LandingFaqs';
import FeaturedParts from 'src/sections/landing/featured-parts';
import LandingTestimonial from 'src/sections/landing/LandingTestimonial';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import InternationalBusiness from 'src/sections/landing/international-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FixOffer />
      <PartsCount />
      {/* <FeaturedParts /> */}
      <InternationalBusiness />
      <LandingTestimonial />
      <LandingFaqs />
      <VisitGroupsWebsite />
    </>
  );
}
