import React from 'react'
import { Share2, Menu } from 'lucide-react'

export default function BrowserFrame({ children }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#0a1226]/80 backdrop-blur-md border border-cyan-400/20 shadow-[0_0_40px_rgba(0,229,255,0.25)]">
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#0e1733] to-[#0a1226] border-b border-cyan-400/20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/80" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" aria-hidden="true" />
        </div>
        <div className="text-xs md:text-sm text-cyan-200/80 font-medium tracking-wide select-none">
          robo-heist.los-santos • event-preview
        </div>
        <div className="flex items-center gap-4 text-cyan-200/80">
          <button aria-label="Menu" className="hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
            <Menu size={18} />
          </button>
          <button aria-label="Share" className="hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
