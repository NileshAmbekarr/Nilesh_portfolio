import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Gallery from './Pages/Gallery/Gallery.jsx'
import notifyVisit from './utils/notifyVisit.js'

// Sits above the routes so a visit to any page pings once.
function VisitNotifier() {
  useEffect(() => {
    notifyVisit()
  }, [])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <VisitNotifier />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
