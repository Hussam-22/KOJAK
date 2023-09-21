import { Helmet } from 'react-helmet-async';

import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>
          Welcome to Kojak Auto Maintenance - Mercedes Auto Repair Services in Sharjah, UAE
        </title>
        <meta
          name="description"
          content="Explore a comprehensive range of Mercedes auto repair and maintenance services offered by Kojak Auto Maintenance in Sharjah, UAE. Our services include Oil Change, Brake Service, Transmission Service, Engine Tune-Up, Engine Installation, Suspension Repair, Electrical System Repair, Air Conditioning Service, Battery Replacement, Radiator and Cooling System Repair, Diagnostics and Computerized Testing, Tire Rotation and Balancing, Major Service, and Minor Service."
        />
        <meta
          name="keywords"
          content="Mercedes auto repair, Mercedes maintenance, Mercedes service, Mercedes-Benz, automotive solutions, Kojak Auto Maintenance, Sharjah, UAE, Oil Change, Brake Service, Transmission Service, Engine Tune-Up, Engine Installation, Suspension Repair, Electrical System Repair, Air Conditioning Service, Battery Replacement, Radiator and Cooling System Repair, Diagnostics and Computerized Testing, Tire Rotation and Balancing, Major Service, Minor Service"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>

      <LandingView />
    </>
  );
}
