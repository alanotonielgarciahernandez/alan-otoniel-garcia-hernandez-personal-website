// i18n.ts
// Website localization handler.

// Localization components.
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import localization resources.
import { navigationEnglish, navigationSpanish } from './NavigationLocale';
import { homeEnglish, homeSpanish } from './HomeLocale';
import { curriculumVitaeEnglish, curriculumVitaeSpanish } from './CurriculumVitaeLocale';
import { contactEnglish, contactSpanish } from './ContactLocale';

i18n
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

          // Curriculum Vitae page content.
          cv: curriculumVitaeEnglish,

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

          // Curriculum Vitae page content.
          cv: curriculumVitaeSpanish,

          // Contact page content.
          contact: contactSpanish,
        }
      },
    }
  }
);

export default i18n;
