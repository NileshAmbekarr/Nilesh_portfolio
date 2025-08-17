import React, { useState, useEffect, useRef } from 'react';
import { Building2, Code, Briefcase, Users, Calendar, MapPin } from 'lucide-react';

const Timeline = () => {
  const [animateTimeline, setAnimateTimeline] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const timelineRef = useRef(null);

  // Sample internship data
  const internships = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Frontend Developer Intern",
      duration: "Jun 2023 - Aug 2023",
      location: "San Francisco, CA",
      icon: <Code className="w-6 h-6" />,
      color: "bg-blue-500",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with senior developers to implement new features and optimize performance.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Git"],
      achievements: ["Reduced load time by 30%", "Built 5 new components", "Mentored 2 junior interns"]
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Full Stack Intern",
      duration: "Sep 2023 - Dec 2023",
      location: "Remote",
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-purple-500",
      description: "Built end-to-end features for a SaaS platform. Worked directly with founders to define product requirements and implement user-facing features.",
      technologies: ["Node.js", "MongoDB", "React", "AWS"],
      achievements: ["Launched 3 major features", "Improved API response time by 40%", "Designed database schema"]
    },
    {
      id: 3,
      company: "DataFlow Inc",
      role: "Software Engineering Intern",
      duration: "Jan 2024 - Apr 2024",
      location: "Austin, TX",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-green-500",
      description: "Focused on data pipeline optimization and machine learning model deployment. Contributed to improving data processing efficiency across multiple systems.",
      technologies: ["Python", "Docker", "Kubernetes", "TensorFlow"],
      achievements: ["Optimized data pipeline", "Deployed 2 ML models", "Reduced processing time by 50%"]
    },
    {
      id: 4,
      company: "InnovateLab",
      role: "Product Development Intern",
      duration: "May 2024 - Aug 2024",
      location: "New York, NY",
      icon: <Users className="w-6 h-6" />,
      color: "bg-orange-500",
      description: "Collaborated with cross-functional teams to develop innovative solutions. Led user research initiatives and contributed to product strategy decisions.",
      technologies: ["Figma", "React Native", "Firebase", "Analytics"],
      achievements: ["Led 10+ user interviews", "Designed mobile app prototype", "Increased user engagement by 25%"]
    }
  ];

  // Intersection Observer for timeline animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateTimeline(true);
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">My Journey</h2>
        <p className="text-lg text-gray-600">Internship experiences that shaped my career</p>
      </div>

      <div ref={timelineRef} className="relative">
        {/* Timeline container - horizontal layout prioritized, then responsive grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 relative">
          {/* Connecting line - horizontal on larger screens, vertical on mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal line for larger screens */}
            <div className="hidden md:block absolute top-1/2 left-0 h-1 bg-gray-300 transform -translate-y-1/2 w-full">
              <div 
                className={`h-full bg-green-500 transition-all duration-4000 ease-linear ${
                  animateTimeline ? 'w-full' : 'w-0'
                }`}
                style={{
                  transitionDelay: '0.8s'
                }}
              />
            </div>
            
            {/* Vertical line for mobile */}
            <div className="md:hidden absolute left-1/2 top-0 w-1 bg-gray-300 transform -translate-x-1/2 h-full">
              <div 
                className={`w-full bg-green-500 transition-all duration-4000 ease-linear ${
                  animateTimeline ? 'h-full' : 'h-0'
                }`}
                style={{
                  transitionDelay: '0.8s'
                }}
              />
            </div>
          </div>

          {/* Timeline cards */}
          {internships.map((internship, index) => (
            <div
              key={internship.id}
              className="relative z-10 w-64"
              style={{
                animationDelay: `${1.2 + index * 0.3}s`
              }}
            >
              {/* Connection dot */}
              <div className="absolute -top-2 left-1/2 md:top-1/2 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg z-20" />
              
              {/* Card */}
              <div
                className={`bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 ease-out transform hover:scale-110 hover:shadow-2xl hover:z-50 hover:bg-opacity-95 ${
                  animateTimeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${hoveredCard === internship.id ? 'scale-110 shadow-2xl z-50 bg-opacity-95' : ''}`}
                style={{
                  animation: animateTimeline ? `fadeInUp 0.6s ease-out ${1.2 + index * 0.3}s both` : undefined,
                  zIndex: hoveredCard === internship.id ? 50 : 10
                }}
                onMouseEnter={() => setHoveredCard(internship.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setHoveredCard(internship.id)}
                onBlur={() => setHoveredCard(null)}
                tabIndex={0}
                role="button"
                aria-expanded={hoveredCard === internship.id}
              >
                {/* Card header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`${internship.color} p-3 rounded-lg text-white flex-shrink-0`}>
                    {internship.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-800 leading-tight">
                      {internship.company}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      {internship.role}
                    </p>
                  </div>
                </div>

                {/* Basic info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{internship.location}</span>
                  </div>
                </div>

                {/* Expandable details */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    hoveredCard === internship.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {internship.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {internship.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">Key Achievements:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {internship.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .transition-all {
          transition-property: all;
        }
      `}</style>
    </div>
  );
};

export default Timeline;