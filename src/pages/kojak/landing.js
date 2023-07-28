import { Helmet } from 'react-helmet-async';

import LandingView from 'src/sections/_kojakBuilding/views/landing-view';

// ----------------------------------------------------------------------

export default function KojakBuildingLandingPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
      </Helmet>

      <LandingView />
    </>
  );
}
