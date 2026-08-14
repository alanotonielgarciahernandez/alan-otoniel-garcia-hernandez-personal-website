// TimeHelpers.js
// Gets the time that has passed from the provided date.

/**
 * Gets the localized unit for a given time interval.
 * @param locale The locale to use for the localization.
 * @param unit The unit to localize.
 * @param interval The time interval.
 * @returns The localized unit.
 */
const getLocaleUnit = ( locale: string, unit: string, interval: number ) =>
{
  var localeUnit = unit;

  // Handle unit language.
  switch ( locale ) {
    case 'es':
      switch ( unit ) {
        case 'year':
          localeUnit = 'año';

          if ( interval > 1 ) localeUnit += 's';
          
          break;

        case 'month':
          localeUnit = 'mes';

          if ( interval > 1 ) localeUnit += 'es';
          
          break;

        case 'day':
          localeUnit = 'día';

          if ( interval > 1 ) localeUnit += 's';
          
          break;

        case 'hour':
          localeUnit = 'hora';

          if ( interval > 1 ) localeUnit += 's';

          break;

        case 'minute':
          localeUnit = 'minuto';

          if ( interval > 1 ) localeUnit += 's';

          break;

        case 'second':
          localeUnit = 'segundo';

          if ( interval > 1 ) localeUnit += 's';

          break;
      }
      break;
      
    default:
      localeUnit = unit;

      if ( interval > 1 ) localeUnit += 's';
  }

  return localeUnit;
};

/**
 * Calculates the time that has passed from the provided date.
 * @param locale The locale to use for the time calculation.
 * @param providedDate The date to calculate the time from.
 * @returns An object containing the time and unit.
 */
export const getTimeAgo = ( locale: string, providedDate: string ) =>
{
  const seconds = Math.floor( ( new Date().getTime() - new Date( providedDate ).getTime() ) / 1000 );

  var interval = seconds / 31536000;

  if ( interval > 1 ) {
    return { time: Math.floor( interval ), unit: getLocaleUnit( locale, 'year', interval ) };
  }

  interval = seconds / 2592000;
  if ( interval > 1 ) {
    return { time: Math.floor( interval ), unit: getLocaleUnit( locale, 'month', interval ) };
  }

  interval = seconds / 86400;
  if ( interval > 1 ) {
    return { time: Math.floor( interval ), unit: getLocaleUnit( locale, 'day', interval ) };
  }

  interval = seconds / 3600;
  if ( interval > 1 ) {
    return { time: Math.floor( interval ), unit: getLocaleUnit( locale, 'hour', interval ) };
  }

  interval = seconds / 60;
  if ( interval > 1 ) {
    return { time: Math.floor( interval ), unit: getLocaleUnit( locale, 'minute', interval ) };
  }

  return { time: Math.floor( seconds ), unit: getLocaleUnit( locale, 'second', seconds ) };
}
