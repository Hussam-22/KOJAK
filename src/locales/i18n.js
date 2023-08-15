import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// utils
import localStorageAvailable from '../utils/localStorageAvailable';

import arLocales from './langs/ar';
import viLocales from './langs/vi';
//
import enLocales from './langs/en';
import frLocales from './langs/fr';
import cnLocales from './langs/cn';
//
import { defaultLang } from './config-lang';

// ----------------------------------------------------------------------

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vi: { translations: viLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
