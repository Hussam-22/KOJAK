import { lazy } from 'react';

// ----------------------------------------------------------------------
const KojakBuildingLandingPage = lazy(() => import('src/pages/landing'));
const PropertiesPage = lazy(() => import('src/pages/properties-page'));
const PropertyDetailsPage = lazy(() => import('src/pages/property-details-page'));
const KojakBuildingAboutPage = lazy(() => import('src/pages/about'));
const ContactUsPage = lazy(() => import('src/pages/contact-us-page'));
const BlogPostsPage = lazy(() => import('src/pages/blog-posts-page'));
const BlogItemPage = lazy(() => import('src/pages/blog-item-page'));
// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      { element: <KojakBuildingLandingPage />, index: true },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'properties/:propertyID', element: <PropertyDetailsPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
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
