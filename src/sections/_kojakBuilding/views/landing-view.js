import { useState, useEffect } from 'react';

import { useAuthContext } from 'src/auth/hooks';
import { blogPosts, _testimonials } from 'src/_mock';
import FAQs from 'src/sections/_kojakBuilding/landing/Faqs';
import LatestPosts from 'src/sections/blog/kojak/latest-posts';
import LandingHero from 'src/sections/_kojakBuilding/landing/LandingHero';
import WhyKojakBuilding from 'src/sections/_kojakBuilding/landing/WhyKojakBuilding';
import PopularProperties from 'src/sections/_kojakBuilding/landing/PopularProperties';
import AboutTestimonial from 'src/sections/_kojakBuilding/testimonial/about-testimonial';

export default function LandingView() {
  const { fsGetFeaturedProperty } = useAuthContext();
  const [featuredProperty, setFeaturedProperty] = useState([]);

  useEffect(() => {
    (async () => {
      setFeaturedProperty(await fsGetFeaturedProperty());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LandingHero />
      <WhyKojakBuilding />
      {featuredProperty?.length !== 0 && featuredProperty !== undefined && (
        <PopularProperties spaceInfo={featuredProperty} />
      )}
      <AboutTestimonial testimonials={_testimonials} />
      <FAQs />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
