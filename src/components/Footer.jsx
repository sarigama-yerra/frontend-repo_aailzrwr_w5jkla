import React from 'react'
import { Twitter, Github, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <div className="mt-12 border-t border-white/10 pt-6 text-cyan-200/70 text-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2025 ROBO-HEIST Initiative · Accessibility · Privacy</p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Website" className="hover:text-cyan-100"><Globe size={18} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-cyan-100"><Twitter size={18} /></a>
          <a href="#" aria-label="GitHub" className="hover:text-cyan-100"><Github size={18} /></a>
        </div>
      </div>
    </div>
  )
}
