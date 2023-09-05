import { lazy } from 'react';

// ----------------------------------------------------------------------
const KojakBuildingLandingPage = lazy(() => import('src/pages/landing'));
const ServicesPage = lazy(() => import('src/pages/services-page'));
const ServiceDetailsPage = lazy(() => import('src/pages/service-details-page'));
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
      { path: 'inventory', element: <ServicesPage /> },
      { path: 'inventory/:vehicleID', element: <ServiceDetailsPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
    ],
  },
];
