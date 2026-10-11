// RouteErrorScreen.tsx
// Handles route errors without redirecting a failing Home Screen back to itself.

// Import React Router components.
import { Navigate, useLocation, useNavigate, useRouteError } from 'react-router-dom';

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Button, Container, Stack } from 'react-bootstrap';

// Import locale helper.
import { toSupportedLocale } from '../helpers/localeHelpers';

export const RouteErrorScreen = () =>
{
    // Get the error from the route.
    const error = useRouteError();

    // Get the current route to avoid redirecting a failed Home Screen to itself.
    const location = useLocation();

    // React Router navigate function to provide fallback navigation.
    const navigate = useNavigate();

    // Translation hook to read the active language.
    const { i18n, t } = useTranslation();

    // Log the error to the console for debugging purposes.
    console.error( 'Route error:', error );

    if ( location.pathname === '/' )
    {
        const currentLocale = toSupportedLocale( i18n.resolvedLanguage );
        const nextLocale = currentLocale === 'en' ? 'es' : 'en';

        return (
            <Container
                className='d-flex flex-column justify-content-center align-items-center text-center px-3'
                style={ { minHeight: '40vh' } }
            >
                <h1>{ t( 'routeError.homeErrorTitle' ) }</h1>
                <p>{ t( 'routeError.homeErrorDescription' ) }</p>

                <h2 className='h5 mt-3'>{ t( 'routeError.navigationTitle' ) }</h2>

                <Stack
                    direction='horizontal'
                    gap={ 2 }
                    className='flex-wrap justify-content-center'
                >
                    <Button
                        variant='outline-light'
                        onClick={ () => { void navigate( '/posts' ); } }
                    >
                        { t( 'nav.posts' ) }
                    </Button>
                    <Button
                        variant='outline-light'
                        onClick={ () => { void navigate( '/cv' ); } }
                    >
                        { t( 'nav.curriculumVitae' ) }
                    </Button>
                    <Button
                        variant='outline-light'
                        onClick={ () => { void navigate( '/contact' ); } }
                    >
                        { t( 'nav.contact' ) }
                    </Button>
                </Stack>
                <Button
                    className='mt-3'
                    variant='outline-light'
                    onClick={ () => { void i18n.changeLanguage( nextLocale ); } }
                >
                    <i className='bi bi-translate me-2' />
                    { t( 'routeError.languageToggle' ) }
                </Button>
            </Container>
        );
    }

    return (
        <Navigate
            to='/'
            replace
            state={ { routeError: true } }
        />
    );
};
