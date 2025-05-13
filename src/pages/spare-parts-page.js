import { Helmet } from 'react-helmet-async';

import SparePartsView from 'src/sections/views/spare-parts-view';

// ----------------------------------------------------------------------

export default function SparePartsPage() {
  return (
    <>
      <Helmet>
        <title>Mercedes Spare Parts - Genuine Parts - Kojak Spare Parts</title>
        <meta
          name="description"
          content="Explore our extensive selection of Genuine Mercedes Spare Parts. Use our search tool to find the Mercedes spare parts you need."
        />
        <meta
          name="keywords"
          content="Mercedes spare parts, Genuine Mercedes parts, Auto parts, Spare parts search, Kojak Spare Parts"
        />
        <meta
          property="og:title"
          content="Mercedes Spare Parts - Genuine Parts - Kojak Spare Parts"
        />
        <meta
          property="og:description"
          content="Explore our extensive selection of Genuine Mercedes Spare Parts. Use our search tool to find the Mercedes spare parts you need."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/spare-parts" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
      </Helmet>

      <SparePartsView />
    </>
  );
}
