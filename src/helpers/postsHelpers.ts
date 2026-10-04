// PostsHelpers.ts
// Helper functions for the posts.

// Import helpers.
import { getTimeAgo } from './timeHelpers';
import { toSupportedLocale } from './localeHelpers';

// Import types.
import type { PostEntry, PostIndexEntry } from '../models/PostsTypes';

/**
 * Validates if a date string is a valid date.
 * @param dateString - The date string to validate
 * @returns True if the date is valid, false otherwise
 */
const isValidDate = ( dateString: string ): boolean =>
{
    const date = new Date( dateString );
    return date instanceof Date && !isNaN( date.getTime() );
};

/**
 * Checks if a value is a valid post index entry.
 * @param value The value to check.
 * @returns True if the value is a valid post index entry, false otherwise.
 */
const isValidIndexEntry = ( value: unknown ): value is PostIndexEntry =>
{
    if ( typeof value !== 'object' || value === null ) return false;

    const entry = value as Record< string, unknown >;

    return (
        typeof entry.id === 'string' && entry.id.length > 0 &&
        typeof entry.path === 'string' && entry.path.length > 0 &&
        typeof entry.title === 'string' && entry.title.length > 0 &&
        typeof entry.datetime === 'string' && entry.datetime.length > 0 &&
        ( entry.format === undefined || entry.format === 'markdown' || entry.format === 'html' )
    );
};

/**
 * Fetches and processes the post entries for the specified language.
 * @param language The language to fetch posts for.
 * @returns A promise that resolves to an array of PostEntry objects.
 */
export const getPostEntries = async ( language: string | undefined ): Promise< PostEntry[] > =>
{
    try
    {
        const locale = toSupportedLocale( language );
        const indexPath = `/locale/${ locale }/posts/index.json`;
        const response = await fetch( indexPath );

        if ( !response.ok )
        {
            console.error( `Could not load post index: ${ indexPath }` );
            throw new Error( `Could not load post index: ${ indexPath }` );
        }

        const rawIndexData: unknown = await response.json();

        if ( !Array.isArray( rawIndexData ) )
        {
            console.error( `Invalid post index format at ${ indexPath }` );
            throw new Error( `Invalid post index format at ${ indexPath }` );
        }

        const postEntries: PostEntry[] = rawIndexData
            .filter( isValidIndexEntry )
            .map( ( entry ) =>
            {
                try
                {
                    if ( !isValidDate( entry.datetime ) )
                    {
                        console.warn( `Skipping post ${ entry.id }: Invalid or missing date` );
                        return null;
                    }

                    const date = new Date( entry.datetime );

                    return {
                        id: entry.id,
                        path: entry.path,
                        title: entry.title,
                        format: entry.format ?? 'markdown',
                        date: date,
                        timeAgo: getTimeAgo( locale, entry.datetime ),
                    };
                }
                catch ( error )
                {
                    console.error( `Error processing post ${ entry.id }:`, error );
                    return null;
                }
            } )
            .filter( ( post ): post is PostEntry => post !== null )
            .sort( ( left, right ) => right.date.getTime() - left.date.getTime() );
        
        return postEntries;
    }
    catch ( error )
    {
        console.error( 'Error loading posts:', error );
        throw error;
    }
}
