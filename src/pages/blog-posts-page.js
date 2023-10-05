import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import BlogPostsView from 'src/sections/views/blog-posts-view';

export default function BlogPage() {
  const { onChangeLang, currentLang } = useLocales();

  useEffect(() => {
    onChangeLang('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Kojak Exclusive Cars - Explore the World of Mercedes-Benz: Our Blog</title>
        <meta
          name="description"
          content="Our blog is more than just a collection of articles; it's a resource designed to empower you as a vehicle owner. Whether you're a car enthusiast or simply rely on your vehicle for everyday life, our blog is tailored to provide you with valuable information to enhance your driving experience."
        />
        <meta
          name="keywords"
          content="Kojak Exclusive Cars, luxury Mercedes, Mercedes-Benz, Sharjah, Dubai, UAE, luxury cars, luxury car dealership"
        />
        <meta
          property="og:title"
          content="Kojak Exclusive Cars - Explore the World of Mercedes-Benz: Our Blog"
        />
        <meta
          property="og:description"
          content="Our blog is more than just a collection of articles; it's a resource designed to empower you as a vehicle owner. Whether you're a car enthusiast or simply rely on your vehicle for everyday life, our blog is tailored to provide you with valuable information to enhance your driving experience.."
        />
        <meta property="og:image" content="https://www.kojak-exclusive.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojak-exclusive.com/blog-posts" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "AutoDealer",
        "name": "Kojak Exclusive Cars",
        "url": "https://www.kojak-exclusive.com/blog-posts",
        "description": "Our blog is more than just a collection of articles; it's a resource designed to empower you as a vehicle owner. Whether you're a car enthusiast or simply rely on your vehicle for everyday life, our blog is tailored to provide you with valuable information to enhance your driving experience..",
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
          href="https://www.kojak-exclusive.com/blog-posts"
          hrefLang="x-default"
        />
        <link rel="alternate" href="https://www.kojak-exclusive.com/blog-posts" hrefLang="en" />
        <link rel="alternate" href="https://www.kojak-exclusive.com/ar/blog-posts" hrefLang="ar" />
      </Helmet>

      {currentLang.value === 'en' && <BlogPostsView />}
    </>
  );
}
