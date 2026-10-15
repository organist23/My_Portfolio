import React, { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenCaseStudy = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            Real-world systems developed to solve practical organizational and administrative problems.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
