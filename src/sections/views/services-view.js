import OurServices from 'src/sections/services/our-services';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import RegularMaintenance from 'src/sections/services/regular-maintenance';

export default function ServicesView() {
  return (
    <>
      <OurServices />
      <RegularMaintenance />
      <JoinNewsletter />
    </>
  );
}
