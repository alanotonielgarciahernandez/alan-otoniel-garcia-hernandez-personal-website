// Locale helper functions.

export type SupportedLocale = 'en' | 'es';

/**
 * Normalizes a language tag to one of the locales supported by the website.
 * @param language The language tag to normalize.
 * @returns The supported locale, defaulting to English.
 */
export const toSupportedLocale = ( language: string | undefined ): SupportedLocale =>
{
    const baseLanguage = language?.toLowerCase().split( '-' )[ 0 ];

    return baseLanguage === 'es' ? 'es' : 'en';
};
