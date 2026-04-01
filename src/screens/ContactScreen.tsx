// ContactScreen.tsx
// The contact screen of the app.

import { useEffect, useRef, useState } from 'react';

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Button, Card, Stack } from 'react-bootstrap';

// Import global data.
import { globalData } from '../data/Global';

// Import social links data.
import { socialLinks } from '../data/SocialMedia';

// Import contact topics data.
import { contactTopicIcons } from '../data/ContactInformation';

// Import types.
import type { ContactTopic, SocialLink } from '../models/Types';
    
export const ContactScreen = () =>
{
    // State to change the copy button text when the email is copied to clipboard.
    const [ isCopied, setIsCopied ] = useState( false );

    // Ref to reset the copy button text after a delay when the email is copied to clipboard.
    const copiedTimeoutRef = useRef< number | null >( null );

    // Cleanup timeout on component unmount to prevent memory leaks.
    useEffect( () =>
    {
        return () =>
        {
            if ( copiedTimeoutRef.current !== null )
            {
                window.clearTimeout( copiedTimeoutRef.current );
            }
        }
    }, [] );

    // Copy email to clipboard function.
    const copyEmailToClipboard = () =>
    {
        navigator.clipboard.writeText( globalData.contactMail );
        setIsCopied( true );

        if ( copiedTimeoutRef.current !== null )
        {
            window.clearTimeout( copiedTimeoutRef.current );
        }

        copiedTimeoutRef.current = window.setTimeout(
            () => setIsCopied( false ),
            2000
        );
    }

    // Translation hook to get the translation function for the current language.
    const { t } = useTranslation();

    // Contact topics data from translation array.
    const contactTopics = t( 'contact.contactTopics.topics', { returnObjects: true } ) as ContactTopic[];

    return (
        <Stack gap={ 5 } >
            { /* Header section with title and description. */ }
            <Stack gap={ 2 } >
                <span className='fs-1'>{ t( 'contact.title' ) }</span>

                <span className='fs-5'>
                    { t( 'contact.description' ) }
                </span>
            </Stack>

            { /* Availability section. */ }
            <section>
                <span className='fs-2'>{ t( 'contact.availability.title' ) }</span>

                <hr className='mb-5' />
                
                <Stack
                    className='flex-wrap align-items-stretch'
                    direction='horizontal'
                    gap={ 4 }
                >
                    { /* Availability description. */ }
                    <Card
                        className='rounded-4 p-3'
                        style={ { maxWidth: '20rem' } }
                    >
                        <Card.Title>
                            <i className={ 'bi bi-lightning-charge-fill fs-2 mb-3' } />
                        </Card.Title>

                        <Card.Body>
                            <Card.Subtitle className='fs-5 fw-bold'>
                                { t( 'contact.availability.description' ) }
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>

                    { /* Time zone information. */ }
                    <Card
                        className='rounded-4 p-3'
                        style={ { maxWidth: '20rem' } }
                    >
                        <Card.Title>
                            <i className={ 'bi bi-clock-fill fs-2' } />
                        </Card.Title>

                        <Card.Body>
                            <Card.Subtitle className='fs-5 fw-bold'>
                                { t( 'contact.availability.timeZone.title' ) }
                            </Card.Subtitle>

                            <Card.Text className='m-3'>
                                { t( 'contact.availability.timeZone.description' ) }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Stack>
            </section>

            { /* Contact topics section. */ }
            <section>
                <span className='fs-2'>{ t( 'contact.contactTopics.title' ) }</span>

                <hr className='mb-5' />

                <Stack
                    className='flex-wrap align-items-stretch'
                    direction='horizontal'
                    gap={ 4 }
                >
                    { /* Map over the contact topics data to create topic entries. */ }
                    {
                        contactTopics.map(
                            ( topic: ContactTopic, index: number ) =>
                                <Card
                                    key={ index }
                                    className='border rounded-4 p-3'
                                    style={ { maxWidth: '20rem' } }
                                >
                                    <Card.Title>
                                        <i className={ `bi ${ contactTopicIcons[ index ] } fs-2` } />
                                    </Card.Title>

                                    <Card.Body>
                                        <Card.Subtitle className='fs-5 fw-bold'>
                                            { topic.name }
                                        </Card.Subtitle>

                                        <Card.Text className='m-3'>
                                            { topic.description }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                        )
                    }
                </Stack>
            </section>

            { /* Contact information section. */ }
            <section>
                <span className='fs-2'>{ t( 'contact.contactInfo.title' ) }</span>

                <hr className='mb-5' />
                
                <Stack
                    className='flex-wrap align-items-stretch'
                    direction='horizontal'
                    gap={ 4 }
                >
                    { /* Email contact information. */ }
                    <Card
                        className='rounded-4 p-3'
                        style={ { maxWidth: '30rem' } }
                    >
                        <Card.Title>
                            <i className={ 'bi bi-envelope-fill fs-2 mb-3' } />
                        </Card.Title>

                        <Card.Body>
                            <Card.Subtitle className='fs-5 fw-bold'>
                                { t( 'contact.contactInfo.email.title' ) }
                            </Card.Subtitle>

                            <Card.Text className='m-3'>
                                { t( 'contact.contactInfo.email.description' ) }
                            </Card.Text>
                        </Card.Body>

                        <Card.Footer className='bg-transparent border-0'>
                            { /* Buttons section */ }
                            <Stack
                                className='flex-wrap'
                                direction='horizontal'
                                gap={ 2 }
                            >
                                { /* Send email button */ }
                                <Button
                                    variant='outline-light'
                                    href={ `mailto:${ globalData.contactMail }` }
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <i className={ `bi bi-send-fill me-2` } />

                                    { t( 'contact.contactInfo.email.sendButtonText' ) }
                                </Button>

                                { /* Copy email button */ }
                                <Button
                                    variant='outline-light'
                                    onClick={ copyEmailToClipboard }
                                >
                                    <i className={ `bi bi-clipboard-fill me-2` } />
                                    {
                                        isCopied ?
                                        <span>Copied!</span>
                                        : <span>{ t( 'contact.contactInfo.email.copyButtonText' ) }</span>
                                    }
                                </Button>
                            </Stack>
                        </Card.Footer>
                    </Card>

                    { /* Social media contact information. */ }
                    <Card
                        className='rounded-4 p-3'
                        style={ { maxWidth: '30rem' } }
                    >
                        <Card.Title>
                            <i className={ 'bi bi-phone-fill fs-2 mb-3' } />
                        </Card.Title>

                        <Card.Body className='d-flex flex-column'>
                            <Card.Subtitle className='fs-5 fw-bold'>
                                { t( 'contact.contactInfo.socialMedia.title' ) }
                            </Card.Subtitle>

                            <Card.Text className='m-3'>
                                { t( 'contact.contactInfo.socialMedia.description' ) }
                            </Card.Text>
                        </Card.Body>

                        <Card.Footer className='bg-transparent border-0'>
                            { /* Buttons section */ }
                            <Stack
                                className='flex-wrap'
                                direction='horizontal'
                                gap={ 2 }
                            >
                                { /* Map over the social links data to create link elements. */ }
                                { socialLinks.map(
                                    ( socialLink: SocialLink, index: number ) =>
                                        <Button
                                            key={ index }
                                            variant='outline-light'
                                            href={ socialLink.href }
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            <i className={ `bi ${ socialLink.icon } me-2` } />
                                            { socialLink.name }
                                        </Button>
                                    )
                                }
                            </Stack>
                        </Card.Footer>
                    </Card>
                </Stack>
            </section>
        </Stack>
    )
}
