// PostsScreen.tsx
// The posts screen of the app.

// Import React components.
import { useEffect, useState } from 'react';

// Import React Router components.
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Alert, Col, Container, Row } from 'react-bootstrap';

// Import custom components.
import { PostRenderer } from '../components/PostRenderer';
import { PostsScrollbar } from '../components/PostsScrollbar';

// Import helpers.
import { getPostEntries } from '../helpers/postsHelpers';

// Import types.
import type { PostEntry } from '../models';

interface InvalidPostState
{
    invalidPostId?: string;
}

// Type guard to check if the state is of type InvalidPostState.
const isInvalidPostState = ( state: unknown ): state is InvalidPostState =>
{
    return typeof state === 'object' && state !== null;
};

export const PostsScreen = () =>
{
    // Get the post ID (slug or index) from the route loader data.
    const loaderData = useLoaderData<{ id?: string }>();
    const { id } = loaderData;

    // React Router navigate function to change routes programmatically.
    const navigate = useNavigate();

    // React Router location object to access the current route's state.
    const location = useLocation();

    // Store the invalid post locally so the alert can be dismissed
    // from the navigation state.
    const hasInvalidPost = isInvalidPostState( location.state ) && typeof location.state.invalidPostId === 'string';

    // State to control the visibility of the invalid post alert.
    const [ showInvalidPostAlert, setShowInvalidPostAlert ] = useState( hasInvalidPost );

    // Translation hook to read and change the active language.
    const { i18n, t } = useTranslation();

    // State to store the list of post entries,
    const [ postEntries, setPostEntries ] = useState< PostEntry[] >( [] );

    // State to store the index of the currently selected post.
    const [ selectedPost, setSelectedPost ] = useState( 0 );

    // State to track loading and error states for fetching posts.
    const [ isLoading, setIsLoading ] = useState( true );

    // State to track if there was an error loading the posts.
    const [ hasError, setHasError ] = useState( false );

    useEffect( () =>
    {
        let isMounted = true;

        const loadEntries = async () =>
        {
            setIsLoading( true );
            setHasError( false );

            try
            {
                const entries = await getPostEntries( i18n.resolvedLanguage );

                if ( !isMounted ) return;

                setPostEntries( entries );
            }
            catch ( error )
            {
                if ( !isMounted ) return;

                console.error( 'Error loading posts list:', error );
                setHasError( true );
                setPostEntries( [] );
            }
            finally
            {
                if ( isMounted ) setIsLoading( false );
            }
        };

        void loadEntries();

        return () =>
        {
            isMounted = false;
        };
    }, [ i18n.resolvedLanguage ] );

    useEffect( () =>
    {
        if ( postEntries.length === 0 )
        {
            setSelectedPost( 0 );
            return;
        }

        if ( !id )
        {
            setSelectedPost( 0 );
            return;
        }

        const bySlug = postEntries.findIndex( p => p.id === id );
        if ( bySlug >= 0 )
        {
            setSelectedPost( bySlug );
            return;
        }

        setSelectedPost( 0 );
        void navigate(
            `/posts/${ postEntries[ 0 ].id }`,
            {
                replace: true,
                state: { invalidPostId: id },
            }
        );
    }, [ id, navigate, postEntries ] );

    useEffect( () =>
    {
        if ( !hasInvalidPost ) return;

        setShowInvalidPostAlert( true );

        // Remove the one-time flag from browser history after reading it.
        void navigate(
            location.pathname,
            {
                replace: true,
                state: null
            }
        );
    }, [ location.pathname, location.state, navigate ] );
    

    if ( isLoading )
    {
        return (
            <Container
                className='d-flex justify-content-center align-items-center text-center px-3'
                style={ { minHeight: '40vh' } }
            >
                <h1>{ t( 'posts.loadingPosts' ) }</h1>
            </Container>
        );
    }

    if ( hasError )
    {
        return (
            <Container
                className='d-flex justify-content-center align-items-center text-center px-3'
                style={ { minHeight: '40vh' } }
            >
                <h1>{ t( 'posts.loadPostsError' ) }</h1>
            </Container>
        );
    }

    // Handle empty posts list
    if ( postEntries.length === 0 )
    {
        return (
            <Container
                className='d-flex justify-content-center align-items-center text-center px-3'
                style={ { minHeight: '40vh' } }
            >
                <h1>{ t( 'posts.noPosts' ) }</h1>
            </Container>
        );
    }

    // Ensure selectedPost is within valid bounds
    const validSelectedPost = selectedPost >= postEntries.length ? 0 : selectedPost;

    return (
        <Container fluid className='posts-page px-3 px-md-4 py-4'>
            { showInvalidPostAlert && (
                <Alert
                    variant='warning'
                    dismissible
                    onClose={ () => { setShowInvalidPostAlert( false ); } }
                >
                    { t( 'posts.invalidPostRedirected' ) }
                </Alert>
            ) }

            <Row className='g-4 align-items-start'>
                <Col xs={ 12 } md={ 4 } lg={ 3 } className='posts-sidebar-column'>
                    <span className='fs-1'>{ t( 'posts.title' ) }</span>
                    <div className='posts-sidebar'>
                    <PostsScrollbar
                        postList={ postEntries }
                        selectedPost={ validSelectedPost }
                            onPostSelect={ ( postIndex ) =>
                        {
                            setSelectedPost( postIndex );
                            void navigate( `/posts/${ postEntries[ postIndex ].id }` );
                        }
                        }
                        />
                    </div>
                </Col>
                <Col xs={ 12 } md={ 8 } lg={ 9 } className='posts-content-column'>
                    <Container
                        className='d-flex flex-column justify-content-center px-0 px-md-3'
                        style={ { maxWidth: '800px' } }
                    >
                        <PostRenderer post={ postEntries[ validSelectedPost ] } />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
