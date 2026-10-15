import React from 'react';

const CREATIVE_PURSUITS = [
  {
    category: 'Music',
    icon: '🎵',
    items: [
      'Piano instruction',
      'MUSIC Programming',
      'MIDI composition and music arrangement',
      'Background music production',
    ],
  },
  {
    category: 'Arts & Design',
    icon: '🎨',
    items: ['Painting', 'Caricature', 'Drawing'],
  },
];

export default function BeyondCode() {
  return (
    <section id="beyond-code" className="section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Other Skills</h2>
          <p className="section__subtitle">
            Creative pursuits that nurture disciplined practice, detail-oriented design, and compositional problem-solving.
          </p>
        </div>

        <div className="beyond__grid">
          {CREATIVE_PURSUITS.map(({ category, icon, items }) => (
            <div key={category} className="beyond__card">
              <h3 className="beyond__card-title">
                <span aria-hidden="true">{icon}</span>
                {category}
              </h3>
              <ul className="beyond__list">
                {items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
