// ----------------------------------------------------------------------

export const paths = (lang) => ({
  website: {
    root: lang === 'ar' ? '/ar/' : '/',
    about: lang === 'ar' ? '/ar/about' : '/about',
    contactUs: lang === 'ar' ? '/ar/contact-us' : '/contact-us',
    blogPosts: lang === 'ar' ? '/ar/blog-posts' : '/blog-posts',
    blogItem: lang === 'ar' ? '/ar/blog-posts/' : '/blog-posts/',
    career: lang === 'ar' ? '/ar/career' : '/career',
    careerItem: lang === 'ar' ? '/ar/career/' : '/career/',
  },
  page404: '/404',
  page500: '/500',
});
