import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import Logo from 'src/components/logo/Logo';
import NotFoundView from 'src/sections/error/not-found-view';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
