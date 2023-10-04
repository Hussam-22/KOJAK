import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import AboutView from 'src/sections/views/about-view';

export default function AboutPage() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive Cars - Discover Kojak&#39;s Passion for Mercedes-Benz</title>
        <meta
          name="description"
          content="Welcome to Kojak Exclusive Cars, where our journey with Mercedes-Benz began 40 years ago with a shared passion for luxury, innovation, and excellence in the automotive industry. As Mercedes-Benz specialists, we take pride in our rich history and unwavering commitment to delivering the ultimate Mercedes-Benz experience to our customers."
        />
        <meta
          name="keywords"
          content="Kojak Exclusive Cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, luxury cars, luxury car dealership"
        />
        <meta
          property="og:title"
          content="Kojak Exclusive Cars - Discover Kojak's Passion for Mercedes-Benz"
        />
        <meta
          property="og:description"
          content="Welcome to Kojak Exclusive Cars, where our journey with Mercedes-Benz began 40 years ago with a shared passion for luxury, innovation, and excellence in the automotive industry. As Mercedes-Benz specialists, we take pride in our rich history and unwavering commitment to delivering the ultimate Mercedes-Benz experience to our customers."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/about" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive Cars",
        "url": "https://www.kojak-exclusive.com/about",
        "description": "Welcome to Kojak Exclusive Cars, where our journey with Mercedes-Benz began 40 years ago with a shared passion for luxury, innovation, and excellence in the automotive industry. As Mercedes-Benz specialists, we take pride in our rich history and unwavering commitment to delivering the ultimate Mercedes-Benz experience to our customers.",
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

        <link rel="alternate" href="https://www.kojak-exclusive.com/about" hrefLang="x-default" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/about" hrefLang="en" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/ar/about" hrefLang="ar" />
      </Helmet>

      {currentLang.value === 'en' && <AboutView />}
    </>
  );
}
