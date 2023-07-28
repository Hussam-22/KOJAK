import { lazy } from 'react';

// ----------------------------------------------------------------------

const KojakBuildingLandingPage = lazy(() => import('src/pages/kojak/landing'));
const PropertiesPage = lazy(() => import('src/pages/kojak/properties-page'));
const PropertyDetailsPage = lazy(() => import('src/pages/kojak/property-details-page'));
const KojakBuildingAboutPage = lazy(() => import('src/pages/kojak/about'));
const BlogPostsPage = lazy(() => import('src/pages/kojak/blog-posts-page'));
const BlogItemPage = lazy(() => import('src/pages/kojak/blog-item-page'));
// const BlogPage = lazy(() => import('src/pages/career/posts'));
// const ContactPage = lazy(() => import('src/pages/career/contact'));
// const JobPage = lazy(() => import('src/pages/career/job'));
// const JobsPage = lazy(() => import('src/pages/career/jobs'));
// const PostPage = lazy(() => import('src/pages/career/post'));

// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      { element: <KojakBuildingLandingPage />, index: true },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'properties/:propertyID', element: <PropertyDetailsPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
      // { path: 'job', element: <JobPage /> },
      // { path: 'posts', element: <BlogPage /> },
      // { path: 'post', element: <PostPage /> },
      // { path: 'about', element: <AboutPage /> },
      // { path: 'contact', element: <ContactPage /> },
    ],
  },
];
