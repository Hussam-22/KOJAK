import { blogPosts } from 'src/_mock';
import LatestPosts from 'src/sections/blog/latest-posts';
import SpareParts from 'src/sections/landing/spare-parts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import AutoMaintenance from 'src/sections/landing/auto-maintenance';
import SpotlightVehicles from 'src/sections/landing/spotlight-vehicles';
import InternationalBusiness from 'src/sections/landing/internatioanl-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <SpotlightVehicles />
      <InternationalBusiness />
      <LandingAbout />
      <SpareParts />
      <AutoMaintenance />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
    </>
  );
}
