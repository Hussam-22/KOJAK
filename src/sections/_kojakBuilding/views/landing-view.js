import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import ContactUs from 'src/sections/_kojakBuilding/landing/ContactUs';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
import WhatWeOffer from 'src/sections/_kojakBuilding/landing/WhatWeOffer';
import LandingHeroNew from 'src/sections/_kojakBuilding/landing/LandingHeroNew';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      <WhatWeOffer />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
      {/* <ContactUs /> */}
    </>
  );
}
