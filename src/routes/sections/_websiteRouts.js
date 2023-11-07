import { lazy } from 'react';

// ----------------------------------------------------------------------
const KojakBuildingLandingPage = lazy(() => import('src/pages/landing'));
const SparePartsPage = lazy(() => import('src/pages/spare-parts-page'));
const SparePartDetailsPage = lazy(() => import('src/pages/spare-part-details-page'));
const CartPage = lazy(() => import('src/pages/cart-page'));
const KojakBuildingAboutPage = lazy(() => import('src/pages/about'));
const ContactUsPage = lazy(() => import('src/pages/contact-us-page'));
const BlogPostsPage = lazy(() => import('src/pages/blog-posts-page'));
const BlogItemPage = lazy(() => import('src/pages/blog-item-page'));
// ----------------------------------------------------------------------

export const _websiteRouts = [
  {
    path: '/',
    children: [
      // { element: <KojakBuildingLandingPage />, index: true },
      {
        path: 'spare-parts',
        children: [
          { element: <SparePartsPage />, index: true },
          { path: ':partDocID', element: <SparePartDetailsPage /> },
        ],
      },
      { path: 'cart', element: <CartPage /> },
      { path: 'about', element: <KojakBuildingAboutPage /> },
      { path: 'contact-us', element: <ContactUsPage /> },
      { path: 'blog-posts', element: <BlogPostsPage /> },
      { path: 'blog-posts/:postTitle', element: <BlogItemPage /> },
    ],
  },
];
