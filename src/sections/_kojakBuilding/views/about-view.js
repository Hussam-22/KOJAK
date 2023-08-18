import { _testimonials } from 'src/_mock';
import AboutUs from 'src/sections/_kojakBuilding/about/about-us';
import CoreValues from 'src/sections/_kojakBuilding/about/core-values';
import JoinNewsletter from 'src/sections/_kojakBuilding/about/join-newsletter';
import AboutTestimonial from 'src/sections/_kojakBuilding/testimonial/about-testimonial';

export default function AboutView() {
  return (
    <>
      <AboutUs />
      <CoreValues />
      <AboutTestimonial testimonials={_testimonials} />
    </>
  );
}
