import { Helmet } from 'react-helmet-async';

import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Kojak Group Blog - Mercedes Insights</title>
        <meta
          name="description"
          content="Explore our blog for insightful articles about Mercedes-Benz. Kojak Group - Your trusted source for Mercedes spare parts, auto maintenance, and dealership services in Sharjah, UAE."
        />
        <meta
          name="keywords"
          content="Mercedes Blog, Mercedes-Benz Insights, Auto Maintenance Tips, Mercedes News, Mercedes Dealership, Sharjah, UAE"
        />
        {/* Add other meta tags here if needed */}

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Kojak Group Blog - Mercedes Insights" />
        <meta
          property="og:description"
          content="Explore our blog for insightful articles about Mercedes-Benz. Kojak Group - Your trusted source for Mercedes spare parts, auto maintenance, and dealership services in Sharjah, UAE."
        />
        <meta property="og:image" content="https://www.kojakgroup.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojakgroup.com/blog-posts" />
        <meta property="og:type" content="website" />
        {/* Add other Open Graph meta tags here if needed */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Blog",
              "name": "Kojak Group Blog",
              "url": "https://www.kojakgroup.com/blog-posts",
              "description": "Explore our blog for insightful articles about Mercedes-Benz. Kojak Group - Your trusted source for Mercedes spare parts, auto maintenance, and dealership services in Sharjah, UAE.",
              "publisher": {
                "@type": "Organization",
                "name": "Kojak Group",
                "url": "https://www.kojakgroup.com",
                "logo": "https://www.kojakgroup.com/assets/kojak-logo.svg"
              }
            }
          `}
        </script>
      </Helmet>

      <BlogItemView />
    </>
  );
}
