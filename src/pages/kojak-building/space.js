import { Helmet } from 'react-helmet-async';

import KojakBuildingSpaceView from 'src/sections/_kojakBuilding/views/kojak-building-space-view';

// ----------------------------------------------------------------------

export default function KojakBuildingSpacePage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
      </Helmet>

      <KojakBuildingSpaceView />
    </>
  );
}
