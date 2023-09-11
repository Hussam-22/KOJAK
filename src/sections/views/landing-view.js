import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/landing/Faqs';
import Offers from 'src/sections/landing/Offers';
import GroupAd from 'src/sections/landing/GroupAd';
import Services from 'src/sections/landing/Services';
import LatestPosts from 'src/sections/blog/latest-posts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import JoinNewsletter from 'src/sections/about/join-newsletter';
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
      <GroupAd />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
      <JoinNewsletter />
    </>
  );
}
