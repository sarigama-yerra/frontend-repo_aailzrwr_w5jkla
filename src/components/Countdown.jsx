import React, { useEffect, useMemo, useRef, useState } from 'react'
import anime from 'animejs'

function Segment({ label, value }) {
  const ref = useRef(null)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        anime({ targets: ref.current, rotateX: [0, 90, 0], duration: 500, easing: 'easeInOutQuad', perspective: 400 })
      }
      prev.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <div ref={ref} className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-wider leading-none">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-cyan-200/70 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function Countdown({ target }) {
  const [now, setNow] = useState(Date.now())
  const distance = Math.max(0, new Date(target).getTime() - now)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (distance <= 0) setLive(true)
  }, [distance])

  const parts = useMemo(() => {
    let d = Math.floor(distance / (1000 * 60 * 60 * 24))
    let h = Math.floor((distance / (1000 * 60 * 60)) % 24)
    let m = Math.floor((distance / (1000 * 60)) % 60)
    let s = Math.floor((distance / 1000) % 60)
    return { d, h, m, s }
  }, [distance])

  if (live) {
    return <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">Event Live</div>
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Segment label="Days" value={parts.d} />
      <Segment label="Hours" value={parts.h} />
      <Segment label="Mins" value={parts.m} />
      <Segment label="Secs" value={parts.s} />
    </div>
  )
}
