import { Helmet } from 'react-helmet-async';

import ContactUsView from 'src/sections/_kojakBuilding/views/contact-us-view';

export default function KojakBuildingAboutPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building | Contact Us</title>
      </Helmet>

      <ContactUsView />
    </>
  );
}
