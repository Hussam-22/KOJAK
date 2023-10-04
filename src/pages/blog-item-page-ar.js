import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPageAr() {
  const { onChangeLang, currentLang } = useLocales();
  const { postTitle } = useParams();

  useEffect(() => {
    onChangeLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>كوجك إكسكلوسيف كارس - استكشاف عالم مرسيدس-بنز: مدونتنا</title>
        <meta
          name="description"
          content="مدونتنا ليست مجرد مجموعة من المقالات؛ إنها مصدر مصمم لتمكينك كمالك للمركبة. سواء كنت عاشقًا للسيارات أم تعتمد ببساطة على سيارتك في حياتك اليومية، فإن مدونتنا مصممة لتزويدك بمعلومات قيمة لتعزيز تجربتك في القيادة."
        />
        <meta
          name="keywords"
          content="كوجك إكسكلوسيف كارس, مرسيدس الفاخرة, مرسيدس بنز, الشارقة, دبي, الإمارات, سيارات فاخرة, وكالة سيارات فاخرة"
        />
        <meta
          property="og:title"
          content="كوجك إكسكلوسيف كارس - استكشاف عالم مرسيدس-بنز: مدونتنا"
        />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta
          property="og:url"
          content={`https://www.kojak-exclusive.com/ar/blog-posts/${postTitle}`}
        />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "كوجك إكسكلوسيف كارس",
        "url": "https://www.kojak-exclusive.com/ar/blog-posts/${postTitle}",
        "description": "مدونتنا ليست مجرد مجموعة من المقالات؛ إنها مصدر مصمم لتمكينك كمالك للمركبة. سواء كنت عاشقًا للسيارات أم تعتمد ببساطة على سيارتك في حياتك اليومية، فإن مدونتنا مصممة لتزويدك بمعلومات قيمة لتعزيز تجربتك في القيادة.",
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
          href={`https://www.kojak-exclusive.com/blog-posts/${postTitle}`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`https://www.kojak-exclusive.com/blog-posts/${postTitle}`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://www.kojak-exclusive.com/ar/blog-posts/${postTitle}`}
          hrefLang="ar"
        />
      </Helmet>

      {currentLang.value === 'ar' && <BlogItemView />}
    </>
  );
}
