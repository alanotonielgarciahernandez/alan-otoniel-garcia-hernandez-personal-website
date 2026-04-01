// Types.ts
// Type definitions for the project.

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

// Type for education schools data.
export type EducationSchool =
{
    name: string,
    location: string
    degree: string
    period: string,
}

// Type for freelance experience data.
export type FreelanceExperience =
{
    role: string,
    technologies: string[],
    period: string,
    company: string,
    bossName: string,
}

// Type for certified courses data.
export type CertifiedCourse =
{
    name: string,
    instructor: string,
    period: string,
    link: string,
}

// Type for portfolio projects data.
export type PortfolioProject =
{
    name: string,
    technologies: string[],
    description: string,
    link: string,
}

// Type for contact topics data.
export type ContactTopic =
{
    name: string,
    description: string,
}
