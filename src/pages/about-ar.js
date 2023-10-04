import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import AboutView from 'src/sections/views/about-view';

export default function AboutPageAr() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>كوجك إكسكلوسيف | من نحن</title>
        <meta
          name="description"
          content="At Kojak we are more than just a property rental company – we are your partners in finding the perfect space that aligns with your lifestyle and business needs. Whether you are searching for your dream home or a strategic location for your business, Kojak offers a diverse portfolio of residential and commercial spaces tailored to cater to your unique requirements."
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      {currentLang.value === 'ar' && <AboutView />}
    </>
  );
}
