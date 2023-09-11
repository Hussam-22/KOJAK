import OurServices from 'src/sections/services/our-services';
import ServicesAbout from 'src/sections/services/about-video';
import JoinNewsletter from 'src/sections/about/join-newsletter';

export default function ServicesView() {
  return (
    <>
      <ServicesAbout />
      <OurServices />
      <JoinNewsletter />
    </>
  );
}
