import FixOffer from 'src/sections/landing/fix-offer';
import LandingHero from 'src/sections/landing/LandingHero';
import FeaturedParts from 'src/sections/landing/featured-parts';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FeaturedParts />
      <FixOffer />
    </>
  );
}
