import { Helmet } from 'react-helmet-async';

import BookAppointmentView from 'src/sections/views/book-appointment-view';

export default function BookAppointmentPage() {
  return (
    <>
      <Helmet>
        <title>
          Book an Appointment with Kojak Auto Maintenance - Mercedes Auto Repair Services
        </title>
        <meta
          name="description"
          content="Schedule your Mercedes auto repair or maintenance appointment with Kojak Auto Maintenance in Sharjah, UAE. Conveniently book online and get your vehicle serviced by our expert technicians."
        />
        <meta
          name="keywords"
          content="Book an Appointment, Mercedes auto repair appointment, Mercedes maintenance appointment, Mercedes service appointment, Kojak Auto Maintenance, Sharjah, UAE, online booking, automotive services"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>
      <BookAppointmentView />
    </>
  );
}
