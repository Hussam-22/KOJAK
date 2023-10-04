import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPageAr() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>كوجك إكسكلوسيف كارس - سيارات مرسيدس الفاخرة</title>
        <meta
          name="description"
          content="اكتشف أجمل تشكيلة من سيارات مرسيدس الفاخرة للبيع في الشارقة ودبي، الإمارات العربية المتحدة. تقدم كوجك إكسكلوسيف كارس مجموعة واسعة من سيارات مرسيدس بنز المحلية والعالمية لتلبية رغباتك السيارية."
        />
        <meta
          name="keywords"
          content="سيارات مرسيدس, مرسيدس الفاخرة, مرسيدس بنز, الشارقة, دبي, الإمارات, سيارات فاخرة, وكالة سيارات فاخرة"
        />
        <meta property="og:title" content="كوجك إكسكلوسيف كارس - سيارات مرسيدس الفاخرة" />
        <meta
          property="og:description"
          content="اكتشف أجمل تشكيلة من سيارات مرسيدس الفاخرة للبيع في الشارقة ودبي، الإمارات العربية المتحدة. تقدم كوجك إكسكلوسيف كارس مجموعة واسعة من سيارات مرسيدس بنز المحلية والعالمية لتلبية رغباتك السيارية."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/ar/" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "كوجك إكسكلوسيف كارس",
        "url": "https://www.kojak-exclusive.com/ar/",
        "description": "كوجك إكسكلوسيف كارس هي وجهتك الأولى لسيارات مرسيدس الفاخرة في الشارقة ودبي، الإمارات العربية المتحدة. اكتشف تشكيلتنا من سيارات مرسيدس بنز العالمية والمحلية اليوم.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "معرض رقم 37 - قطعة رقم 4 العوير - سوق رأس الخور للسيارات دبي",
          "addressLocality": "دبي",
          "addressRegion": "دبي",
          "addressCountry": "AE"
        },
        "logo": "https://www.kojak-exclusive.com/assets/kojak-logo.svg",
        "telephone": "+971-52-9242616",
        "sameAs": [
          "https://www.facebook.com/KojakGroupofCompanies",
          "https://www.instagram.com/kexclusive_cars"
        ],
        "openingHours": "9:30 صباحًا - 1:00 ظهرًا | 4:30 مساءً - 9:00 مساءً (السبت إلى الخميس)",
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

      {currentLang.value === 'ar' && <LandingView />}
    </>
  );
}
