// HomeScreen.tsx
// The home screen of the app.

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React hooks.
import { useEffect, useState } from 'react';

// Import React Router navigate function.
import { useNavigate } from 'react-router-dom';

// Import React Bootstrap components.
import { Badge, Button, Card, Image, Stack } from 'react-bootstrap';

// Import social links data.
import { socialLinks } from '../data/SocialMedia';

// Import types.
import type { PortfolioProject, SocialLink } from '../models';


export const HomeScreen = () =>
{
    // React Router navigate function to change routes programmatically.
    const navigate = useNavigate();

    // Translation hook to read the current active language.
    const { t } = useTranslation();

    // State to hold the featured projects content loaded from the public folder at runtime.
    const [ featuredProjects, setFeaturedProjects ] = useState< PortfolioProject[] >( [] );

    useEffect(
        () =>
        {
            // AbortController to cancel the fetch request if the component unmounts or if the language changes before the request completes.
            const controller = new AbortController();

            const loadFeaturedProjects = async () =>
            {
                // Fetch the featured projects content from the public folder.
                const response = await fetch(
                    '/FeaturedProjects.json',
                    { signal: controller.signal }
                );

                // If the response is not OK, return.
                if ( !response.ok ) return;

                // Parse the response as JSON and set the featured projects state with the loaded content.
                const projects = await response.json() as PortfolioProject[];

                // Save the loaded content to the featured projects state.
                setFeaturedProjects( projects );
            };

            void loadFeaturedProjects();

            return () => controller.abort();
        },
        []
    );

    return (
        <Stack
            gap={ 5 }
        >
            { /* Large Signature at the top. */ }
            <Image
                className='d-none d-md-flex'
                src='/icons/signature.svg'
                alt='Alan Otoniel Garcia Hernandez'
            />

            { /* Small Signature at the top. */ }
            <Image
                className='d-flex d-md-none'
                src='/icons/signature-square.svg'
                alt='Alan Otoniel Garcia Hernandez'
            />
            
            { /* Presentation section. */ }
            <Stack
                className='align-items-center justify-content-center flex-wrap'
                direction='horizontal'
                gap={ 3 }
            >
                { /* Profile picture card. */ }
                <Card
                    className='bg-body-tertiary border border-secondary-subtle rounded-4 shadow-sm'
                    style={ { maxWidth: '250px' } }
                >
                    <Card.Body className='p-3'>
                        <Image
                            className='w-100'
                            src='/images/pfp.jpg'
                            alt='Profile Picture'
                            fluid
                            rounded
                        />
                    </Card.Body>
                </Card>

                { /* Introduction text card. */ }
                <Card className='bg-body-tertiary border border-secondary-subtle rounded-4 shadow-sm p-2'>
                    <Card.Body>
                        <span
                            className='fs-5'
                            style={ { whiteSpace: 'pre-line' } }
                        >
                            { t( 'home.presentation' ) }
                        </span>
                    </Card.Body>
                </Card>
            </Stack>

            { /* What I do section. */ }
            <Card className='bg-body-tertiary border border-secondary-subtle rounded-4 shadow-sm p-2'>
                <Card.Body>
                    <Card.Title className='fs-4' >
                        { t( 'home.whatIDo.title' ) }
                    </Card.Title>

                    <span className='text-body'>{ t( 'home.whatIDo.description' ) }</span>
                </Card.Body>
            </Card>

            { /* Quick actions section. */ }
            <Stack
                className='flex-wrap justify-content-center'
                direction='horizontal'
                gap={ 3 }
            >
                <Button
                    variant='outline-light'
                    size='lg'
                    onClick={ () => navigate( 'cv' ) }
                >
                    { t( 'home.quickActions.viewCv' ) }
                </Button>
                <Button
                    variant='light'
                    size='lg'
                    onClick={ () => navigate( 'contact' ) }
                >
                    { t( 'home.quickActions.contactMe' ) }
                </Button>
            </Stack>

            { /* Featured projects section. */ }
            <section>
                <h2 className='h4 mb-3'>
                    { t( 'home.featuredProjects.title' ) }
                </h2>

                <Stack
                    className='flex-wrap'
                    direction='horizontal'
                    gap={ 3 }
                >
                    { /* Map over the featured projects data to create project cards. */ }
                    { featuredProjects.map( ( project, index: number ) => (
                        <Card
                            key={ index }
                            as='a'
                            href={ project.link }
                            target='_blank'
                            rel='noreferrer'
                            className='hover-lift-card bg-body-tertiary border border-secondary-subtle rounded-4 shadow-sm text-decoration-none'
                            style={ { maxWidth: '24rem' } }
                        >
                            <Card.Img src={ project.image } />
                            <Card.ImgOverlay>
                                <Badge
                                    className='text-wrap'
                                    bg='dark'
                                >
                                    { project.technologies }
                                </Badge>
                            </Card.ImgOverlay>
                        </Card>
                    ) ) }
                </Stack>
            </section>

            { /* Social links section. */ }
            <section>
                <h2 className='h4 mb-3'>{ t( 'home.social.title' ) }</h2>
                
                { /* Social media links section. */ }
                <Stack
                    className='flex-wrap'
                    direction='horizontal'
                    gap={ 2 }
                >
                    { /* Map over the social links data to create link elements. */ }
                    {
                        socialLinks.map(
                            ( socialLink: SocialLink, index: number ) =>
                                <Button
                                    key={ index }
                                    variant='outline-light'
                                    href={ socialLink.href }
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <i
                                        className={ `bi ${ socialLink.icon } me-2` }
                                    />
                                    
                                    { socialLink.name }
                                </Button>
                        )
                    }
                </Stack>
            </section>
        </Stack>
    )
}
