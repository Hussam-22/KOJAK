import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance</title>
        {/* <meta
          name="description"
          content="Find Your Perfect Space For Living Or Business Thriving With KOJAK"
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" /> */}
      </Helmet>

      <LandingView />
    </>
  );
}
