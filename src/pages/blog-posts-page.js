import { Helmet } from 'react-helmet-async';

import BlogPostsView from 'src/sections/views/blog-posts-view';

const PAGE_NAME = 'BLOG';

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Kojak Spare Parts Blog</title>
        <meta
          name="description"
          content="Explore the latest articles and updates on Genuine Mercedes Spare Parts in the Kojak Spare Parts Blog. Stay informed about auto parts, maintenance tips, and more."
        />
        <meta
          name="keywords"
          content="Blog, Kojak Spare Parts, Mercedes spare parts, Genuine Mercedes parts, Auto parts, Maintenance tips"
        />
        <meta property="og:title" content="Kojak Spare Parts Blog" />
        <meta
          property="og:description"
          content="Explore the latest articles and updates on Genuine Mercedes Spare Parts in the Kojak Spare Parts Blog. Stay informed about auto parts, maintenance tips, and more."
        />
        <meta
          property="og:image"
          content="https://www.kojak-spareparts.com/assets/kojak-logo.svg"
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/blog-posts" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Kojak Spare Parts Blog",
        "description": "Explore the latest articles and updates on Genuine Mercedes Spare Parts in the Kojak Spare Parts Blog. Stay informed about auto parts, maintenance tips, and more.",
        "url": "https://www.kojak-spareparts.com/blog-posts",
        "image": "https://www.kojak-spareparts.com/assets/kojak-logo.svg"
      }
    //]]>`}
        </script>
      </Helmet>

      <BlogPostsView />
    </>
  );
}
