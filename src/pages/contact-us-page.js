import { Helmet } from 'react-helmet-async';

import ContactUsView from 'src/sections/views/contact-us-view';

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Kojak Auto Maintenance - Get in Touch with Us</title>
        <meta
          name="description"
          content="Contact Kojak Auto Maintenance in Sharjah, UAE, for all your Mercedes auto repair and maintenance needs. Feel free to reach out to us with any questions or service inquiries."
        />
        <meta
          name="keywords"
          content="Contact Kojak Auto Maintenance, Mercedes auto repair, Mercedes maintenance, Mercedes service, Mercedes-Benz, automotive solutions, Kojak Auto Maintenance, Sharjah, UAE, contact information"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>

      <ContactUsView />
    </>
  );
}
