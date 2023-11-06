import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import ServiceDetailsView from 'src/sections/views/service-details-view';

export default function ServiceDetailsPageAr() {
  const { vehicleID } = useParams();
  const { onChangeLang, currentLang, translate } = useLocales();
  const { getVehicleInfo } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();

  useEffect(() => {
    onChangeLang('ar');
    (async () => {
      setVehicleInfo(await getVehicleInfo(vehicleID));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        {vehicleInfo?.brand && (
          <title>{`كوجك إكسكلوسيف كارس - ${translate(
            `common.${vehicleInfo?.brand.toLowerCase()}`
          )} ${vehicleInfo?.model} للبيع`}</title>
        )}
        {vehicleInfo?.brand && (
          <meta
            name="description"
            content={`${translate(`common.${vehicleInfo?.brand.toLowerCase()}`)} ${
              vehicleInfo?.model
            } ${vehicleInfo?.year} للبيع`}
          />
        )}
        <meta
          name="keywords"
          content="كوجك إكسكلوسيف كارس, مرسيدس الفاخرة, مرسيدس بنز, الشارقة, دبي, الإمارات, سيارات فاخرة, وكالة سيارات فاخرة, للبيع, سيارة جديدة, مستعملة"
        />
        <meta
          property="og:title"
          content="كوجك إكسكلوسيف كارس - ابحث عن سيارت أحلامك اجعلها ملكك !!"
        />
        {vehicleInfo?.brand && (
          <meta
            property="og:description"
            content={`${translate(`common.${vehicleInfo?.brand.toLowerCase()}`)} ${
              vehicleInfo?.model
            } ${vehicleInfo?.year} للبيع`}
          />
        )}
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta
          property="og:url"
          content={`https://www.kojak-exclusive.com/ar/inventory/${vehicleID}`}
        />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "كوجك إكسكلوسيف كارس",
        "url": "https://www.kojak-exclusive.com/ar/inventory/${vehicleID}",
        "description": "نفخر بتقديم مجموعة واسعة من المنتجات التي تلبي مختلف التفضيلات والمتطلبات. سواء كنت متسوقًا عاديًا أو مجمعًا مخصصًا، هناك شيء للجميع هنا.",
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

        <link
          rel="alternate"
          href={`https://www.kojak-exclusive.com/inventory/${vehicleID}`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`https://www.kojak-exclusive.com/inventory/${vehicleID}`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://www.kojak-exclusive.com/ar/inventory/${vehicleID}`}
          hrefLang="ar"
        />
      </Helmet>

      {currentLang.value === 'ar' && <ServiceDetailsView vehicleInfo={vehicleInfo} />}
    </>
  );
}
