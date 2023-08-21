import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  { title: 'home', path: '/' },
  { title: 'properties', path: paths.website.properties },
  { title: 'blog', path: paths.website.blogPosts },
  { title: 'about', path: paths.website.about },
  { title: 'contactUs', path: paths.website.contactUs },
  // {
  //   title: 'Pages',
  //   path: paths.pages,
  //   children: [pageLinks[0], pageLinks[1], pageLinks[2], pageLinks[3], pageLinks[4], pageLinks[5]],
  // },
];
