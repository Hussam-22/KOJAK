import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function NavConfig() {
  const { currentLang } = useLocales();

  const lang = currentLang.value;

  return [
    { title: 'home', path: paths(lang).website.root },
    { title: 'about', path: paths(lang).website.about },
    { title: 'career', path: paths(lang).website.career },
    { title: 'blog', path: paths(lang).website.blogPosts },
    { title: 'contactUs', path: paths(lang).website.contactUs },
  ];
}
