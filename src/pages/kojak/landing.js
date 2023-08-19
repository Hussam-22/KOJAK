import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAuthContext } from 'src/auth/hooks';
import LandingView from 'src/sections/_kojakBuilding/views/landing-view';

// ----------------------------------------------------------------------

const PAGE_NAME = 'LANDING';

export default function KojakBuildingLandingPage() {
  const { updatePageAnalytic } = useAuthContext();

  useEffect(() => {
    (async () => updatePageAnalytic(PAGE_NAME))();
  }, [updatePageAnalytic]);

  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
        <meta
          name="description"
          content="Find Your Perfect Space For Living Or Business Thriving With KOJAK"
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      <LandingView />
    </>
  );
}
