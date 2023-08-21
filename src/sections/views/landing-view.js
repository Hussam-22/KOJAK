import FAQs from 'src/sections/landing/Faqs';
import { blogPosts, _testimonials } from 'src/_mock';
import LandingHero from 'src/sections/landing/LandingHero';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import WhyKojakBuilding from 'src/sections/landing/WhyKojakBuilding';
import PopularProperties from 'src/sections/landing/PopularProperties';
import AboutTestimonial from 'src/sections/testimonial/about-testimonial';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      <AboutTestimonial testimonials={_testimonials} />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
      <JoinNewsletter />
    </>
  );
}
