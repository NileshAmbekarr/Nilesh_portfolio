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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro-container">
      <div className="greeting-wrapper">
        <h2 className="greeting">{greetings[currentGreetingIndex].text}</h2>
        <p className="greeting-language">{greetings[currentGreetingIndex].language}</p>
      </div>
      
      <div className="name-container">
        <p className="pre-name">I am</p>
        <h1 className="name">Nilesh Ambekar</h1>
      </div>
      
      <div className="social-links">
        <button className="social-btn linkedin">
          {/* LinkedIn icon will go here */}
        </button>
        <button className="social-btn github">
          {/* GitHub icon will go here */}
        </button>
        <button className="social-btn twitter">
          {/* X/Twitter icon will go here */}
        </button>
        <button className="social-btn instagram">
          {/* Instagram icon will go here */}
        </button>
        <button className="social-btn leetcode">
          {/* LeetCode icon will go here */}
        </button>
      </div>
    </div>
  );
};

export default Intro;
