import { Helmet } from 'react-helmet-async';

import BlogPostsView from 'src/sections/views/blog-posts-view';

const PAGE_NAME = 'BLOG';

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Group | Blog</title>
        <meta
          name="description"
          content="Your go-to resource for all things related to property renting and leasing. Whether you're a seasoned tenant or a first-time renter, a property owner, or a curious observer of the real estate market, our blog is designed to provide you with valuable information, tips, and industry insights"
        />
        <meta
          name="keywords"
          content="kojak,building,kojak building,rent,sharjah,dubai,space,property"
        />
        <meta name="author" content="KOJAK GROUP - KOJAK BUILDING" />
      </Helmet>

      <BlogPostsView />
    </>
  );
}
