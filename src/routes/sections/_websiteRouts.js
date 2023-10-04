import { lazy } from 'react';

// ----------------------------------------------------------------------
const LandingPage = lazy(() => import('src/pages/landing'));
const LandingPageAr = lazy(() => import('src/pages/landing-ar'));

const ServicesPage = lazy(() => import('src/pages/services-page'));
const ServicesPageAr = lazy(() => import('src/pages/services-page-ar'));

const ServiceDetailsPage = lazy(() => import('src/pages/service-details-page'));
const ServiceDetailsPageAr = lazy(() => import('src/pages/service-details-page-ar'));

const AboutPage = lazy(() => import('src/pages/about'));
const AboutPageAr = lazy(() => import('src/pages/about-ar'));

const ContactUsPage = lazy(() => import('src/pages/contact-us-page'));
const ContactUsPageAr = lazy(() => import('src/pages/contact-us-page-ar'));

const BlogPostsPage = lazy(() => import('src/pages/blog-posts-page'));
const BlogPostsPageAr = lazy(() => import('src/pages/blog-posts-page-ar'));

const BlogItemPage = lazy(() => import('src/pages/blog-item-page'));
const BlogItemPageAr = lazy(() => import('src/pages/blog-item-page-ar'));
// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      { element: <LandingPage />, index: true },
      { path: 'ar/', element: <LandingPageAr />, index: true },
      { path: 'inventory', element: <ServicesPage /> },
      { path: 'ar/inventory', element: <ServicesPageAr /> },
      { path: 'inventory/:vehicleID', element: <ServiceDetailsPage /> },
      { path: 'ar/inventory/:vehicleID', element: <ServiceDetailsPageAr /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'ar/about', element: <AboutPageAr /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'ar/contact-us', element: <ContactUsPageAr /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'ar/blog-posts', element: <BlogPostsPageAr /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
      { path: 'ar/blog-posts/:postTitle', element: <BlogItemPageAr /> },
    ],
  },
];
