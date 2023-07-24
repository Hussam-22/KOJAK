import { lazy } from 'react';

// ----------------------------------------------------------------------

const KojakBuildingLandingPage = lazy(() => import('src/pages/kojak-building/landing'));
const KojakBuildingSpacePage = lazy(() => import('src/pages/kojak-building/space'));
// const BlogPage = lazy(() => import('src/pages/career/posts'));
// const ContactPage = lazy(() => import('src/pages/career/contact'));
// const JobPage = lazy(() => import('src/pages/career/job'));
// const JobsPage = lazy(() => import('src/pages/career/jobs'));
// const PostPage = lazy(() => import('src/pages/career/post'));

// ----------------------------------------------------------------------

export const kojakBuildingRoutes = [
  {
    path: '/',
    children: [
      { element: <KojakBuildingLandingPage />, index: true },
      { path: 'space-view/:spaceId', element: <KojakBuildingSpacePage /> },
      // { path: 'job', element: <JobPage /> },
      // { path: 'posts', element: <BlogPage /> },
      // { path: 'post', element: <PostPage /> },
      // { path: 'about', element: <AboutPage /> },
      // { path: 'contact', element: <ContactPage /> },
    ],
  },
];
