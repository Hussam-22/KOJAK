import { Helmet } from 'react-helmet-async';

import AboutView from 'src/sections/_kojakBuilding/views/about-view';

export default function KojakBuildingAboutPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building</title>
      </Helmet>

      <AboutView />
    </>
  );
}
