import { Helmet } from 'react-helmet-async';

import SparePartsView from 'src/sections/views/spare-parts-view';

// ----------------------------------------------------------------------

export default function SparePartsPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Spare Parts</title>
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

      <SparePartsView />
    </>
  );
}
