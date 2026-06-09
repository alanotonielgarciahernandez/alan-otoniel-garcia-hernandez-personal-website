// App.tsx
// Base component used in all pages.

// Import React useState hook.
import { useState } from 'react';

// Import React Router components.
import { Outlet } from 'react-router';

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Button, Container, Offcanvas, Stack } from 'react-bootstrap';

// Import custom components.
import { AppNavbar } from './components/AppNavbar';

export const App = () =>
{
  // State to control the visibility of the mobile navigation offcanvas.
  const [ showMobileNav, setShowMobileNav ] = useState( false );

  // Translation hook to read and change the active language.
  const { i18n } = useTranslation();

  // Toggle between the two supported languages.
  const toggleLanguage = () =>
  {
    const nextLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en';

    i18n.changeLanguage( nextLanguage );
  }

  return (
    <>
      { /* Stack content horizontally */ }
      <Stack
        direction='horizontal'
        className='align-items-stretch'
      >
        { /* Desktop navbar on the left. */ }
        <Container
          className='d-none d-lg-flex flex-column rounded-end-4 bg-body-tertiary position-sticky top-0 vh-100 overflow-auto p-3 w-auto'
        >
          <AppNavbar />
        </Container>

        { /* Content on the right. */ }
        <Container
          className='bg-body-secondary rounded-5 m-3 m-lg-5 p-5 position-relative'
          fluid
        >
          { /* Floating translate button. */ }
          <Button
            variant='dark'
            className='position-absolute top-0 end-0 m-3'
            onClick={ toggleLanguage }
          >
            <i className='bi bi-translate me-2' />
            { i18n.resolvedLanguage === 'en' ? 'EN' : 'ES' }
          </Button>

          { /* Mobile menu trigger. */ }
          <div className='d-lg-none mb-3'>
            <Button
              variant='outline-light'
              onClick={ () => setShowMobileNav( true ) }
            >
              <i className='bi bi-list fs-5' />
            </Button>
          </div>

          { /* Main content. */ }
          <Outlet />
        </Container>
      </Stack>

        { /* Mobile navigation offcanvas. */ }
        <Offcanvas
          show={ showMobileNav }
          onHide={ () => setShowMobileNav( false ) }
          placement='start'
          className='bg-body-tertiary d-lg-none'
        >
          <Offcanvas.Header closeButton />
          
          <Offcanvas.Body>
            { /* Mobile navigation component. */ }
            <AppNavbar onNavigate={ () => setShowMobileNav( false ) } />
          </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}
