import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import ServicesView from 'src/sections/views/services-view';

export default function ServicesPageAr() {
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
      {currentLang.value === 'ar' && <ServicesView />}
    </>
  );
}
