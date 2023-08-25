import { Helmet } from 'react-helmet-async';

import ServicesView from 'src/sections/views/services-view';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance | Services</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>
      <ServicesView />
    </>
  );
}
