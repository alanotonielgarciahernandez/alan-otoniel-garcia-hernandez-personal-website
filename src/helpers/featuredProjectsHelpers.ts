// FeaturedProjectsHelpers.ts
// Helper functions for the featured projects.

// Import types.
import type { PortfolioProject } from '../models';

const FEATURED_PROJECTS_PATH = `/FeaturedProjects.json`;

/**
 * Checks if a value is a valid featured project.
 * @param value The value to check.
 * @returns True if the value is a valid featured project, false otherwise.
 */
const isValidFeaturedProject = ( value: unknown ): value is PortfolioProject =>
{
    if ( typeof value !== 'object' || value === null ) return false;

    const project = value as Record< string, unknown >;

    return (
        typeof project.id === 'string' && project.id.length > 0 &&
        typeof project.name === 'string' && project.name.length > 0 &&
        Array.isArray( project.technologies ) &&
        project.technologies.length > 0 &&
        project.technologies.every(
            ( technology ) => typeof technology === 'string' && technology.length > 0
        ) &&
        typeof project.description === 'string' &&
        typeof project.image === 'string' && project.image.length > 0 &&
        typeof project.link === 'string' && project.link.length > 0
    );
};

/**
 * Fetches and processes the featured projects entries.
 * @returns A promise that resolves to an array of PortfolioProject objects.
 */
export const getFeaturedProjectEntries = async ( signal?: AbortSignal ): Promise< PortfolioProject[] > =>
{
    try
    {
        const response = await fetch(
            FEATURED_PROJECTS_PATH,
            { signal }
        );

        if ( !response.ok )
        {
            console.error( `Could not load featured projects: ${ FEATURED_PROJECTS_PATH }` );
            throw new Error( `Could not load featured projects: ${ FEATURED_PROJECTS_PATH }` );
        }

        const rawData: unknown = await response.json();

        if ( !Array.isArray( rawData ) )
        {
            console.error( `Invalid featured projects format at ${ FEATURED_PROJECTS_PATH }` );
            throw new Error( `Invalid featured projects format at ${ FEATURED_PROJECTS_PATH }` );
        }

        const featuredProjectEntries: PortfolioProject[] = rawData
            .filter( isValidFeaturedProject )
            .map( ( entry ) =>
            {
                try
                {
                    return {
                        id: entry.id,
                        name: entry.name,
                        technologies: entry.technologies,
                        description: entry.description,
                        image: entry.image,
                        link: entry.link,
                    };
                }
                catch ( error )
                {
                    console.error( `Error processing featured project ${ entry.id }:`, error );
                    return null;
                }
            } )
            .filter( ( featuredProject ): featuredProject is PortfolioProject => featuredProject !== null );
        
        return featuredProjectEntries;
    }
    catch ( error )
    {
        console.error( 'Error loading featured projects:', error );
        throw error;
    }
};
