import React, { useEffect } from 'react';
import ImageGallery from './ImageGallery';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll while modal is active
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const {
    title,
    organization,
    year,
    category,
    description,
    problem,
    solution,
    impact,
    features = [],
    technologies = [],
    images = [],
    githubUrl,
    liveUrl,
    status = 'Private / OJT Project',
  } = project;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close Case Study"
        >
          &times;
        </button>

        <div className="modal__body">
          <div className="modal__category">{category}</div>
          <h2 id="case-study-title" className="modal__title">
            {title}
          </h2>
          <div className="modal__org">{organization}</div>
          <div className="modal__year">{year}</div>

          {/* Screenshots Gallery */}
          <div className="modal__section">
            <h3 className="modal__section-title">Screenshots</h3>
            <ImageGallery images={images} projectTitle={title} />
          </div>

          {/* Project Overview */}
          <div className="modal__section">
            <h3 className="modal__section-title">Project Overview</h3>
            <p>{description}</p>
          </div>

          {/* The Problem */}
          <div className="modal__section">
            <h3 className="modal__section-title">The Problem</h3>
            <p>{problem}</p>
          </div>

          {/* The Solution */}
          <div className="modal__section">
            <h3 className="modal__section-title">The Solution</h3>
            <p>{solution}</p>
          </div>

          {/* Key Features */}
          {features && features.length > 0 && (
            <div className="modal__section">
              <h3 className="modal__section-title">Key Features</h3>
              <div className="modal__features">
                {features.map((feature, idx) => (
                  <div key={idx} className="modal__feature">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          {impact && (
            <div className="modal__section">
              <h3 className="modal__section-title">Impact & Results</h3>
              <p>{impact}</p>
            </div>
          )}

          {/* Technologies Used (only if populated) */}
          {technologies && technologies.length > 0 && (
            <div className="modal__section">
              <h3 className="modal__section-title">Technologies Used</h3>
              <div className="project-card__techs">
                {technologies.map((tech, idx) => (
                  <span key={idx} className="badge badge--neutral">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Status & External Links */}
          <div className="modal__section">
            <h3 className="modal__section-title">Project Status & Links</h3>
            <div className="modal__status">{status}</div>

            {(githubUrl || liveUrl) && (
              <div className="modal__links">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary btn--small"
                  >
                    View GitHub Repository
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--small"
                  >
                    View Live Deployment
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
