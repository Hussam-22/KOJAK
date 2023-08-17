import { useState, useEffect } from 'react';

import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
import FeaturedProperty from 'src/sections/_kojakBuilding/landing/FeaturedProperty';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import PopularProperties from 'src/sections/_kojakBuilding/landing/PopularProperties';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      <PopularProperties />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
