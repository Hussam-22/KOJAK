import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPageAr() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive | Blog Post</title>
      </Helmet>

      {currentLang.value === 'ar' && <BlogItemView />}
    </>
  );
}
