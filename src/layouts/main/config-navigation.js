import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = (lang) => [
  { title: 'home', path: paths(lang).website.root },
  { title: 'services', path: paths(lang).website.services },
  { title: 'about', path: paths(lang).website.about },
  { title: 'blog', path: paths(lang).website.blogPosts },
  { title: 'contactUs', path: paths(lang).website.contactUs },
  // { title: 'bookAppointment', path: paths.website.bookAppointment },

  // { title: 'home', path: '/' },
  // { title: 'properties', path: '#' },
  // { title: 'blog', path: '#' },
  // { title: 'about', path: '#' },
  // { title: 'contactUs', path: '#' },
  // {
  //   title: 'Pages',
  //   path: paths.pages,
  //   children: [pageLinks[0], pageLinks[1], pageLinks[2], pageLinks[3], pageLinks[4], pageLinks[5]],
  // },
];
