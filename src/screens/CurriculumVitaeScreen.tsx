// CurriculumVitaeScreen.tsx
// The curriculum vitae screen of the app.

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React hooks.
import { useEffect, useState } from 'react';

// Import React Bootstrap components.
import { Table } from 'react-bootstrap';

// Import types.
import type { EducationSchool, FreelanceExperience, CertifiedCourse, PortfolioProject, CurriculumVitaeContent } from '../models';

// Empty curriculum vitae content to use as initial state before loading the actual content.
const emptyCurriculumVitaeContent: CurriculumVitaeContent =
{
    education:
    {
        title: '',
        schools: []
    },
    freelanceExperience:
    {
        title: '',
        experiences: []
    },
    certifiedCourses:
    {
        title: '',
        courses: []
    },
    interests:
    {
        title: '',
        description: ''
    },
    abilities:
    {
        title: '',
        list: []
    },
    portfolioProjects:
    {
        title: '',
        projects: []
    }
};


export const CurriculumVitaeScreen = () =>
{
    // Translation hook to read the current active language.
    const { i18n } = useTranslation();

    // State to hold the curriculum vitae content loaded from the public folder at runtime.
    const [ curriculumVitae, setCurriculumVitae ] = useState< CurriculumVitaeContent >( emptyCurriculumVitaeContent );

    useEffect(
        () =>
        {
            // AbortController to cancel the fetch request if the component unmounts or if the language changes before the request completes.
            const controller = new AbortController();

            const loadCurriculumVitae = async () =>
            {
                // The curriculum vitae content is stored in a JSON file in the public folder, with a separate file for each supported language.
                // The file is loaded at runtime based on the current active language.
                const localizedPath = `/locale/${ i18n.resolvedLanguage }/CurriculumVitae.json`;

                // Fetch the curriculum vitae content from the public folder.
                const response = await fetch(
                    localizedPath,
                    { signal: controller.signal }
                );

                // If the response is not OK, return.
                if ( !response.ok ) return;

                // Parse the response as JSON and set the curriculum vitae state with the loaded content.
                const content = await response.json() as CurriculumVitaeContent;

                // Save the loaded content to the curriculum vitae state.
                setCurriculumVitae( content );
            };

            void loadCurriculumVitae();

            return () => controller.abort();
        },
        [ i18n.language ]
    );


    return (
        <Table className='table-transparent'>
            <tbody>
                { /* Education Section */ }
                <tr>
                    <th>{ curriculumVitae.education.title }</th>

                    <td>
                        { /* Map over the education data to create education entries. */ }
                        {
                            curriculumVitae.education.schools.map(
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
                    <th>{ curriculumVitae.freelanceExperience.title }</th>

                    <td>
                        { /* Map over the freelance experience data to create experience entries. */ }
                        {
                            curriculumVitae.freelanceExperience.experiences.map(
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
                    <th>{ curriculumVitae.certifiedCourses.title }</th>

                    <td>
                        { /* Map over the certified courses data to create course entries. */ }
                        {
                            curriculumVitae.certifiedCourses.courses.map(
                                ( course: CertifiedCourse, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ course.name }</span><br />

                                        <span>{ course.instructor }</span><br />
                                        
                                        <span>{ course.period }</span><br />
                                        
                                        <a
                                            href={ course.link }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            { course.link }
                                        </a>
                                    </div>
                            )
                        }
                    </td>
                </tr>
                
                { /* Interests Section */ }
                <tr>
                    <th>{ curriculumVitae.interests.title }</th>

                    <td>
                        <b>{ curriculumVitae.interests.description }</b>
                    </td>
                </tr>
                
                { /* Abilities Section */ }
                <tr>
                    <th>{ curriculumVitae.abilities.title }</th>

                    <td>
                        { /* Map over the abilities data to create ability entries. */ }
                        {
                            curriculumVitae.abilities.list.map(
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
                    <th>{ curriculumVitae.portfolioProjects.title }</th>

                    <td>
                        {
                            curriculumVitae.portfolioProjects.projects.map(
                                ( project: PortfolioProject, index: number ) =>
                                    <div
                                        key={ index }
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{ project.name }</span><br />

                                        <span className='fw-bold'>{ project.technologies }</span><br />

                                        <a
                                            href={ project.link }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            { project.link }
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
