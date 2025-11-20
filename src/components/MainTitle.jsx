import React, { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function MainTitle() {
  const titleRef = useRef(null)
  const strokeRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = anime.timeline({ autoplay: true })
    tl.add({
      targets: '.chrome-enter',
      opacity: [0, 1],
      translateY: [24, 0],
      easing: 'easeOutQuad',
      duration: 600,
      delay: anime.stagger(100),
    })
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [32, 0],
        scale: [0.96, 1],
        easing: 'easeOutBack',
        duration: 700,
      }, '-=200')
      .add({
        targets: strokeRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 900,
      }, '-=500')
  }, [])

  return (
    <div className="relative">
      <svg className="absolute -inset-4" width="0" height="0" aria-hidden>
        <defs>
          <filter id="titleShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>
      </svg>
      <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[0.95] [text-shadow:0_2px_0_#000,0_6px_24px_rgba(0,0,0,0.65)]">
        <span className="block">ROBO-HEIST:</span>
        <span className="block bg-clip-text text-transparent [text-shadow:none]" style={{ backgroundImage: 'linear-gradient(90deg,#ffffff,#bff7ff)' }}>
          LOS SANTOS
        </span>
      </h1>
      <svg className="absolute left-0 -bottom-3" width="320" height="12">
        <line ref={strokeRef} x1="0" y1="6" x2="320" y2="6" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
