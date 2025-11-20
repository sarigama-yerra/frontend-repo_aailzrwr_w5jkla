import React, { useEffect, useState } from 'react'
import anime from 'animejs'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Leaderboard() {
  const [teams, setTeams] = useState([])

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/leaderboard`)
    const d = await res.json()
    const sorted = d.teams.sort((a,b)=>b.score-a.score).slice(0,5)
    setTeams(sorted)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      anime({ targets: '.lb-item', translateY: [20, 0], opacity: [0, 1], delay: anime.stagger(120), easing: 'easeOutQuad' })
    }
  }

  useEffect(() => { load() }, [])

  return (
    <ol className="grid gap-3">
      {teams.map((t, i) => (
        <li key={t.id} className={`lb-item relative p-3 rounded-lg border ${i<3?'border-cyan-400/40 shadow-[0_0_20px_rgba(0,229,255,0.25)]':'border-white/10'} bg-white/5`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-6 text-cyan-200/80 font-bold">#{i+1}</span>
              <span className="text-white font-semibold">{t.team}</span>
            </div>
            <span className="text-cyan-300 font-bold tabular-nums">{t.score}</span>
          </div>
          <div className="mt-2 h-1.5 rounded bg-white/10 overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: `${Math.min(100, t.score)}%` }} />
          </div>
        </li>
      ))}
    </ol>
  )
}
