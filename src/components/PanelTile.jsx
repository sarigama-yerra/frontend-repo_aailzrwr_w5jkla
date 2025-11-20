import React, { useRef, useEffect } from 'react'
import anime from 'animejs'

export default function PanelTile({ title, children, onClick, role = 'button' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      easing: 'easeOutBack',
      delay: anime.stagger(120),
    })
  }, [])

  return (
    <div
      ref={ref}
      onClick={onClick}
      role={role}
      tabIndex={0}
      aria-label={title}
      className="group chrome-enter relative p-5 sm:p-6 rounded-xl border border-cyan-400/30 bg-white/5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,229,255,0.08),0_20px_40px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,229,255,0.24),0_30px_60px_rgba(0,0,0,0.45)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        backgroundImage: 'radial-gradient(80%_100%_at_50%_0%,rgba(0,229,255,0.08),transparent)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold tracking-wide text-sm sm:text-base">{title}</h3>
        <div className="w-2 h-2 rounded-full bg-cyan-400/80 group-hover:bg-cyan-300 transition-colors" />
      </div>
      {children}
    </div>
  )
}
