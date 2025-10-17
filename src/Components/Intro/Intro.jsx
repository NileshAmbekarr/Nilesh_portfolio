import React, { useState, useEffect } from 'react';
import './Intro.css';
import { AnimateSvg } from '../SVGline/svg';
// Import social icons directly
import linkedinIcon from '../../assets/Socialicons/linkedin.svg';
import githubIcon from '../../assets/Socialicons/github.png';
import twitterIcon from '../../assets/Socialicons/X.png';
import instagramIcon from '../../assets/Socialicons/instagram.png';
// import leetcodeIcon from '../../assets/Socialicons/leetcode.png';
import tufIcon from '../../assets/Socialicons/tuf.png';

const Intro = () => {
  const greetings = [
    { text: "Hello", language: "English" },
    { text: "नमस्कार", language: "Marathi" },
    { text: "नमस्ते", language: "Hindi" },
    { text: "வணக்கம்", language: "Tamil" },
    { text: "Bonjour", language: "French" },
    { text: "Привет", language: "Russian" },
    { text: "Hola", language: "Spanish" },
    { text: "こんにちは", language: "Japanese" }
  ];

  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 2000);

    // Import Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Kristi&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="intro-container" id='intro'>
      <div className="greeting-wrapper">
        <h2 className="greeting">{greetings[currentGreetingIndex].text}</h2>
        {/* <p className="greeting-language">{greetings[currentGreetingIndex].language}</p> */}
      </div>
      
      <div className="name-container">
        <p className="pre-name">I am</p>
        <div className="svg-container"> 
        <AnimateSvg
          width="100%"
          height="100%"
          viewBox="0 0 254 107"
          className="my-svg-animation"
          path="M3 103.824C45.3292 106.086 85.2951 90.8282 118.182 63.953C129.508 54.6969 140.763 42.4172 147.387 29.1688C150.391 23.1616 154.398 11.338 149.274 5.78786C140.768 -3.42746 129.585 13.6307 125.893 19.9805C119.22 31.4586 124.234 53.8078 136.148 60.2613C158.264 72.2407 191.043 69.3799 215.315 68.3011C225.006 67.8703 234.869 65.4297 244.439 65.4297C248.152 65.4297 239.179 60.7699 237.794 59.5229C229.618 52.165 229.186 52.3018 239.27 58.7846C240.667 59.6823 250.92 65.2052 250.92 66.168C250.92 66.84 233.48 79.6822 231.887 81.6733"
          strokeColor="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
          animationDuration={1.5}
          animationDelay={0}
          animationBounce={0.3}
          reverseAnimation={true}
          enableHoverAnimation={true}
          hoverAnimationType="redraw"
          hoverStrokeColor="#4f46e5"
        />
        </div>
        <h1 className="name">Nilesh Ambekar</h1>
        <p>:)</p>
      </div>
      
      <div className="social-links">
        <div className="social-item">
          <a href="https://www.linkedin.com/in/nileshambekar/" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn linkedin">
              <img src={linkedinIcon} alt="LinkedIn"/>
            </div>
            <span className="social-name">LinkedIn</span>
          </a>
          <div className="social-hover-card">
            {/* LinkedIn profile info will go here */}
          </div>
        </div>

        
        <div className="social-item">
          <a href="https://x.com/nileshambekar_" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn twitter">
              <img src={twitterIcon} alt="X" />
            </div>
            <span className="social-name">Twitter</span>
          </a>
          <div className="social-hover-card">
            {/* Twitter profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://github.com/NileshAmbekarr" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn github">
              <img src={githubIcon} alt="GitHub" />
            </div>
            <span className="social-name">GitHub</span>
          </a>
          <div className="social-hover-card">
            {/* GitHub profile info will go here */}
          </div>
        </div>
        
        
        <div className="social-item">
          <a href="https://www.instagram.com/niilesh_ambekar" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn instagram">
              <img src={instagramIcon} alt="Instagram" />
            </div>
            <span className="social-name">Instagram</span>
          </a>
          <div className="social-hover-card">
            {/* Instagram profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://takeuforward.org/plus/profile/nilesh_ambekar" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn tuf">
              <img width="32" height="32" src={tufIcon} alt="TakUForward logo"/>
            </div>
            <span className="social-name">TakeUForward</span>
          </a>
          <div className="social-hover-card">
            {/* LeetCode profile info will go here */}
          </div>
        </div>
      </div>
      
      <div className="resume-container">
        <a href="https://drive.google.com/file/d/1aUtItxtDvpqRupuy8eD3GIsnJVT4j5b_/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="resume-button">
          <span className="resume-text">View Resume</span>
        </a>
      </div>
    </div>
  );
};

export default Intro;

