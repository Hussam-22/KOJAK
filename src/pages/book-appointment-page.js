import { Helmet } from 'react-helmet-async';

import BookAppointmentView from 'src/sections/views/book-appointment-view';

export default function BookAppointmentPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance | Book an Appointment</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>
      <BookAppointmentView />
    </>
  );
}
