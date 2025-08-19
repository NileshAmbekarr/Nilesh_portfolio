import React from 'react';
import { AnimateSvg } from '../SVGline/svg';
import './Timeline.css';

const Timeline = () => {
  const experiences = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      company: "StudifySuccess",
      duration: "Mar 2025- Jun 2025",
      location: "Remote",
      description: "Built scalable full-stack web apps with React/Next.js, real-time dashboards, and REST APIs, improving UI speed, load times, and data handling efficiency by 25–40%.",
      technologies: ["React", "Node.js", "MongoDB", "JavaScript", "Next.js"]
    },
    {
      id: 2,
      title: "FullStack Developer Intern",
      company: "FOOZFOOD Global LLC",
      duration: "Feb 2025 - May 2025",
      location: "Remote",
      description: "Led intern team, optimized workflows (GitHub, UAT, PR reviews), and delivered features like live notifications, farmer onboarding, and advanced user management for 1,000+ users.",
      technologies: ["Node.js", "React", "MongoDB", "Agile Development"]
    },
    {
      id: 3,
      title: "AI Intern",
      company: "Edunet Foundation",
      duration: "Dec 2024 - Jan 2025",
      location: "Remote",
      description: "Worked on a Plant-Desease-Detection-System leveraging the power on Conventional Neural Netwroks",
      technologies: ["Python", "CNNs", "Streamlit"]
    },
  ];

  return (
    <div className="experience-timeline">
      <div className="timeline-header">
        <h2>Experience & Internships</h2>
        <p>My professional journey and learning experiences</p>
      </div>
      
      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          > 
              { index != 0 && index % 2 == 0 && 
                <AnimateSvg
                    width="10%"
                    height="10%"
                    viewBox="0 0 97 115"
                    className="my-svg-animation"
                    path="M94 108.48C81.6994 111.796 40.4834 119.169 39.6001 94.4354C39.3499 87.4301 47.2387 76.0749 55.6001 80.0354C66.75 85.3168 55.1895 99.1945 47.6001 100.835C27.6067 105.158 9.5063 84.6447 4.4889 67.5021C0.2754 53.106 3.6825 37.3222 8.8445 23.6798C11.2659 17.2804 16.1195 12.9113 18.8 6.87984C22.947 -2.45097 12.7878 7.76023 7.6889 9.99094C-2.7295 14.5489 14.4172 7.67225 18.0001 6.07983C23.9117 3.4524 26.4528 19.4382 28.4 25.2798"
                    strokeColor="#ffffff"
                    strokeWidth={3}
                    strokeLinecap="round"
                    animationDuration={1.5}
                    animationDelay={0}
                    animationBounce={0.3}
                    reverseAnimation={false}   // set to true if you want draw direction reversed
                    enableHoverAnimation={true}
                    hoverAnimationType="redraw"
                    hoverStrokeColor="#4f46e5"
                  />
              }
            <div className="experience-card">
              <div className="card-header">
                <h3 className="job-title">{exp.title}</h3>
                <div className="company-info">
                  <span className="company">{exp.company}</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              
              <div className="duration">
                {exp.duration}
              </div>
              
              <div className="description">
                {exp.description}
              </div>
              
              {/* <div className="technologies">
                {exp.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div> */}
              
              {/* Connector point for SVG lines */}
              <div className="connector-point"></div>
            </div>
             { index % 2 == 1 && 
             <AnimateSvg
                  width="10%"
                  height="10%"
                  viewBox="0 0 97 115"
                  className="my-svg-animation"
                  path="M3 108.48C15.3006 111.796 56.5166 119.169 57.3999 94.4354C57.6501 87.4301 49.7613 76.0749 41.3999 80.0354C30.25 85.3168 41.8105 99.1945 49.3999 100.835C69.3933 105.158 87.4937 84.6447 92.5111 67.5021C96.7246 53.106 93.3175 37.3222 88.1555 23.6798C85.7341 17.2804 80.8805 12.9113 78.2 6.87984C74.053 -2.45097 84.2122 7.76023 89.3111 9.99094C99.7295 14.5489 82.5828 7.67225 78.9999 6.07983C73.0883 3.4524 70.5472 19.4382 68.6 25.2798"
                  transform="scale(-1,1) translate(-97,0)"
                  strokeColor="#ffffff"
                  strokeWidth={3}
                  strokeLinecap="round"
                  animationDuration={1.5}
                  animationDelay={0}
                  animationBounce={0.3}
                  reverseAnimation={false}
                  enableHoverAnimation={true}
                  hoverAnimationType="redraw"
                  hoverStrokeColor="#4f46e5"
              /> }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;