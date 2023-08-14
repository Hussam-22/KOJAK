import { Helmet } from 'react-helmet-async';

import AboutView from 'src/sections/_kojakBuilding/views/about-view';

export default function KojakBuildingAboutPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building | About</title>
      </Helmet>

      <AboutView />
    </>
  );
}
