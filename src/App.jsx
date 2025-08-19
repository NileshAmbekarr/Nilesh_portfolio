import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import About from './Components/About/About'
import Projects from './Components/Projects/Projects'
import Spotlight from './Components/Spotlight/Spotlight'
import RippleCursor from './Components/Cursor/RippleCursor'
import FloatingSkills from './Components/Skills/Skills'
import Timeline from './Components/Timeline/Timeline'
import './App.css'

function App() {

  return (
    <div style={{ position: 'relative' }}>
        <div className="background-pattern"></div>
        {/* <RippleCursor /> */}
        <Spotlight />
        <Navbar />
        <Intro />
        <About />
        <Projects />
        <FloatingSkills />
        <Timeline/>
        <br />
        <p>abhi ke liye bas itna hi</p>
        <p>more content coming soon...😉</p>
  </div>
  )
}

export default App
