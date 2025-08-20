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
            I speak multiple languages - Java, JavaScript, TypeScript, C/C++ - and no, I don't mean at parties (though that would be impressive). My superpower? Turning <span class="tilted-strike">coffee</span> Chai into code and complex problems into elegant solutions.
          </p>
          
          <p className="about-text">
            In my free time, you'd find me listening to music or touching grass (yes, I do go outside occasionally). When I'm not debugging code, I'm debugging my life, one cup of <span class="tilted-strike">Coffee</span> Chai at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 