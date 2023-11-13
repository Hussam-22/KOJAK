import { lazy } from 'react';

// ----------------------------------------------------------------------
const KojakBuildingLandingPage = lazy(() => import('src/pages/landing'));
const ServicesPage = lazy(() => import('src/pages/services-page'));
const KojakBuildingAboutPage = lazy(() => import('src/pages/about'));
const ContactUsPage = lazy(() => import('src/pages/contact-us-page'));
const BlogPostsPage = lazy(() => import('src/pages/blog-posts-page'));
const BlogItemPage = lazy(() => import('src/pages/blog-item-page'));
const BookAppointmentPage = lazy(() => import('src/pages/book-appointment-page'));
// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      { path: 'services', element: <ServicesPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: 'book-appointment', element: <BookAppointmentPage /> },
    ],
  },
  {
    path: '/ar',
    children: [
      { element: <KojakBuildingLandingPage />, index: true },
      { path: '/ar/services', element: <ServicesPage /> },
      { path: '/ar/about', element: <KojakBuildingAboutPage /> },
      { path: '/ar/contact-us', element: <ContactUsPage /> },
      { path: '/ar/blog-posts', element: <BlogPostsPage /> },
      { path: '/ar/blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: '/ar/blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: '/ar/book-appointment', element: <BookAppointmentPage /> },
    ],
  },
];
