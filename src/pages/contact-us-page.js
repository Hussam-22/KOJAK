import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import ContactUsView from 'src/sections/views/contact-us-view';

export default function ContactUsPage() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive Cars - Contact Us</title>
        <meta
          name="description"
          content="We're here to assist you. If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our dedicated team is ready to help you in any way we can."
        />
        <meta
          name="keywords"
          content="Kojak Exclusive Cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, luxury cars, luxury car dealership"
        />
        <meta property="og:title" content="Kojak Exclusive Cars - Contact Us" />
        <meta
          property="og:description"
          content="We're here to assist you. If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our dedicated team is ready to help you in any way we can."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/contact-us" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive Cars",
        "url": "https://www.kojak-exclusive.com/contact-us",
        "description": "We're here to assist you. If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our dedicated team is ready to help you in any way we can.",
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
          href="https://www.kojak-exclusive.com/contact-us"
          hrefLang="x-default"
        />
        <link rel="alternate" href="https://www.kojak-exclusive.com/contact-us" hrefLang="en" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/ar/contact-us" hrefLang="ar" />
      </Helmet>

      {currentLang.value === 'en' && <ContactUsView />}
    </>
  );
}
