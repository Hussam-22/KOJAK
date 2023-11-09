import { Helmet } from 'react-helmet-async';

import AboutView from 'src/sections/views/about-view';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Kojak Spare Parts</title>
        <meta
          name="description"
          content="Learn more about Kojak Spare Parts, your trusted source for Genuine Mercedes Spare Parts. Discover our history, values, and commitment to quality."
        />
        <meta
          name="keywords"
          content="About us, Kojak Spare Parts, Genuine Mercedes parts, Auto parts, Mercedes spare parts"
        />
        <meta property="og:title" content="About Us - Kojak Spare Parts" />
        <meta
          property="og:description"
          content="Learn more about Kojak Spare Parts, your trusted source for Genuine Mercedes Spare Parts. Discover our history, values, and commitment to quality."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/about" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "About Us - Kojak Spare Parts",
        "description": "Learn more about Kojak Spare Parts, your trusted source for Genuine Mercedes Spare Parts. Discover our history, values, and commitment to quality.",
        "url": "https://www.kojak-spareparts.com/about",
        "image": "https://www.kojak-spareparts.com/assets/kojak-logo.svg"
      }
    //]]>`}
        </script>
      </Helmet>

      <AboutView />
    </>
  );
}
