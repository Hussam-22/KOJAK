import { blogPosts } from 'src/_mock';
import LatestPosts from 'src/sections/blog/latest-posts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import SpotlightVehicles from 'src/sections/landing/spotlight-vehicles';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import InternationalBusiness from 'src/sections/landing/internatioanl-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <SpotlightVehicles />
      <InternationalBusiness />
      <LandingAbout />
      <VisitGroupsWebsite />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
