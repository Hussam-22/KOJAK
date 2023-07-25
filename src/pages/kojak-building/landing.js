import { Helmet } from 'react-helmet-async';

import KojakBuildingLandingView from 'src/sections/_kojakBuilding/views/kojak-building-landing-view';

// ----------------------------------------------------------------------

export default function KojakBuildingLandingPage() {
  console.log('TEST');
  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
      </Helmet>

      <KojakBuildingLandingView />
    </>
  );
}
