import { blogPosts } from 'src/_mock';
import History from 'src/sections/landing/history';
import LatestPosts from 'src/sections/blog/latest-posts';
import HandPicked from 'src/sections/landing/hand-picked';
import LandingHero from 'src/sections/landing/LandingHero';
import VisitGroupsWebsite from 'src/sections/landing/visit-groups-website';
import InternationalBusiness from 'src/sections/landing/international-business';

export default function LandingView() {
  return (
    <>
      <LandingHero />
      <History />
      <InternationalBusiness />
      {/* <HandPicked /> */}
      <VisitGroupsWebsite />
      <LatestPosts posts={blogPosts} />
    </>
  );
}
