const fs = require('fs');

const paths = {
  // Building
  website: {
    root: { path: '/', priority: 1.0, changefreq: 'daily' },
    about: { path: '/about', priority: 0.8, changefreq: 'weekly' },
    contactUs: { path: '/contact-us', priority: 0.7, changefreq: 'monthly' },
    services: { path: '/services', priority: 0.6, changefreq: 'monthly' },
    blogPosts: { path: '/blog-posts', priority: 0.5, changefreq: 'daily' },
    bookAppointment: { path: '/book-appointment', priority: 0.9, changefreq: 'weekly' },
  },
  page404: { path: '/404', priority: 0.4, changefreq: 'yearly' },
  page500: { path: '/500', priority: 0.3, changefreq: 'yearly' },
};

const posts = [
  {
    id: 'T8FHGa',
    title: 'Why Choose a Mercedes Auto Repair Shop for Servicing Your Luxury Vehicle',
  },
  { id: 'T8FHGb', title: 'The Benefits of Timely Servicing at a Mercedes Auto Repair Shop' },
  { id: 'T8FHGc', title: `Why Mercedes Owners Shouldn't Compromise on Service Quality` },
  { id: 'T8FHGd', title: `Mercedes-Benz Maintenance: The Road to Longevity` },
  { id: 'T8FHGe', title: `The Heart of Your Mercedes: Why Engine Service Matters` },
  { id: 'T8FHGf', title: `Safety First: Why Mercedes Owners Should Prioritize Brake Service` },
];

// Define your list of blog items
const blogItems = posts.map((post) => ({
  id: post.id,
  slug: post.title.replaceAll(' ', '-'),
  priority: 0.7,
  changefreq: 'monthly',
}));

const baseUrl = 'https://kojak-auto-maintenance.com/'; // Replace with your website's base URL

const sitemapUrls = [];

// Generate URLs for paths
Object.values(paths).forEach((pathObj) => {
  const { path } = pathObj;
  const priority = pathObj.priority || 0.5; // Default priority to 0.5 if not specified
  const changefreq = pathObj.changefreq || 'weekly'; // Default changefreq to 'weekly' if not specified
  const url = `${baseUrl}${path}`;
  sitemapUrls.push({ url, priority, changefreq });
});

// Generate URLs for blog items
blogItems.forEach((blogItem) => {
  const blogItemUrl = `${baseUrl}/blog-posts/${blogItem.slug}`;
  const priority = blogItem.priority || 0.5; // Default priority to 0.5 if not specified
  const changefreq = blogItem.changefreq || 'daily'; // Default changefreq to 'daily' if not specified
  sitemapUrls.push({ url: blogItemUrl, priority, changefreq });
});

// Convert the URLs to XML format
const sitemapXML = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls
    .map(
      ({ url, priority, changefreq }) => `
    <url>
      <loc>${url}</loc>
      <priority>${priority}</priority>
      <changefreq>${changefreq}</changefreq>
    </url>
  `
    )
    .join('')}
</urlset>`;

// Write the sitemap.xml file
fs.writeFileSync('public/sitemap.xml', sitemapXML);

console.log('Sitemap generated successfully.');
