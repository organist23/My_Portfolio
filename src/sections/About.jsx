import React from 'react';

export default function About() {
  const credentials = [
    {
      label: 'Degree',
      value: 'Bachelor of Science in Information Technology',
    },
    {
      label: 'Major',
      value: 'Web and Mobile Application Development',
    },
    {
      label: 'University',
      value: 'Nueva Vizcaya State University – Bambang Campus',
    },
    {
      label: 'Location',
      value: 'Inaban, Dupax Del Norte, Nueva Vizcaya',
    },
  ];

  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">
            Background and experience in building real-world digital applications.
          </p>
        </div>

        <div className="about__content">
          <div className="about__text">
            <p>
              I am an Information Technology graduate specializing in Web and Mobile Application Development. During my OJT experience, I developed practical digital systems designed to improve record management, compliance monitoring, data accessibility, and administrative workflows.
            </p>
            <p>
              My experience includes building systems that transform paper-based and manual processes into searchable, organized, and report-ready digital solutions. I enjoy solving real-world problems through software development, database management, UI/UX design, and modern web technologies.
            </p>
          </div>

          <div className="about__info">
            {credentials.map(({ label, value }, idx) => (
              <div key={idx} className="about__info-item">
                <div className="about__info-label">{label}</div>
                <div className="about__info-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
