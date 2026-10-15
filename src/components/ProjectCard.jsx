import React from 'react';

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const {
    title,
    organization,
    year,
    category,
    description,
    technologies = [],
    images = [],
    githubUrl,
    liveUrl,
    status = 'Private / OJT Project',
  } = project;

  const coverImage = images && images.length > 0 ? images[0] : null;
  const coverSrc = typeof coverImage === 'string' ? coverImage : coverImage?.src || coverImage?.url;

  return (
    <article className="project-card">
      <div className="project-card__image-wrapper">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={`${title} Preview`}
            className="project-card__image"
            loading="lazy"
          />
        ) : (
          <div className="project-card__placeholder">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>{title}</span>
            <small style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              Sanitized Screenshots Ready
            </small>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <div className="project-card__category">{category}</div>
        <h3 className="project-card__title">{title}</h3>
        <div className="project-card__org">{organization}</div>
        <div className="project-card__year">{year}</div>

        <p className="project-card__desc">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="project-card__techs">
            {technologies.map((tech, index) => (
              <span key={index} className="badge badge--neutral">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__footer">
          <button
            type="button"
            className="btn btn--primary btn--small"
            onClick={() => onOpenCaseStudy(project)}
            aria-label={`View Case Study for ${title}`}
          >
            View Project
          </button>

          {/* Conditional Repo/Live Links only if provided */}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--small"
            >
              GitHub
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--small"
            >
              Live Demo
            </a>
          )}

          {!githubUrl && !liveUrl && (
            <span className="project-card__status">{status}</span>
          )}
        </div>
      </div>
    </article>
  );
}
