import { Helmet } from 'react-helmet-async';

import KojakBuildingAboutView from 'src/sections/_kojakBuilding/views/kojak-building-about-view';

export default function KojakBuildingAboutPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
      </Helmet>

      <KojakBuildingAboutView />
    </>
  );
}
