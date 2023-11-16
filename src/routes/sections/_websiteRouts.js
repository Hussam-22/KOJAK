import { lazy } from 'react';

// ----------------------------------------------------------------------
const KojakBuildingLandingPage = lazy(() => import('src/pages/landing'));
const CareerPage = lazy(() => import('src/pages/career-page'));
const CareerItemPage = lazy(() => import('src/pages/career-item-page'));
const KojakBuildingAboutPage = lazy(() => import('src/pages/about'));
const ContactUsPage = lazy(() => import('src/pages/contact-us-page'));
const BlogPostsPage = lazy(() => import('src/pages/blog-posts-page'));
const BlogItemPage = lazy(() => import('src/pages/blog-item-page'));
// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      { path: 'career', element: <CareerPage /> },
      { path: 'career/:jobID', element: <CareerItemPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
    ],
  },
  {
    path: '/ar',
    children: [
      { element: <KojakBuildingLandingPage />, index: true },
      { path: 'career', element: <CareerPage /> },
      { path: 'career/:jobID', element: <CareerItemPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
    ],
  },
];
