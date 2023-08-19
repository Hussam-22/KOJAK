import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAuthContext } from 'src/auth/hooks';
import AboutView from 'src/sections/_kojakBuilding/views/about-view';

const PAGE_NAME = 'ABOUT';

export default function KojakBuildingAboutPage() {
  const { updatePageAnalytic } = useAuthContext();

  useEffect(() => {
    (async () => updatePageAnalytic(PAGE_NAME))();
  }, [updatePageAnalytic]);

  return (
    <>
      <Helmet>
        <title>Kojak Building | About</title>
        <meta
          name="description"
          content="At Kojak we are more than just a property rental company – we are your partners in finding the perfect space that aligns with your lifestyle and business needs. Whether you are searching for your dream home or a strategic location for your business, Kojak offers a diverse portfolio of residential and commercial spaces tailored to cater to your unique requirements."
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      <AboutView />
    </>
  );
}
