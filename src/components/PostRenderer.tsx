// PostRenderer.tsx
// The post renderer for displaying individual posts.

// Import React modules.
import { useEffect, useState } from 'react';

// Import third-party modules.
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import types.
import { useTranslation } from 'react-i18next';
import type { PostRendererProps } from '../models/PostsTypes';

/**
 * Safely loads and returns post content.
 * @param path - The path to the post HTML file.
 * @returns The content, or an error message if the file couldn't be loaded.
 */
const getPostContent = async ( path: string ): Promise< string | null > =>
{
    try
    {
        const response = await fetch( path );

        if ( !response.ok )
        {
            console.error( `Post file not found: ${ path }` );
            return null;
        }

        return await response.text();
    }
    catch ( error )
    {
        console.error( `Error loading post from ${ path }:`, error );
        return null;
    }
};

/**
 * Formats a date for display in the specified locale.
 * @param date The date to format.
 * @param locale The locale to use for formatting.
 * @returns The formatted date string.
 */
const formatPostDate = ( date: Date, locale: string ): string =>
{
    return new Intl.DateTimeFormat( locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    } ).format( date );
};

/**
 * Renders a single post.
 * @param props The properties for the post renderer.
 * @returns The rendered post.
 */
export const PostRenderer = ( props: PostRendererProps ) =>
{
    // Translation hook to read and change the active language.
    const { i18n, t } = useTranslation();
    const locale = i18n.resolvedLanguage === 'es' ? 'es' : 'en';
    const formattedDate = formatPostDate( props.post.date, locale );
    const [ content, setContent ] = useState< string | null >( null );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ hasError, setHasError ] = useState( false );

    useEffect( () =>
    {
        let isMounted = true;

        const loadHtml = async () =>
        {
            setIsLoading( true );
            setHasError( false );

            const content = await getPostContent( props.post.path );

            if ( !isMounted ) return;

            if ( content === null )
            {
                setHasError( true );
                setContent( null );
                setIsLoading( false );

                return;
            }

            setContent( content );
            setIsLoading( false );
        };

        void loadHtml();

        return () =>
        {
            isMounted = false;
        };
    }, [ props.post.path ] );

    if ( isLoading )
    {
        return (
            <>
                <h1>{ props.post.title }</h1>
                <span className='text-muted'>{ formattedDate }</span>
                <hr />
                <p className='text-muted'>{ t( 'posts.loadingPost' ) }</p>
            </>
        );
    }

    // Handle error when post file couldn't be loaded.
    if ( hasError || content === null )
    {
        return (
            <>
                <h1>{ props.post.title }</h1>
                <span className='text-muted'>{ formattedDate }</span>
                <hr />
                <div className='alert alert-danger' role='alert'>
                    <strong>{ t( 'posts.loadPostErrorTitle' ) }</strong><br />
                    { t( 'posts.loadPostErrorMessage' ) }
                </div>
            </>
        );
    }

    return (
        <>
            <h1>{ props.post.title }</h1>
            <span className='text-muted'>{ formattedDate }</span>
            <hr />
            {
                props.post.format === 'html'
                ?
                    <div dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize( content ) } } />
                :
                    <ReactMarkdown remarkPlugins={ [ remarkGfm ] }>
                        { content }
                    </ReactMarkdown>
            }
        </>
    )
}
