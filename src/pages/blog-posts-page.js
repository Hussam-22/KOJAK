import { Helmet } from 'react-helmet-async';

import BlogPostsView from 'src/sections/views/blog-posts-view';

const PAGE_NAME = 'BLOG';

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Auto Maintenance Blog - Stay Informed About Mercedes Auto Care</title>
        <meta
          name="description"
          content="Explore the latest articles and insights on Mercedes auto care and maintenance on the Kojak Auto Maintenance blog. Stay informed about tips, news, and expert advice for your Mercedes-Benz vehicle."
        />
        <meta
          name="keywords"
          content="Kojak Auto Maintenance Blog, Mercedes auto care, Mercedes maintenance, Mercedes service, Mercedes-Benz, automotive tips, car maintenance, expert advice"
        />
        <meta name="author" content="KOJAK GROUP - Auto Maintenance" />
      </Helmet>

      <BlogPostsView />
    </>
  );
}
