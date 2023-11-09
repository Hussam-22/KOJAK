import { Helmet } from 'react-helmet-async';

import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Spare Parts - Genuine Mercedes Spare Parts</title>
        <meta
          name="description"
          content="Discover a wide selection of Genuine Mercedes spare parts at Kojak Spare Parts. Contact us for pricing and availability."
        />
        <meta
          name="keywords"
          content="Mercedes spare parts, Genuine Mercedes parts, Kojak Spare Parts"
        />
        <meta property="og:title" content="Kojak Spare Parts - Genuine Mercedes Spare Parts" />
        <meta
          property="og:description"
          content="Discover a wide selection of Genuine Mercedes spare parts at Kojak Spare Parts. Contact us for pricing and availability."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Genuine Mercedes Spare Parts",
        "description": "Explore a wide range of Genuine Mercedes spare parts at Kojak Spare Parts. Contact us for pricing and availability.",
        "brand": {
          "@type": "Brand",
          "name": "Mercedes"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "url": "https://www.kojak-spareparts.com/spare-parts",
        }
      }
    //]]>`}
        </script>
      </Helmet>

      <LandingView />
    </>
  );
}
