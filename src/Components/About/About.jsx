import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container" id="about">
      <div className="about-content">
        <h2 className="about-title">About Me</h2>
        
        <div className="about-text-container">
          <p className="about-text">
            Hey there! I'm Nilesh, a tech enthusiast who's currently navigating the wild world of Information Technology at Anuradha Engineering College. When I'm not busy ranking #1 on GeeksforGeeks (humble brag), I'm probably building something cool with React or figuring out how to make servers do my bidding.
          </p>
          
          <p className="about-text">
            I speak multiple languages - Java, JavaScript, TypeScript, C/C++ - and no, I don't mean at parties (though that would be impressive). My superpower? Turning coffee into code and complex problems into elegant solutions.
          </p>
          
          <p className="about-text">
            In my free time, you'd find me listening to music or touching grass (yes, I do go outside occasionally). When I'm not debugging code, I'm debugging my life, one cup of coffee at a time.
          </p>
          
          <div className="fun-facts">
            <h3>Fun Facts:</h3>
            <ul>
              <li>I can explain Docker to my grandma (still working on explaining it to my cat)</li>
              <li>I've reduced manual review effort by 50% (my secret: letting AI do the work)</li>
              <li>I once built an entire app just to avoid doing laundry</li>
              <li>My code is like my coffee - strong, reliable, and occasionally keeping me up at night</li>
            </ul>
          </div>
        </div>
        
        <div className="skills-container">
          <div className="skill-category">
            <h3>Tech I Play With</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">Supabase</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">Kubernetes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 