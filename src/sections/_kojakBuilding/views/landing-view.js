import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
import WhatWeOffer from 'src/sections/_kojakBuilding/landing/WhatWeOffer';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      <WhatWeOffer />
      <FeaturedProperty />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
