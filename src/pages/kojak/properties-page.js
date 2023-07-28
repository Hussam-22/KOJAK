import { Helmet } from 'react-helmet-async';

import PropertiesView from 'src/sections/_kojakBuilding/views/properties-view';

// ----------------------------------------------------------------------

export default function PropertiesPage() {
  return (
    <>
      <Helmet>
        <title>Properties</title>
      </Helmet>

      <PropertiesView />
    </>
  );
}
