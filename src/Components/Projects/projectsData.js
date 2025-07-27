import DoctorSearch from '../../assets/ProjectImages/Doctorsearch.png'
import JobPortal from '../../assets/ProjectImages/Jobportal.png'
import MarathiLang from '../../assets/ProjectImages/Marathilang.png'

// Project data for portfolio
const projects = [
  {
    id: 1,
    title: 'Marathi-lang',
    description: 'A Toy programming language that uses DevNagri script for its syntax',
    techStack: ['Python', 'pip', 'React', 'JavaScript'],
    image: MarathiLang,
    githubLink: 'https://github.com/NileshAmbekarr/Marathi-lang',
    liveDemo: 'https://marathi-lang.netlify.app/',
  },
  {
    id: 2,
    title: 'Doctor Search-Appointment System',
    description: 'A web application that allows users to search for doctors, book appointments, and manage their health records.',
    techStack: ['node', 'Express', 'MongoDB', 'React', 'TailwindCSS'],
    image: DoctorSearch,
    githubLink: 'https://github.com/NileshAmbekarr/Doctor-Search',
    liveDemo: 'https://doctorsearchportal.netlify.app/',
  },
  {
    id: 3,
    title: 'Job Portal Application',
    description: 'A web application that allows users to search for jobs, apply for jobs, and manage their job applications.',
    techStack: ['node', 'Express', 'Supabase', 'React', 'TailwindCSS'],
    image: JobPortal,
    githubLink: 'https://github.com/NileshAmbekarr/AI-Job-Portal',
    liveDemo: 'https://aijobportal.netlify.app/',
  },
  // Add or remove projects here
];

export default projects; 