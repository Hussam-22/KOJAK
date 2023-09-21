import { Helmet } from 'react-helmet-async';

import ServicesView from 'src/sections/views/services-view';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Mercedes Auto Repair Services at Kojak Auto Maintenance - Sharjah, UAE</title>
        <meta
          name="description"
          content="Explore a comprehensive range of Mercedes auto repair and maintenance services offered by Kojak Auto Maintenance in Sharjah, UAE. Trust our expertise for all your Mercedes-Benz vehicle needs."
        />
        <meta
          name="keywords"
          content="Mercedes auto repair services, Mercedes maintenance, Mercedes service, automotive solutions, Kojak Auto Maintenance, Sharjah, UAE"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>
      <ServicesView />
    </>
  );
}
