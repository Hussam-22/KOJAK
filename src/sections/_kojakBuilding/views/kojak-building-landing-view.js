import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import ContactUs from 'src/sections/_kojakBuilding/landing/ContactUs';
import WhatWeOffer from 'src/sections/_kojakBuilding/landing/WhatWeOffer';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import KojakBuildingLandingHero from 'src/sections/_kojakBuilding/landing/KojakBuildingLandingHero';

export default function KojakBuildingLandingView() {
  return (
    <>
      <KojakBuildingLandingHero />
      <WhyKojakBuilding />
      <WhatWeOffer />
      <FAQs />
      <ContactUs />
    </>
  );
}
