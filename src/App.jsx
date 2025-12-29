import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import About from './Components/About/About'
import Projects from './Components/Projects/Projects'
import Spotlight from './Components/Spotlight/Spotlight'
import FloatingSkills from './Components/Skills/Skills'
import Timeline from './Components/Timeline/Timeline'
import ContactForm from './Components/ContactForm/ContactForm'
import Stars from './Components/Intro/Stars'
import './App.css'

function App() {

  return (
    <div style={{ position: 'relative'}}>
        <div className="background-pattern">   <Stars/> </div>
        
        <Spotlight />/
       
        <Navbar />
        <Intro />
        <About />
        <Projects />
        <FloatingSkills />
        <Timeline/>
        <ContactForm/> 
        
        <br />
        <p>Built with ❤ by <a href="https://github.com/NileshAmbekarr">Nilesh Ambekar</a> | <a href="https://github.com/NileshAmbekarr/Nilesh_portfolio">`Source Code` </a></p>
        {/* <p>Copyright 2025 </p> */}
  </div>
  )
}

export default App
