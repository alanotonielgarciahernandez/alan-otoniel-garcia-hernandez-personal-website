// HomeScreen.tsx
// The home screen of the app.

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Router navigate function.
import { useNavigate } from 'react-router-dom';

// Import React Bootstrap components.
import { Badge, Button, Card, Image, Stack } from 'react-bootstrap';

// Import project links data.
import { portfolioProjectsLinks } from '../data/PortfolioProjects';

// Import social links data.
import { socialLinks } from '../data/SocialMedia';

// Import types.
import type { PortfolioProject, SocialLink } from '../models';


export const HomeScreen = () =>
{
    // React Router navigate function to change routes programmatically.
    const navigate = useNavigate();

    // Translation hook to get the translation function for the current language.
    const { t } = useTranslation();

    // Portfolio Projects data from translation array.
    const portfolioProjects = t( 'cv.portfolioProjects.projects', { returnObjects: true } ) as PortfolioProject[];

    return (
        <Stack
            gap={ 5 }
        >
            { /* Large Signature at the top. */ }
            <Image
                className='d-none d-md-flex'
                src='/signature.svg'
                alt='Alan Otoniel Garcia Hernandez'
            />

            { /* Small Signature at the top. */ }
            <Image
                className='d-flex d-md-none'
                src='/signature-square.svg'
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
                            src='/pfp.jpg'
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
                    {
                        portfolioProjects.map( 
                            ( project: PortfolioProject, index: number ) =>
                                <Card
                                    key={ index }
                                    as='a'
                                    href={ portfolioProjectsLinks[ index ] }
                                    target='_blank'
                                    rel='noreferrer'
                                    className='hover-lift-card bg-body-tertiary border border-secondary-subtle rounded-4 shadow-sm text-decoration-none'
                                    style={ { maxWidth: '24rem' } }
                                >
                                    <Card.Body>
                                        <Card.Title>{ project.name }</Card.Title>

                                        <Card.Text className='mb-3'>
                                            { project.description }
                                        </Card.Text>

                                        <Badge
                                            className='text-wrap'
                                            bg='secondary'
                                        >
                                            { project.technologies }
                                        </Badge>
                                    </Card.Body>
                                </Card>
                        )
                    }
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
