// TimeHelpers.js
// Gets the time that has passed from the provided date.

/**
 * Calculates the time that has passed from the provided date.
 * @param locale The locale to use for the time calculation.
 * @param providedDate The date to calculate the time from.
 * @returns An object containing the time and unit.
 */
export const getTimeAgo = ( locale: string, providedDate: string ) =>
{
  const seconds = Math.floor( ( new Date().getTime() - new Date( providedDate ).getTime() ) / 1000 );

  let interval = seconds / 31536000;

  const rtf1 = new Intl.RelativeTimeFormat( locale );

  if ( interval >= 1 ) {
    return rtf1.format( -Math.floor( interval ), 'year' );
  }

  interval = seconds / 2592000;
  if ( interval >= 1 ) {
    return rtf1.format( -Math.floor( interval ), 'month' );
  }

  interval = seconds / 86400;
  if ( interval >= 1 ) {
    return rtf1.format( -Math.floor( interval ), 'day' );
  }

  interval = seconds / 3600;
  if ( interval >= 1 ) {
    return rtf1.format( -Math.floor( interval ), 'hour' );
  }

  interval = seconds / 60;
  if ( interval >= 1 ) {
    return rtf1.format( -Math.floor( interval ), 'minute' );
  }

  return rtf1.format( -Math.floor( seconds ), 'second' );
}
