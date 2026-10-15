/* UI UPGRADE: App Shell with Scroll Progress, Back to Top, and Scroll-Reveal Observer */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import BeyondCode from './sections/BeyondCode';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // UI UPGRADE: Track scroll progress and toggle back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UI UPGRADE: Global IntersectionObserver for smooth scroll-reveal animations
  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const targets = document.querySelectorAll(
      '.section__header, .about__content, .project-card, .techstack__category, .cert-card, .education__item, .beyond__card, .contact__inner'
    );

    targets.forEach((el, index) => {
      el.classList.add('reveal');
      // Add staggered delays for cards in grids
      const delayMod = (index % 4) + 1;
      el.classList.add(`reveal--delay-${delayMod}`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      {/* UI UPGRADE: Top glowing scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page reading progress"
      />

      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Certifications />
        <Education />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />

      {/* UI UPGRADE: Back to top floating button */}
      <button
        type="button"
        className={`back-to-top${showBackToTop ? ' back-to-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
