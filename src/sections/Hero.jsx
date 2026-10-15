/* UI UPGRADE: Clean Hero Section with Dynamic Role Rotator and Professional Typography */
import React, { useState, useEffect } from 'react';

// Use Vite's glob import to detect profile.jpg if present without breaking Vite build if absent
const profileModules = import.meta.glob('/src/assets/profile/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const detectedProfileImage =
  profileModules['/src/assets/profile/profile.jpg'] ||
  profileModules['/src/assets/profile/profile.png'] ||
  null;

// Detect resume PDF in src/assets/resume/ if placed there
const resumeModules = import.meta.glob('/src/assets/resume/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

const bundledResume =
  resumeModules['/src/assets/resume/Keiphil_Protacio_Guimba_Resume.pdf'] ||
  Object.values(resumeModules)[0] ||
  null;

const ROLES = [
  'Web & Mobile Application Developer',
  'Information Technology Graduate',
  'Full-Stack System Developer',
  'Practical Digital Solutions Builder',
];

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Works with either src/assets/resume/ (via Vite bundle) or public/assets/resume/ (static URL)
  const resumeUrl = bundledResume || '/assets/resume/Keiphil_Protacio_Guimba_Resume.pdf';

  // UI UPGRADE: Smooth typing & rotating effect for Hero role headline
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const handleResumeClick = () => {
    // If the PDF file has not yet been placed by the user, provide a clear friendly notification
    fetch(resumeUrl, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          alert('Resume PDF is currently being finalized. Please contact guimbakeiphil23@gmail.com directly for an updated copy.');
        }
      })
      .catch(() => {
        // Continue standard link behavior
      });
  };

  return (
    <header id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__name">Keiphil Protacio Guimba</h1>

          {/* UI UPGRADE: Dynamic role typewriter headline with clean typography */}
          <div className="hero__role-wrapper" aria-label="Professional Roles">
            <span className="hero__role">{displayedText}</span>
            <span className="hero__cursor" aria-hidden="true"></span>
          </div>

          <p className="hero__statement">
            I build practical digital systems that transform manual processes into efficient, accessible, and user-friendly solutions.
          </p>

          <p className="hero__supporting">
            Information Technology graduate specializing in Web and Mobile Application Development, with hands-on experience developing practical digital systems during OJT.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View My Projects
            </a>
            <a
              href={resumeUrl}
              download="Keiphil_Protacio_Guimba_Resume.pdf"
              className="btn btn--secondary"
              onClick={handleResumeClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Clean, authentic avatar frame */}
        <div className="hero__image-wrapper">
          <div className="hero__avatar-container">
            {detectedProfileImage && !imageError ? (
              <img
                src={detectedProfileImage}
                alt="Keiphil Protacio Guimba"
                className="hero__image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="hero__image-placeholder" aria-label="Profile photo placeholder">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.25rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em' }}>
                    KG
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                    src/assets/profile/profile.jpg
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
