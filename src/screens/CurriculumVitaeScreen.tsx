// CurriculumVitaeScreen.tsx
// The curriculum vitae screen of the app.

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { Table } from 'react-bootstrap';

// Import Certified Courses links data.
import { certifiedCoursesLinks } from '../data/CertifiedCourses';

// Import Portfolio Projects links data.
import { portfolioProjectsLinks } from '../data/PortfolioProjects';

// Import types.
import type { CertifiedCourse, EducationSchool, FreelanceExperience, PortfolioProject } from '../models/Types';

export const CurriculumVitaeScreen = () =>
{
    // Translation hook to get the translation function for the current language.
    const { t } = useTranslation();

    // Education data from translation array.
    const education = t( 'cv.education.schools', { returnObjects: true } ) as EducationSchool[];

    // Freelance Experience data from translation array.
    const freelanceExperience = t( 'cv.freelanceExperience.experiences', { returnObjects: true } ) as FreelanceExperience[];

    // Certified Courses data from translation array.
    const certifiedCourses = t( 'cv.certifiedCourses.courses', { returnObjects: true } ) as CertifiedCourse[];

    // Abilities data from translation array.
    const abilities = t( 'cv.abilities.list', { returnObjects: true } ) as string[];

    // Portfolio Projects data from translation array.
    const portfolioProjects = t( 'cv.portfolioProjects.projects', { returnObjects: true } ) as PortfolioProject[];

    return (
        <Table className='table-transparent'>
            <tbody>
                { /* Education Section */ }
                <tr>
                    <th>{ t( 'cv.education.title' ) }</th>

                    <td>
                        { /* Map over the education data to create education entries. */ }
                        {
                            education.map(
                                ( school: EducationSchool, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ school.name }</span><br />

                                        <span>{ school.location }</span><br />

                                        <span className='fw-bold'>{ school.degree }</span><br />

                                        <span>{ school.period }</span>
                                    </div>
                            )
                        }
                    </td>
                </tr>
                
                { /* Freelance Experience Section */ }
                <tr>
                    <th>{ t( 'cv.freelanceExperience.title' ) }</th>

                    <td>
                        { /* Map over the freelance experience data to create experience entries. */ }
                        {
                            freelanceExperience.map(
                                ( experience: FreelanceExperience, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ experience.role }</span><br />

                                        <span className='fw-bold'>{ experience.technologies }</span><br />

                                        <span>{ experience.period }</span><br />

                                        <span className='fw-bold'>{ experience.company }, </span>

                                        <span>{ experience.bossName }</span>
                                    </div>
                            )
                        }
                    </td>
                </tr>
                
                { /* Certified Courses Section */ }
                <tr>
                    <th>{ t( 'cv.certifiedCourses.title' ) }</th>

                    <td>
                        { /* Map over the certified courses data to create course entries. */ }
                        {
                            certifiedCourses.map(
                                ( course: CertifiedCourse, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ course.name }</span><br />

                                        <span>{ course.instructor }</span><br />
                                        
                                        <span>{ course.period }</span><br />
                                        
                                        <a
                                            href={ certifiedCoursesLinks[ index ] }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            { certifiedCoursesLinks[ index ] }
                                        </a>
                                    </div>
                            )
                        }
                    </td>
                </tr>
                
                { /* Interests Section */ }
                <tr>
                    <th>{ t( 'cv.interests.title' ) }</th>

                    <td>
                        <b>{ t( 'cv.interests.description' ) }</b>
                    </td>
                </tr>
                
                { /* Abilities Section */ }
                <tr>
                    <th>{ t( 'cv.abilities.title' ) }</th>

                    <td>
                        { /* Map over the abilities data to create ability entries. */ }
                        {
                            abilities.map(
                                ( ability: string, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span>{ ability }</span>
                                    </div>
                            )
                        }
                    </td>
                </tr>

                { /* Portfolio Projects Section */ }
                <tr>
                    <th>{ t( 'cv.portfolioProjects.title' ) }</th>

                    <td>
                        {
                        portfolioProjects.map(
                                ( project: PortfolioProject, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ project.name }</span><br />

                                        <span className='fw-bold'>{ project.technologies }</span><br />

                                        <a
                                            href={ portfolioProjectsLinks[ index ] }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            { portfolioProjectsLinks[ index ] }
                                        </a><br />
                                        
                                        { project.description }<br />
                                    </div>
                            )
                        }
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}
