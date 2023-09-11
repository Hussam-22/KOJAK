import { Helmet } from 'react-helmet-async';

import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance | Blog Post</title>
      </Helmet>

      <BlogItemView />
    </>
  );
}
