// AppNavbar.tsx
// A simple navbar component.

// Import React Router navigate function.
import { useLocation, useNavigate } from 'react-router-dom';

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Button, Image, Nav } from 'react-bootstrap';

// Props for the AppNavbar component.
type AppNavbarProps =
{
    onNavigate?: () => void;
}

export const AppNavbar = ( { onNavigate }: AppNavbarProps ) => {
    // React Router navigate function to change routes programmatically.
    const navigate = useNavigate();

    // React Router location to determine the active tab.
    const location = useLocation();

    // Translation hook to get the translation function for the current language.
    const { t } = useTranslation();

    // Determine the active tab based on the current location.
    const activeTab =
        location.pathname === '/cv' ? 'cv' :
        location.pathname === '/contact' ? 'contact' :
        location.pathname === '/test' ? 'test' :
        '/';

    // Function to handle navigation and call the onNavigate callback if provided.
    const handleNavigate = ( path: string ) => {
        navigate( path );
        onNavigate?.();
    }

    return (
        <>
            { /* Signature at the top. */ }
            <a
                className='d-flex flex-column align-items-center'
                onClick= { () => handleNavigate( '/' ) }
            >
                <Image
                    src='/icons/signature-nav.svg'
                    alt='Alan Otoniel Garcia Hernandez'
                />
            </a>

            <hr />

            { /* Navigation links. */ }
            <Nav
                className='flex-column mb-auto'
                variant='pills'
                defaultActiveKey='/'
            >
                { /* Home navigation button. */ }
                <Nav.Link
                    className='text-body'
                    active={ activeTab === '/' }
                    onClick= { () => handleNavigate( '/' ) }
                >
                    { t( 'nav.home' ) }
                </Nav.Link>

                { /* Curriculum Vitae navigation button. */ }
                <Nav.Link
                    className='text-body'
                    active={ activeTab === 'cv' }
                    onClick= { () => handleNavigate( 'cv' ) }
                >
                    { t( 'nav.curriculumVitae' ) }
                </Nav.Link>

                { /* Contact navigation button. */ }
                <Nav.Link
                    className='text-body'
                    active={ activeTab === 'contact' }
                    onClick= { () => handleNavigate( 'contact' ) }
                >
                    { t( 'nav.contact' ) }
                </Nav.Link>
            </Nav>

            <hr />

            { /* Personal Projects button. */ }
            <Button
                className='d-flex btn-transparent mb-3'
                href='https://projects.alanotonielgarciahernandez.com'
                target='_blank'
                rel='noreferrer'
            >
                <i className='bi bi-box-arrow-up-right me-2' />
                
                Personal Projects
            </Button>

            { /* Footer with copyright information. */ }
            <span className='text-secondary'>
                &copy; { new Date().getFullYear() } Alan Otoniel Garcia Hernandez
            </span>
        </>
    )
}
