import { Helmet } from 'react-helmet-async';

import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance Blog - Stay Informed About Mercedes Auto Care</title>
      </Helmet>

      <BlogItemView />
    </>
  );
}
