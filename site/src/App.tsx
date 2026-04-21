import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AmbientOrbs } from './components/AmbientOrbs'
import { ScrollProgress } from './components/ScrollProgress'
import { StickyCTA } from './components/StickyCTA'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { Home } from './pages/Home'
import { MiniApp } from './pages/MiniApp'

export default function App() {
  return (
    <BrowserRouter>
      <AmbientOrbs />
      <ScrollProgress />
      <StickyCTA />
      <KeyboardShortcuts />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mini-app" element={<MiniApp />} />
      </Routes>
    </BrowserRouter>
  )
}
