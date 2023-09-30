import { Helmet } from 'react-helmet-async';

import CareerListView from 'src/sections/views/career-list-view';

function CareerPage() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Careers at Kojak Group - Mercedes Specialists in Sharjah, UAE</title>
        <meta
          name="description"
          content="Explore career opportunities at Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Join our team and be a part of our legacy of Mercedes-Benz mastery since 1983."
        />
        <meta
          name="keywords"
          content="Careers, Job Opportunities, Kojak Group, Mercedes Specialists, Mercedes-Benz Mastery, Auto Maintenance, Dealership, Sharjah, UAE, Employment, Join Our Team"
        />
        {/* Add other meta tags here if needed */}

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Careers at Kojak Group - Mercedes Specialists in Sharjah, UAE"
        />
        <meta
          property="og:description"
          content="Explore career opportunities at Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Join our team and be a part of our legacy of Mercedes-Benz mastery since 1983."
        />
        <meta property="og:image" content="https://www.kojakgroup.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojakgroup.com/careers" />
        <meta property="og:type" content="website" />
        {/* Add other Open Graph meta tags here if needed */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "CareersPage",
              "name": "Careers at Kojak Group",
              "url": "https://www.kojakgroup.com/careers",
              "description": "Explore career opportunities at Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Join our team and be a part of our legacy of Mercedes-Benz mastery since 1983.",
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

      <CareerListView />
    </>
  );
}
export default CareerPage;
