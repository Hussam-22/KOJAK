import { Helmet } from 'react-helmet-async';

import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <title>Kojak Group</title>
      <Helmet>
        <title>Kojak Group - Mercedes Specialists in Sharjah, UAE</title>
        <meta
          name="description"
          content="A Legacy of Mercedes-Benz Mastery Since 1983. Welcome to Kojak Group - Your one-stop destination for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Get quality service for your Mercedes today!"
        />
        <meta
          name="keywords"
          content="Mercedes Spare Parts, Auto Maintenance, Dealership, Sharjah, UAE, Genuine Mercedes Parts, Authorized Dealer, Mercedes Service Center, Expert Mechanics, Auto Maintenance, Auto Repair, K-Exclusive, Spare-Parts, SpareParts, Mercedes, Dubai"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Kojak Group - Mercedes Specialists in Sharjah, UAE" />
        <meta
          property="og:description"
          content="A Legacy of Mercedes-Benz Mastery Since 1983. Your trusted destination for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE."
        />
        <meta property="og:image" content="https://www.kojakgroup.com//assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojakgroup.com" />
        <meta property="og:type" content="website" />
        {/* Add other Open Graph meta tags here if needed */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: 'Kojak Group',
            url: 'https://www.kojakgroup.com',
            logo: 'https://www.kojakgroup.com/assets/kojak-logo.svg',
            description:
              'A Legacy of Mercedes-Benz Mastery Since 1983. Your trusted destination for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE.',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+971-06-5334312',
              contactType: 'Customer Service',
            },
            sameAs: [
              'https://www.facebook.com/KojakGroupofCompanies',
            ],
          `}
        </script>
      </Helmet>

      <LandingView />
    </>
  );
}
