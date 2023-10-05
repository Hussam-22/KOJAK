import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import ServicesView from 'src/sections/views/services-view';

export default function ServicesPage() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive Cars - Find Your Dream Car, make it yours !!</title>
        <meta
          name="description"
          content="We take pride in offering a wide range of products that cater to various preferences and requirements. Whether you're a casual shopper or a dedicated collector, there's something here for everyone."
        />
        <meta
          name="keywords"
          content="Kojak Exclusive Cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, luxury cars, luxury car dealership"
        />
        <meta
          property="og:title"
          content="Kojak Exclusive Cars - Find Your Dream Car, make it yours !!"
        />
        <meta
          property="og:description"
          content="We take pride in offering a wide range of products that cater to various preferences and requirements. Whether you're a casual shopper or a dedicated collector, there's something here for everyone."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/inventory" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive Cars",
        "url": "https://www.kojak-exclusive.com/inventory",
        "description": "We take pride in offering a wide range of products that cater to various preferences and requirements. Whether you're a casual shopper or a dedicated collector, there's something here for everyone.",
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
        "openingHours": "9:30 AM - 1:00 PM | 4:30 PM - 9:00 PM (Saturday to Thursday)",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.169091844674753,
          "longitude": 55.36876576140712
        }
      }
    `}
        </script>

        <link
          rel="alternate"
          href="https://www.kojak-exclusive.com/inventory"
          hrefLang="x-default"
        />
        <link rel="alternate" href="https://www.kojak-exclusive.com/inventory" hrefLang="en" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/ar/inventory" hrefLang="ar" />
      </Helmet>
      {currentLang.value === 'en' && <ServicesView />}
    </>
  );
}
