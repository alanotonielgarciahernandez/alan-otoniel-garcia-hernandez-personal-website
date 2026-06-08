// ContactTypes.ts
// Contact type definitions for the project.

// Type for external links data.
export type ExternalLink =
{
    name: string,
    href: string,
}

// Type for social media links data.
export type SocialLink =
{
    name: string,
    href: string,
    icon: string,
}

// Type for contact topics data.
export type ContactTopic =
{
    name: string,
    description: string,
}
