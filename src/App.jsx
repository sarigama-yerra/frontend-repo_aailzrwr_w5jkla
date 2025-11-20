import React, { useEffect, useState } from 'react'
import BrowserFrame from './components/BrowserFrame'
import HeroParallax from './components/HeroParallax'
import MainTitle from './components/MainTitle'
import PanelTile from './components/PanelTile'
import Countdown from './components/Countdown'
import RegistrationModal from './components/RegistrationModal'
import Leaderboard from './components/Leaderboard'

const HERO_IMG = '/hero.webp'

function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', '#071022')
    document.documentElement.style.setProperty('--cyan', '#00E5FF')
    document.documentElement.style.setProperty('--cyan-2', '#00CFFF')
    document.documentElement.style.setProperty('--surface', 'rgba(255,255,255,0.04)')
  }, [])

  return (
    <div className="min-h-screen bg-[#071022] text-white font-sans">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-cyan-500 text-[#071022] px-3 py-2 rounded">Skip to content</a>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BrowserFrame>
          <HeroParallax heroSrc={HERO_IMG} />
          <div className="relative px-6 sm:px-10 py-6 sm:py-10">
            <div className="max-w-4xl">
              <MainTitle />
              <p className="mt-4 text-cyan-100/80 max-w-2xl">A cinematic robotics showdown inspired by the streets of Los Santos. Assemble your crew, outsmart the grid, and claim the vault.</p>
            </div>
          </div>
        </BrowserFrame>

        <main id="main" className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <PanelTile title="Event Countdown">
            <Countdown target={import.meta.env.VITE_COUNTDOWN_TARGET || '2025-12-20T10:00:00'} />
          </PanelTile>
          <PanelTile title="Team Registration" onClick={() => setOpen(true)}>
            <p className="text-cyan-200/80 text-sm">Open the registration form to submit your team.</p>
          </PanelTile>
          <PanelTile title="Leaderboard">
            <Leaderboard />
          </PanelTile>
        </main>

        <footer className="mt-10 sm:mt-16 text-cyan-200/70 text-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <p>© 2025 ROBO-HEIST Initiative · Accessibility · Privacy</p>
            <p>Los Santos • Dec 20–22</p>
          </div>
        </footer>
      </div>
      <RegistrationModal open={open} onClose={() => setOpen(false)} onSuccess={() => { setOpen(false); setTimeout(()=>window.location.reload(), 400) }} />
    </div>
  )
}

export default App
