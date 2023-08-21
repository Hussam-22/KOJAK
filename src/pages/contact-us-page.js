import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAuthContext } from 'src/auth/hooks';
import ContactUsView from 'src/sections/views/contact-us-view';

const PAGE_NAME = 'CONTACT-US';

export default function KojakBuildingAboutPage() {
  const { updatePageAnalytic } = useAuthContext();

  useEffect(() => {
    (async () => updatePageAnalytic(PAGE_NAME))();
  }, [updatePageAnalytic]);

  return (
    <>
      <Helmet>
        <title>Kojak Building | Contact Us</title>
        <meta
          name="description"
          content="We're here to assist you. If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our dedicated team is ready to help you in any way we can."
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      <ContactUsView />
    </>
  );
}
