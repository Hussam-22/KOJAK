import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive - Luxury Mercedes Cars</title>
        <meta
          name="description"
          content="Discover the finest selection of luxury Mercedes cars for sale in Sharjah and Dubai, United Arab Emirates. Kojak Exclusive offers a wide range of local and international Mercedes-Benz vehicles to meet your automotive desires."
        />
        <meta
          name="keywords"
          content="Mercedes cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, automotive, luxury car dealership"
        />
        <meta property="og:title" content="Kojak Exclusive - Luxury Mercedes Cars" />
        <meta
          property="og:description"
          content="Discover the finest selection of luxury Mercedes cars for sale in Sharjah and Dubai, United Arab Emirates. Kojak Exclusive offers a wide range of local and international Mercedes-Benz vehicles to meet your automotive desires."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive",
        "url": "https://www.kojak-exclusive.com/",
        "description": "Kojak Exclusive is your premier destination for luxury Mercedes cars in Sharjah and Dubai, United Arab Emirates. Explore our selection of Mercedes-Benz vehicles today.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Showroom no.37 - block no.4 Al Aweer - Ras Al Khor Auto Market Dubai",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        },
        "logo": "https://www.kojak-exclusive.com/assets/kojak-logo.svg",
        "telephone": "+971-52-9242616",
        "sameAs": [
          "https://www.facebook.com/KojakGroupofCompanies",
          "https://www.instagram.com/kexclusive_cars"
        ],
        "openingHours": "9:30 AM to 1 PM - 4:30 PM to 9:00 PM (Saturday to Thursday)",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.169091844674753,
          "longitude": 55.36876576140712
        }
      }
    `}
        </script>

        {/* Hreflang tags for language and regional targeting */}
        <link rel="alternate" href="https://www.kojak-exclusive.com/" hrefLang="x-default" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/" hrefLang="en" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/ar/" hrefLang="ar" />
      </Helmet>

      {currentLang.value === 'en' && <LandingView />}
    </>
  );
}
