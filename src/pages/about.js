import { Helmet } from 'react-helmet-async';

import AboutView from 'src/sections/views/about-view';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Kojak Auto Maintenance - Your Trusted Mercedes Auto Care Partner</title>
        <meta
          name="description"
          content="Learn about Kojak Auto Maintenance, your trusted partner for Mercedes auto care in Sharjah, UAE. Discover our history, mission, and commitment to providing top-quality automotive services since 1987."
        />
        <meta
          name="keywords"
          content="About Kojak Auto Maintenance, Mercedes auto care, Mercedes maintenance, Mercedes service, Mercedes-Benz, automotive history, mission, commitment, Sharjah, UAE"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>

      <AboutView />
    </>
  );
}
