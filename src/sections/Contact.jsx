import React, { useState } from 'react';

// Real URLs can be added here when provided by Keiphil
const SOCIAL_LINKS = {
  github: null, // e.g. "https://github.com/..."
  linkedin: null, // e.g. "https://linkedin.com/in/..."
};

const LANGUAGES = ['Tagalog', 'Ilocano', 'English'];
const EMAIL_ADDRESS = 'guimbakeiphil23@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Direct Email Launcher
  const handleEmailClick = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    } else {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `mailto:${EMAIL_ADDRESS}`;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 1000);

      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__intro">
            <h2 className="section__title">Let's Build Something Useful</h2>
            <p className="contact__text">
              I'm open to opportunities where I can contribute my development skills, learn from experienced teams, and build practical software solutions.
            </p>

            <div className="contact__languages">
              <div className="contact__languages-title">Languages</div>
              <div className="contact__languages-list">
                {LANGUAGES.map((lang) => (
                  <span key={lang} className="badge badge--neutral">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="contact__details">
            <div className="contact__items">
              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="contact__item-label">Email</div>
                  <div className="contact__item-value">
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      onClick={handleEmailClick}
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="contact__item-label">Phone</div>
                  <div className="contact__item-value">
                    <a href="tel:+639109634202">+63 910 963 4202</a>
                  </div>
                </div>
              </div>

              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="contact__item-label">Location</div>
                  <div className="contact__item-value">
                    Inaban, Dupax Del Norte, Nueva Vizcaya
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="contact__socials">
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="btn btn--primary btn--small"
                onClick={handleEmailClick}
              >
                Send Direct Email
              </a>

              {/* Copy Email Button beside Send Direct Email */}
              <button
                type="button"
                className="btn btn--secondary btn--small"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Email
                  </>
                )}
              </button>

              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                >
                  GitHub
                </a>
              )}

              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
