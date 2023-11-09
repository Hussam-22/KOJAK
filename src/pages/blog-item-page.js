import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { blogPosts } from 'src/_mock';
import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { postTitle } = useParams();
  const { title, description, content } = blogPosts.find(
    (post) => post.title.replaceAll(' ', '-') === postTitle
  );

  return (
    <>
      <Helmet>
        <title>Kojak Spare Parts - {title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Blog, Kojak Spare Parts, Mercedes spare parts, Genuine Mercedes parts, Auto parts, Maintenance tips"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://www.kojak-spareparts.com/${content[0].imageURL}`}
        />
        <meta property="og:url" content="https://www.kojak-spareparts.com/blog" />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": ${title},
        "description": ${description},
        "url": "https://www.kojak-spareparts.com/${postTitle}",
        "image": "https://www.kojak-spareparts.com/${content[0].imageURL}"
      }
    //]]>`}
        </script>
      </Helmet>

      <BlogItemView title={title} description={description} content={content} />
    </>
  );
}
