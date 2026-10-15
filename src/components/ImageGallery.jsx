import React, { useState, useEffect } from 'react';

export default function ImageGallery({ images = [], projectTitle = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset index when images change or modal reopens
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Handle keyboard navigation for lightbox and gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (images.length <= 1) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images, isLightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="gallery__empty" aria-label="No screenshots uploaded yet">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
          Screenshots Pending Sanitization
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: '340px' }}>
          Place sanitized screenshots in the corresponding project folder and register them in <code>projects.js</code>.
        </p>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const imgSrc = typeof currentImage === 'string' ? currentImage : currentImage.src || currentImage.url;
  const imgAlt = typeof currentImage === 'object' && currentImage.caption 
    ? currentImage.caption 
    : `${projectTitle} screenshot ${currentIndex + 1}`;

  return (
    <div className="gallery" role="region" aria-label="Project screenshot gallery">
      <div className="gallery__main">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="gallery__main-image"
          onClick={() => setIsLightboxOpen(true)}
          title="Click to expand fullscreen"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery__nav-btn gallery__nav-btn--prev"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              aria-label="Previous screenshot"
            >
              &#8249;
            </button>
            <button
              type="button"
              className="gallery__nav-btn gallery__nav-btn--next"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              aria-label="Next screenshot"
            >
              &#8250;
            </button>
            <div className="gallery__counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbnails" role="tablist" aria-label="Screenshots thumbnail list">
          {images.map((img, idx) => {
            const thumbSrc = typeof img === 'string' ? img : img.src || img.url;
            const thumbAlt = typeof img === 'object' && img.caption ? img.caption : `Thumbnail ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                className={`gallery__thumb ${idx === currentIndex ? 'gallery__thumb--active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={thumbSrc} alt={thumbAlt} loading="lazy" />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox / Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen screenshot view"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            aria-label="Close fullscreen view"
          >
            &times;
          </button>

          <img
            src={imgSrc}
            alt={imgAlt}
            className="lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                aria-label="Previous screenshot"
              >
                &#8249;
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % images.length);
                }}
                aria-label="Next screenshot"
              >
                &#8250;
              </button>
              <div className="lightbox__counter">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
