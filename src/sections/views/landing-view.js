import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/landing/Faqs';
import LatestPosts from 'src/sections/blog/latest-posts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import SpotlightVehicles from 'src/sections/landing/spotlight-vehicles';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import LandingTestimonial from 'src/sections/testimonial/about-testimonial';
import InternationalBusiness from 'src/sections/landing/internatioanl-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <SpotlightVehicles />
      <InternationalBusiness />
      <LandingAbout />
      <LandingTestimonial />
      <FAQs />
      <VisitGroupsWebsite />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
