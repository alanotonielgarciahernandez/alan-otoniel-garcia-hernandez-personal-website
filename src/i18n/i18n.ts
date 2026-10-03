// i18n.ts
// Website localization handler.

// Localization components.
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import localization resources.
import { navigationEnglish, navigationSpanish } from './NavigationLocale';
import { homeEnglish, homeSpanish } from './HomeLocale';
import { contactEnglish, contactSpanish } from './ContactLocale';
import { postsEnglish, postsSpanish } from './PostsLocale';
import { cvEnglish, cvSpanish } from './CVLocale';

void i18n
.use( initReactI18next )
// Detects browser language.
.use( LanguageDetector )
.init(
  {
    // Default localization.
    fallbackLng: 'en',
    resources:
    {
      // English localization.
      en:
      {
        translation:
        {
          // Navigation bar labels.
          nav: navigationEnglish,

          // Home page content.
          home: homeEnglish,

          // Posts page content.
          posts: postsEnglish,

          // Curriculum Vitae page content.
          cv: cvEnglish,

          // Contact page content.
          contact: contactEnglish,
        }
      },


      // Spanish localization.
      es:
      {
        translation:
        {
          // Navigation bar labels.
          nav: navigationSpanish,

          // Home page content.
          home: homeSpanish,

          // Posts page content.
          posts: postsSpanish,

          // Curriculum Vitae page content.
          cv: cvSpanish,

          // Contact page content.
          contact: contactSpanish,
        }
      },
    }
  }
);

export default i18n;
