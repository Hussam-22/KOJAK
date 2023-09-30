import { Helmet } from 'react-helmet-async';

import ContactUsView from 'src/sections/views/contact-us-view';

export default function ContactUs() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Kojak Group - Mercedes Specialists in Sharjah, UAE</title>
        <meta
          name="description"
          content="Contact Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Reach out to us for quality service and support."
        />
        <meta
          name="keywords"
          content="Contact Us, Kojak Group, Mercedes Specialists, Mercedes-Benz Mastery, Auto Maintenance, Dealership, Sharjah, UAE, Contact Information, Customer Support"
        />
        {/* Add other meta tags here if needed */}

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Contact Kojak Group - Mercedes Specialists in Sharjah, UAE"
        />
        <meta
          property="og:description"
          content="Contact Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Reach out to us for quality service and support."
        />
        <meta property="og:image" content="https://www.kojakgroup.com/assets/kojak-logo.svg" />
        <meta property="og:url" content="https://www.kojakgroup.com/contact-us" />
        <meta property="og:type" content="website" />
        {/* Add other Open Graph meta tags here if needed */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "ContactPage",
              "name": "Contact Kojak Group",
              "url": "https://www.kojakgroup.com/contact-us",
              "description": "Contact Kojak Group - Your trusted source for genuine Mercedes spare parts, expert auto maintenance, and authorized Mercedes dealership services in Sharjah, UAE. Reach out to us for quality service and support.",
              "publisher": {
                "@type": "Organization",
                "name": "Kojak Group",
                "url": "https://www.kojakgroup.com",
                "logo": "https://www.kojakgroup.com/assets/kojak-logo.svg"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-06-5334312",
                "contactType": "Customer Service"
              }
            }
          `}
        </script>
      </Helmet>

      <ContactUsView />
    </>
  );
}
