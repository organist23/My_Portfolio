import React from 'react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js'],
  },
  {
    title: 'Database & Backend Services',
    skills: ['MySQL', 'Supabase', 'Convex'],
  },
  {
    title: 'Desktop Development',
    skills: ['Electron.js'],
  },
  {
    title: 'Other Technical Skills',
    skills: [
      'UI/UX Development',
      'AI-Assisted Development',
      'Database Management',
      'Canva Graphic Design',
    ],
  },
  {
    title: 'Productivity',
    skills: ['Microsoft Word', 'Microsoft Excel'],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Technical Skills</h2>
          <p className="section__subtitle">
            Core technologies, development tools, and platforms utilized for building web, mobile, and desktop applications.
          </p>
        </div>

        <div className="techstack__grid">
          {SKILL_CATEGORIES.map(({ title, skills }) => (
            <div key={title} className="techstack__category">
              <h3 className="techstack__category-title">{title}</h3>
              <div className="techstack__items">
                {skills.map((skill) => (
                  <span key={skill} className="techstack__item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
