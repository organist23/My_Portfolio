import React, { useState, useEffect } from 'react';

// Auto-detect any certificate images placed in src/assets/certifications/
const certModules = import.meta.glob('/src/assets/certifications/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Helper to find matching image by keyword or path
function findCertImage(keywords) {
  for (const [path, url] of Object.entries(certModules)) {
    const lowerPath = path.toLowerCase();
    if (keywords.some((kw) => lowerPath.includes(kw.toLowerCase()))) {
      return url;
    }
  }
  return null;
}

const CERTIFICATIONS = [
  {
    id: 'opswat',
    title: 'OPSWAT Academy Certification',
    date: 'April 2025',
    issuer: 'OPSWAT Academy',
    // Either auto-matches any file containing 'opswat' in src/assets/certifications/ or you can import directly
    image: findCertImage(['opswat']),
  },
  {
    id: 'fortigate',
    title: 'FCA – FortiGate 7.4 Operator',
    date: 'November 2025',
    issuer: 'Fortinet',
    image: findCertImage(['fortigate', 'fca', '7.4']),
  },
  {
    id: 'fortinet-cybersecurity',
    title: 'Fortinet Certified Associate in Cybersecurity',
    date: 'March 2025',
    issuer: 'Fortinet',
    image: findCertImage(['cybersecurity', 'associate', 'fortinet-cert']),
  },
];

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeCert]);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Certifications</h2>
          <p className="section__subtitle">
            Professional credentials in cybersecurity and network security infrastructure.
          </p>
        </div>

        <div className="certs__grid">
          {CERTIFICATIONS.map((cert) => {
            const { id, title, date, issuer, image } = cert;
            return (
              <div
                key={id}
                className={`cert-card ${image ? 'cert-card--has-image' : ''}`}
                onClick={() => image && setActiveCert(cert)}
                role={image ? 'button' : undefined}
                tabIndex={image ? 0 : undefined}
                onKeyDown={(e) => {
                  if (image && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setActiveCert(cert);
                  }
                }}
                aria-label={image ? `View ${title} certificate` : undefined}
              >
                {image ? (
                  <div className="cert-card__preview-wrapper">
                    <img
                      src={image}
                      alt={`${title} Certificate`}
                      className="cert-card__preview-image"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="cert-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                )}

                <div className="cert-card__content">
                  <h3 className="cert-card__title">{title}</h3>
                  <div className="cert-card__date">{date} • {issuer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal for Certificates */}
      {activeCert && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCert.title} fullscreen preview`}
          onClick={() => setActiveCert(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCert(null);
            }}
            aria-label="Close certificate preview"
          >
            &times;
          </button>

          <div className="lightbox__cert-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeCert.image}
              alt={`${activeCert.title} Full Credential`}
              className="lightbox__image"
            />
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{activeCert.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                {activeCert.date} • {activeCert.issuer}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
