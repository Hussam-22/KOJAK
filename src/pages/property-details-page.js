import { Helmet } from 'react-helmet-async';

import PropertyDetailsView from 'src/sections/views/property-details-view';

// ----------------------------------------------------------------------

export default function PropertyDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building | Property Details</title>
      </Helmet>

      <PropertyDetailsView />
    </>
  );
}
