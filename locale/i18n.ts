import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import ar from './ar.json';
import en from './en.json';

// Type definitions
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof ar;
    };
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  detection: {
    order: ['asyncStorage', 'navigator'],
    caches: ['asyncStorage'],
  },
});

export const isRTL = i18n.language.startsWith('ar');
export default i18n;
