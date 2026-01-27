
import { StickyScroll } from '../ui/sticky-scroll-reveal'
import './Projects.css';
import projects from './projectsData';
import githubIcon from '../../assets/Socialicons/github.png'
import { NoiseBackground } from '../ui/noise-background';

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">PROJECTS</h2>
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
                <NoiseBackground
                  containerClassName="w-fit my-8 p-2 rounded-full mx-auto"
                  gradientColors={[
                    "rgb(255, 100, 150)",
                    "rgb(100, 150, 255)",
                    "rgb(255, 200, 100)",
                  ]}>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn github"> 
                      <img src={githubIcon} alt="" style={{
                        height: '20px',
                        width: '20px',
                        marginRight: '10px',
                        // marginTop: '5px',
                    }} /> GitHub</a>
                  </NoiseBackground>

                  
                {project.liveDemo && (
                  <NoiseBackground
                   containerClassName="w-fit my-8 p-2 rounded-full mx-auto"
                  gradientColors={[
                    "rgb(255, 100, 150)",
                    "rgb(100, 150, 255)",
                    "rgb(255, 200, 100)",
                  ]}>
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-btn live">Live Demo</a>
                  </NoiseBackground>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <NoiseBackground
           containerClassName="w-fit my-8 p-2 rounded-full mx-auto"
          gradientColors={[
            "rgb(255, 100, 150)",
            "rgb(100, 150, 255)",
            "rgb(255, 200, 100)",
          ]}>
            <a href="https://github.com/NileshAmbekarr?tab=repositories" target="_blank" rel="noopener noreferrer" className="view-more-btn">
          <img src={githubIcon} alt="" style={{
                          height: '20px',
                          width: '20px',
                          marginRight: '10px',
                          // marginTop: '5px',
                          // paddingTop: '5px',
                      }} /> View more on GitHub</a>
          
          </NoiseBackground>
       </div>
    </section>
  );
};

export default Projects; 
