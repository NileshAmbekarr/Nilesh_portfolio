import React, { useState, useEffect } from 'react';
import './Intro.css';

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
    <div className="intro-container">
      <div className="greeting-wrapper">
        <h2 className="greeting">{greetings[currentGreetingIndex].text}</h2>
        {/* <p className="greeting-language">{greetings[currentGreetingIndex].language}</p> */}
      </div>
      
      <div className="name-container">
        <p className="pre-name">I am</p>
        <h1 className="name">Nilesh Ambekar</h1>
        <p>:)</p>
      </div>
      
      <div className="social-links">
        <div className="social-item">
          <a href="https://www.linkedin.com/in/nileshambekar/" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn linkedin">
              <img src="/src/assets/Socialicons/linkedin.svg" alt="LinkedIn"/>
            </div>
            <span className="social-name">LinkedIn</span>
          </a>
          <div className="social-hover-card">
            {/* LinkedIn profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://github.com/NileshAmbekarr" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn github">
              <img src="/src/assets/Socialicons/github.png" alt="GitHub" />
            </div>
            <span className="social-name">GitHub</span>
          </a>
          <div className="social-hover-card">
            {/* GitHub profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://x.com/nileshambekar_" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn twitter">
              <img src="/src/assets/Socialicons/X.png" alt="X" />
            </div>
            <span className="social-name">Twitter</span>
          </a>
          <div className="social-hover-card">
            {/* Twitter profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://www.instagram.com/niilesh_ambekar" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn instagram">
              <img src="/src/assets/Socialicons/instagram.png" alt="Instagram" />
            </div>
            <span className="social-name">Instagram</span>
          </a>
          <div className="social-hover-card">
            {/* Instagram profile info will go here */}
          </div>
        </div>
        
        <div className="social-item">
          <a href="https://leetcode.com/u/nilesh_ambekar/" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="social-btn leetcode">
              <img width="32" height="32" src="/src/assets/Socialicons/leetcode.png" alt="leetcode"/>
            </div>
            <span className="social-name">LeetCode</span>
          </a>
          <div className="social-hover-card">
            {/* LeetCode profile info will go here */}
          </div>
        </div>
      </div>
      
      <div className="resume-container">
        <a href="https://drive.google.com/file/d/17oe735CQyuAIAMDold-ucqu6TOsmrwvP/view" target="_blank" rel="noopener noreferrer" className="resume-button">
          <span className="resume-text">Resume</span>
        </a>
      </div>
    </div>
  );
};

export default Intro;

