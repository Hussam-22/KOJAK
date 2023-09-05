import { Helmet } from 'react-helmet-async';

import ServiceDetailsView from 'src/sections/views/service-details-view';

export default function ServiceDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Exclusive | Inventory</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="KOJAK GROUP - Exclusive" />
      </Helmet>
      <ServiceDetailsView />
    </>
  );
}
