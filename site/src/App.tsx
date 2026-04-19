import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AmbientOrbs } from './components/AmbientOrbs'
import { Home } from './pages/Home'
import { MiniApp } from './pages/MiniApp'

export default function App() {
  return (
    <BrowserRouter>
      <AmbientOrbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mini-app" element={<MiniApp />} />
      </Routes>
    </BrowserRouter>
  )
}
