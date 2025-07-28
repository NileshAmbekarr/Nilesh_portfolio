import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import About from './Components/About/About'
import Projects from './Components/Projects/Projects'
import Spotlight from './Components/Spotlight/Spotlight'
import RippleCursor from './Components/Cursor/RippleCursor'
import './App.css'

function App() {

  return (
    <>
      <RippleCursor/>
      <Spotlight />
      <Navbar />
      <Intro />
      <About />
      <Projects />
      <br />
      <p>abhi ke liye bas itna hi</p>
      <p>more content coming soon...😉</p>
    </>
  )
}

export default App
