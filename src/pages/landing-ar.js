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
        <title>Kojak Exclusive</title>
        {/* <meta
          name="description"
          content="Find Your Perfect Space For Living Or Business Thriving With KOJAK"
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" /> */}
      </Helmet>

      {currentLang.value === 'ar' && <LandingView />}
    </>
  );
}
