import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = (lang) => [
  { title: 'home', path: paths(lang).website.root },
  { title: 'services', path: paths(lang).website.services },
  { title: 'about', path: paths(lang).website.about },
  { title: 'blog', path: paths(lang).website.blogPosts },
  { title: 'contactUs', path: paths(lang).website.contactUs },
];
