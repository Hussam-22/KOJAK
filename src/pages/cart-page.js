import { Helmet } from 'react-helmet-async';

import CartView from 'src/sections/views/cart-view';

function CareerItemPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Spare Parts | Cart</title>
      </Helmet>

      <CartView />
    </>
  );
}
export default CareerItemPage;
