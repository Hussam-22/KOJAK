import { blogPosts } from 'src/_mock';
import LatestPosts from 'src/sections/blog/latest-posts';
import FeaturedParts from 'src/sections/landing/featured-parts';
import FixOffer from 'src/sections/landing/fix-offer';
import InternationalBusiness from 'src/sections/landing/international-business';
import LandingFaqs from 'src/sections/landing/LandingFaqs';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingTestimonial from 'src/sections/landing/LandingTestimonial';
import PartsCount from 'src/sections/landing/parts-count';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';

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
