import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import ContactUs from 'src/sections/_kojakBuilding/landing/ContactUs';
import WhatWeOffer from 'src/sections/_kojakBuilding/landing/WhatWeOffer';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
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
