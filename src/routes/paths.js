// ----------------------------------------------------------------------

export const paths = (lang) => ({
  website: {
    root: lang === 'ar' ? '/ar/' : '/',
    about: lang === 'ar' ? '/ar/about' : '/about',
    contactUs: lang === 'ar' ? '/ar/contact-us' : '/contact-us',
    services: lang === 'ar' ? '/ar/services' : '/services',
    bookAppointment: lang === 'ar' ? '/ar/book-appointment' : '/book-appointment',
    blogPosts: lang === 'ar' ? '/ar/blog-posts' : '/blog-posts',
    blogItem: lang === 'ar' ? '/ar/blog-posts/' : '/blog-posts/',
  },
  page404: '/404',
  page500: '/500',
});
