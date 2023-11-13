import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/landing/Faqs';
import Offers from 'src/sections/landing/Offers';
import Services from 'src/sections/landing/Services';
import LatestPosts from 'src/sections/blog/latest-posts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import LandingTestimonial from 'src/sections/testimonial/about-testimonial';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <Offers />
      <Services />
      <LandingAbout />
      <LandingTestimonial />
      <FAQs />
      <VisitGroupsWebsite />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
