import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  { title: 'Home', path: '/' },
  { title: 'Properties', path: paths.website.properties },
  { title: 'Blog', path: paths.website.blogPosts },
  { title: 'About', path: paths.website.about },
  { title: 'Contact Us', path: paths.website.contactUs },
  // {
  //   title: 'Pages',
  //   path: paths.pages,
  //   children: [pageLinks[0], pageLinks[1], pageLinks[2], pageLinks[3], pageLinks[4], pageLinks[5]],
  // },
];
