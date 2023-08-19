import { blogPosts, _testimonials } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
import JoinNewsletter from 'src/sections/_kojakBuilding/about/join-newsletter';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import PopularProperties from 'src/sections/_kojakBuilding/landing/PopularProperties';
import AboutTestimonial from 'src/sections/_kojakBuilding/testimonial/about-testimonial';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      <PopularProperties />
      <AboutTestimonial testimonials={_testimonials} />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
      <JoinNewsletter />
    </>
  );
}
