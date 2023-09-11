import { Helmet } from 'react-helmet-async';

import PropertiesView from 'src/sections/_kojakBuilding/views/properties-view';

// ----------------------------------------------------------------------

export default function PropertiesPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building | Properties</title>
        <meta
          name="description"
          content="At Kojak Building , we take pride in offering an extensive selection of both commercial and residential spaces that cater to all your needs. Whether you're looking to upgrade your business headquarters or find a cozy abode to call home, we've got you covered."
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      <PropertiesView />
    </>
  );
}
