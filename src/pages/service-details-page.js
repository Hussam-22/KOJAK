import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import { PAGE_VISIT } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';
import ServiceDetailsView from 'src/sections/views/service-details-view';

export default function ServiceDetailsPage() {
  const { vehicleID } = useParams();
  const { onChangeLang, currentLang, translate } = useLocales();
  const { getVehicleInfo, fsUpdateStatistics } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();

  useEffect(() => {
    onChangeLang('en');
    (async () => {
      setVehicleInfo(await getVehicleInfo(vehicleID));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (vehicleInfo?.id) {
        await fsUpdateStatistics(vehicleInfo?.id, PAGE_VISIT);
      }
    })();
  }, [fsUpdateStatistics, vehicleInfo?.id]);

  return (
    <>
      <Helmet>
        {vehicleInfo?.brand && (
          <title>
            {`Kojak Exclusive Cars - ${translate(`common.${vehicleInfo?.brand.toLowerCase()}`)} ${
              vehicleInfo?.model
            } for sale`}
          </title>
        )}
        {vehicleInfo?.brand && (
          <meta
            name="description"
            content={`Kojak Exclusive Cars - ${translate(
              `common.${vehicleInfo?.brand.toLowerCase()}`
            )} ${vehicleInfo?.model} ${vehicleInfo?.year} for sale`}
          />
        )}
        <meta
          name="keywords"
          content="Kojak Exclusive Cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, luxury cars, luxury car dealership, sale, brand new, used car"
        />
        <meta
          property="og:title"
          content="Kojak Exclusive Cars - Find Your Dream Car, make it yours !!"
        />
        {vehicleInfo?.brand && (
          <meta
            property="og:description"
            content={`Kojak Exclusive Cars - ${translate(
              `common.${vehicleInfo?.brand.toLowerCase()}`
            )} ${vehicleInfo?.model} ${vehicleInfo?.year} for sale`}
          />
        )}
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta
          property="og:url"
          content={`https://www.kojak-exclusive.com/inventory/${vehicleID}`}
        />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive Cars",
        "url": "https://www.kojak-exclusive.com/inventory/${vehicleID}",
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
      {currentLang.value === 'en' && <ServiceDetailsView vehicleInfo={vehicleInfo} />}
    </>
  );
}
