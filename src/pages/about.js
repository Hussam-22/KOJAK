import { Helmet } from 'react-helmet-async';

import AboutView from 'src/sections/views/about-view';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Kojak Group - Mercedes Specialists in Sharjah, UAE</title>
        <meta
          name="description"
          content="Learn about Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Discover our legacy of Mercedes-Benz mastery since 1983."
        />
        <meta
          name="keywords"
          content="About Us, Kojak Group, Mercedes Specialists, Mercedes-Benz Mastery, Auto Maintenance, Dealership, Sharjah, UAE"
        />
        {/* Add other meta tags here if needed */}

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="About Kojak Group - Mercedes Specialists in Sharjah, UAE"
        />
        <meta
          property="og:description"
          content="We are passionate about all things Mercedes-Benz. With a rich history spanning several years, we have become a trusted name in the automotive industry, offering a comprehensive range of services and products to meet the diverse needs of Mercedes-Benz enthusiasts around the world"
        />
        <meta property="og:image" content="https://www.kojakgroup.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojakgroup.com/about" />
        <meta property="og:type" content="website" />
        {/* Add other Open Graph meta tags here if needed */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "AboutPage",
              "name": "About Kojak Group",
              "url": "https://www.kojakgroup.com/about",
              "description": "We are passionate about all things Mercedes-Benz. With a rich history spanning several years, we have become a trusted name in the automotive industry, offering a comprehensive range of services and products to meet the diverse needs of Mercedes-Benz enthusiasts around the world",
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

      <AboutView />
    </>
  );
}
