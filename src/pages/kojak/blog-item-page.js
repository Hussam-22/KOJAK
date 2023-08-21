import { Helmet } from 'react-helmet-async';

import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function CareerPostPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Building | Blog Post</title>
      </Helmet>

      <BlogItemView />
    </>
  );
}
