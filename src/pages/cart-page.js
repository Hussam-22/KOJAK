import { Helmet } from 'react-helmet-async';

import CartView from 'src/sections/views/cart-view';

function CareerItemPage() {
  return (
    <>
      <Helmet>
        <title>Spare Parts Cart - Kojak Spare Parts</title>
        <meta
          name="description"
          content="View and manage the items in your Spare Parts cart at Kojak Spare Parts. Order Genuine Mercedes Spare Parts with ease and convenience."
        />
        <meta
          name="keywords"
          content="Spare Parts cart, Kojak Spare Parts, Mercedes spare parts, Genuine Mercedes parts, Auto parts, Order parts"
        />
        <meta property="og:title" content="Spare Parts Cart - Kojak Spare Parts" />
        <meta
          property="og:description"
          content="View and manage the items in your Spare Parts cart at Kojak Spare Parts. Order Genuine Mercedes Spare Parts with ease and convenience."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/cart" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Spare Parts Cart - Kojak Spare Parts",
        "description": "View and manage the items in your Spare Parts cart at Kojak Spare Parts. Order Genuine Mercedes Spare Parts with ease and convenience.",
        "url": "https://www.kojak-spareparts.com/cart",
        "image": "https://www.kojak-spareparts.com/assets/kojak-logo.svg"
      }
    //]]>`}
        </script>
      </Helmet>

      <CartView />
    </>
  );
}
export default CareerItemPage;
