import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import ServiceDetailsView from 'src/sections/views/service-details-view';

export default function ServiceDetailsPageAr() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive | Inventory</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="KOJAK GROUP - Exclusive" />
      </Helmet>
      {currentLang.value === 'ar' && <ServiceDetailsView />}
    </>
  );
}
