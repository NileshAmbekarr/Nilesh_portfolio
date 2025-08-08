// FloatingSkills.jsx
import React, { useState, useEffect, useRef } from 'react';
import { skillsData } from './SkillsData.js';
import './Skills.css';

const FloatingSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Improved positioning algorithm to prevent overlapping
  const generateNonOverlappingPositions = () => {
    const clusterKeys = Object.keys(skillsData);
    const positions = [];
    const minDistance = 50; // 🎯 ADJUST GAP HERE: Decrease for closer icons, increase for more space
    const containerWidth = 1000; // Assumed container width for calculations
    const containerHeight = 600; // Container height
    
    // Define cluster centers more spread out
    const clusterCenters = [];
    const numClusters = clusterKeys.length;
    
    // Create more spread out cluster centers
    for (let i = 0; i < numClusters; i++) {
      const angle = (i / numClusters) * 2 * Math.PI;
      const radius = Math.min(containerWidth, containerHeight) * 0.25; // Increased radius
      const centerX = containerWidth * 0.5 + Math.cos(angle) * radius;
      const centerY = containerHeight * 0.5 + Math.sin(angle) * radius;
      
      clusterCenters.push({
        x: (centerX / containerWidth) * 100,
        y: (centerY / containerHeight) * 100
      });
    }

    clusterKeys.forEach((clusterName, clusterIndex) => {
      const cluster = skillsData[clusterName];
      const clusterCenter = clusterCenters[clusterIndex];
      
      cluster.skills.forEach((skill, skillIndex) => {
        let position;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
          // Generate position around cluster center with controlled spread
          const angle = Math.random() * 2 * Math.PI;
          const distance = 30 + Math.random() * 80; // 🎯 ADJUST CLUSTER SPREAD: Decrease both numbers for tighter clusters
          
          const x = clusterCenter.x + (Math.cos(angle) * distance * 0.4);
          const y = clusterCenter.y + (Math.sin(angle) * distance * 0.3);
          
          // Ensure positions stay within bounds with padding
          position = {
            x: Math.max(8, Math.min(92, x)),
            y: Math.max(8, Math.min(92, y)),
            delay: Math.random() * 2
          };
          
          attempts++;
        } while (attempts < maxAttempts && isOverlapping(position, positions, minDistance, containerWidth, containerHeight));
        
        positions.push({
          ...position,
          clusterName,
          skillName: skill.name
        });
      });
    });
    
    return positions;
  };

  // Check if a position overlaps with existing positions
  const isOverlapping = (newPos, existingPositions, minDistance, containerWidth, containerHeight) => {
    return existingPositions.some(existingPos => {
      const xDist = Math.abs((newPos.x - existingPos.x) * containerWidth / 100);
      const yDist = Math.abs((newPos.y - existingPos.y) * containerHeight / 100);
      const distance = Math.sqrt(xDist * xDist + yDist * yDist);
      return distance < minDistance;
    });
  };

   // Allow state updates for rearrangement
  const [positions, setPositions] = useState(() => generateNonOverlappingPositions());
  const shuffleCooldownRef = useRef(null);

  const handleMouseEnter = () => {
    // If currently cooling down, ignore extra enters
    if (shuffleCooldownRef.current) return;

    // Regenerate positions (non-overlapping)
    setPositions(generateNonOverlappingPositions());

    // Optional: briefly toggle mounted to re-trigger mount animations (uncomment if you want)
    // setMounted(false);
    // setTimeout(() => setMounted(true), 20);

    // Start cooldown (800ms) to avoid spamming reshuffle
    shuffleCooldownRef.current = setTimeout(() => {
      shuffleCooldownRef.current = null;
    }, 800);
  };

  // Generate positions once when component mounts



  const clusterKeys = Object.keys(skillsData);

  return (
    <div className="skills-container" id='skills'>
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-universe" onMouseEnter={handleMouseEnter} >
        {clusterKeys.map((clusterName, clusterIndex) => {
          const cluster = skillsData[clusterName];
          return cluster.skills.map((skill, skillIndex) => {
            const positionIndex = clusterKeys.slice(0, clusterIndex)
              .reduce((acc, key) => acc + skillsData[key].skills.length, 0) + skillIndex;
            const position = positions[positionIndex];
            
            if (!position) return null;
            
            return (
              <div
                key={`${clusterName}-${skill.name}`}
                className={`skill-icon ${mounted ? 'mounted' : ''}`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  animationDelay: `${position.delay}s`,
                  '--cluster-color': cluster.color
                }}
                onMouseEnter={() => setHoveredSkill({...skill, cluster: clusterName, color: cluster.color})}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-icon-wrapper">
                  <img src={skill.icon} alt={skill.name} />
                  <div className="skill-glow"></div>
                </div>
              </div>
            );
          });
        })}
        
        {/* Cluster Labels - positioned at cluster centers
        {clusterKeys.map((clusterName, index) => {
          // Find the center position of skills in this cluster
          const clusterSkillPositions = positions.filter(pos => pos.clusterName === clusterName);
          if (clusterSkillPositions.length === 0) return null;
          
          // Calculate the actual center (median) position of the cluster
          const centerX = clusterSkillPositions.reduce((sum, pos) => sum + pos.x, 0) / clusterSkillPositions.length;
          const centerY = clusterSkillPositions.reduce((sum, pos) => sum + pos.y, 0) / clusterSkillPositions.length;
          
          return (
            <div
              key={`label-${clusterName}`}
              className="cluster-label"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`, // Centered with the cluster
                color: skillsData[clusterName].color
              }}
            >
              {clusterName}
            </div>
          );
        })} */}
      </div>
      
      {/* Tooltip */}
      {hoveredSkill && (
        <div className="skill-tooltip">
          <span className="skill-name">{hoveredSkill.name}</span>
          <span className="skill-cluster" style={{color: hoveredSkill.color}}>
            {hoveredSkill.cluster}
          </span>
        </div>
      )}
      
      {/* Floating particles for ambiance */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`floating-particle particle-${i}`}></div>
      ))}
    </div>
  );
};

export default FloatingSkills;



/*
    🎯 Gap Control Settings:
1. Icon Spacing (Line ~17 in FloatingSkills.jsx):
javascriptconst minDistance = 65; // 🎯 MAIN GAP CONTROLLER

Decrease (e.g., 50, 55) = Icons closer together
Increase (e.g., 75, 80) = Icons further apart

2. Cluster Spread (Line ~37 in FloatingSkills.jsx):
javascriptconst distance = 30 + Math.random() * 80; // 🎯 CLUSTER TIGHTNESS

Tighter clusters: 20 + Math.random() * 60
Looser clusters: 40 + Math.random() * 100

🏷️ Cluster Labels Fixed:

Now positioned exactly in the center of each skill group
Better styling: More prominent with better contrast
Properly centered with transform: translate(-50%, -50%)
Higher z-index so they appear above skill icons
No more random absolute positioning

*/ 