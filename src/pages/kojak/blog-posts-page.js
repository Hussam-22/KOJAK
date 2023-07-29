import { Helmet } from 'react-helmet-async';

import BlogPostsView from 'src/sections/_kojakBuilding/views/blog-posts-view';

export default function KojakBuildingNewsPage() {
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>

      <BlogPostsView />
    </>
  );
}
