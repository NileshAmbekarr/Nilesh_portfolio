import React from 'react';
import './Projects.css';
import projects from './projectsData';

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img className="project-image" src={project.image} alt={project.title} />
            <div className="project-content">
              <h3 className="project-name">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.techStack.map((tech, idx) => (
                  <span className="tech-pill" key={idx}>{tech}</span>
                ))}
              </div>
              <div className="project-links">

                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn github"> 
                    <img src="/src/assets/SocialIcons/github.png" alt="" style={{
                        height: '20px',
                        width: '20px',
                        marginRight: '10px',
                        // marginTop: '5px',
                    }} /> GitHub</a>
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-btn live">Live Demo</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <a href="https://github.com/NileshAmbekarr?tab=repositories" target="_blank" rel="noopener noreferrer" className="view-more-btn">
        <img src="/src/assets/SocialIcons/github.png" alt="" style={{
                        height: '20px',
                        width: '20px',
                        marginRight: '10px',
                        // marginTop: '5px',
                        // paddingTop: '5px',
                    }} /> View more on GitHub</a>
      </div>
    </section>
  );
};

export default Projects; 