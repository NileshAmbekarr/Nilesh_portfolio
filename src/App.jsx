import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Intro />
    </>
  )
}

export default App
