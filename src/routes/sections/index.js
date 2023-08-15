import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

import { errorRoutes } from './error';
import { _websiteRouts } from './_websiteRouts';

// ----------------------------------------------------------------------

// const IndexPage = lazy(() => import('src/pages/home'));
const IndexPage = lazy(() => import('src/pages/kojak/landing'));

export default function Router() {
  return useRoutes([
    {
      element: (
        <MainLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [{ element: <IndexPage />, index: true }, ..._websiteRouts],
    },

    ...errorRoutes,

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
