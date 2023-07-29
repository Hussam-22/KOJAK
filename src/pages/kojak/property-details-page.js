import { Helmet } from 'react-helmet-async';

import PropertyDetailsView from 'src/sections/_kojakBuilding/views/property-details-view';

// ----------------------------------------------------------------------

export default function PropertyDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Properties</title>
      </Helmet>

      <PropertyDetailsView />
    </>
  );
}
