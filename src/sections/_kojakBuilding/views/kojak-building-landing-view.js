import { _posts } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import ContactUs from 'src/sections/_kojakBuilding/landing/ContactUs';
import WhatWeOffer from 'src/sections/_kojakBuilding/landing/WhatWeOffer';
import BuildingLatestPosts from 'src/sections/blog/kojak/building-latest-posts';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import KojakBuildingLandingHero from 'src/sections/_kojakBuilding/landing/kojakBuildingLandingHero';

export default function KojakBuildingLandingView() {
  return (
    <>
      <KojakBuildingLandingHero />
      <WhyKojakBuilding />
      <WhatWeOffer />
      <FAQs />
      <BuildingLatestPosts posts={_posts.slice(0, 6)} />
      <ContactUs />
    </>
  );
}
