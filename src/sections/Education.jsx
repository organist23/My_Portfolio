import React from 'react';

const EDUCATION_HISTORY = [
  {
    school: 'Nueva Vizcaya State University – Bambang Campus',
    degree: 'Bachelor of Science in Information Technology',
    major: 'Major in Web and Mobile Application Development',
    period: 'September 2019 – July 2026',
  },
  {
    school: 'Munguia National High School',
    degree: 'Junior & Senior High School',
    major: 'General Academic Strand (GAS)',
    period: 'June 2013 – April 2019',
  },
];

export default function Education() {
  return (
    <section id="education" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Education</h2>
          <p className="section__subtitle">
            Academic foundation and specialized coursework in software engineering and web/mobile development.
          </p>
        </div>

        <div className="education__timeline">
          {EDUCATION_HISTORY.map(({ school, degree, major, period }, idx) => (
            <div key={idx} className="education__item">
              <h3 className="education__school">{school}</h3>
              <div className="education__degree">{degree}</div>
              <div className="education__major">{major}</div>
              <div className="education__dates">{period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
