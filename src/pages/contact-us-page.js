import { Helmet } from 'react-helmet-async';

import ContactUsView from 'src/sections/views/contact-us-view';

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Kojak Spare Parts</title>
        <meta
          name="description"
          content="Get in touch with Kojak Spare Parts for inquiries, orders, or any assistance regarding Genuine Mercedes Spare Parts. We're here to help you."
        />
        <meta
          name="keywords"
          content="Contact us, Kojak Spare Parts, Mercedes spare parts, Genuine Mercedes parts, Auto parts, Customer support"
        />
        <meta property="og:title" content="Contact Kojak Spare Parts" />
        <meta
          property="og:description"
          content="Get in touch with Kojak Spare Parts for inquiries, orders, or any assistance regarding Genuine Mercedes Spare Parts. We're here to help you."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/contact-us" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Contact Kojak Spare Parts",
        "description": "Get in touch with Kojak Spare Parts for inquiries, orders, or any assistance regarding Genuine Mercedes Spare Parts. We're here to help you.",
        "url": "https://www.kojak-spareparts.com/contact-us",
        "image": "https://www.kojak-spareparts.com/assets/kojak-logo.svg"
      }
    //]]>`}
        </script>
      </Helmet>

      <ContactUsView />
    </>
  );
}
