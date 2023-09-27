import FixOffer from 'src/sections/landing/fix-offer';
import LandingHero from 'src/sections/landing/LandingHero';
import FeaturedParts from 'src/sections/landing/featured-parts';
import SparePartsView from 'src/sections/views/spare-parts-view';
import InternationalBusiness from 'src/sections/landing/international-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FeaturedParts />
      <FixOffer />
    </>
  );
}
