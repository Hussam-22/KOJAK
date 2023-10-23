import { Container } from '@mui/material';

import { blogPosts } from 'src/_mock';
import FixOffer from 'src/sections/landing/fix-offer';
import LatestPosts from 'src/sections/blog/latest-posts';
import PartsCount from 'src/sections/landing/parts-count';
import LandingFaqs from 'src/sections/landing/LandingFaqs';
import LandingHero from 'src/sections/landing/LandingHero';
import FeaturedParts from 'src/sections/landing/featured-parts';
import LandingTestimonial from 'src/sections/landing/LandingTestimonial';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import InternationalBusiness from 'src/sections/landing/international-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <FeaturedParts />
      <FixOffer />
      <PartsCount />
      <InternationalBusiness />
      <LandingTestimonial />
      <LandingFaqs />
      <VisitGroupsWebsite />
      <LatestPosts posts={blogPosts} />
    </>
  );
}
