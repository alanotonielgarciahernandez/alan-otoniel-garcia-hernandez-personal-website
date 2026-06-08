// CurriculumVitaeTypes.ts
// Curriculum Vitae type definitions for the project.

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
