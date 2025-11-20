import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

export default function HeroParallax({ heroSrc }) {
  const containerRef = useRef(null)
  const layersRef = useRef({})

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const p = Math.min(1, y / h)
      const fg = layersRef.current.fg
      const mg = layersRef.current.mg
      const bg = layersRef.current.bg
      if (fg) fg.style.transform = `translate3d(0, ${p * -40}px, 0)`
      if (mg) mg.style.transform = `translate3d(0, ${p * -25}px, 0)`
      if (bg) bg.style.transform = `translate3d(0, ${p * -12}px, 0)`
    }
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      const fg = layersRef.current.fg
      const mg = layersRef.current.mg
      const bg = layersRef.current.bg
      if (fg) fg.style.transform = `translate3d(${dx * 10}px, ${dy * 10}px, 0)`
      if (mg) mg.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0)`
      if (bg) bg.style.transform = `translate3d(${dx * 3}px, ${dy * 3}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    container.addEventListener('mousemove', onMouse)
    return () => {
      window.removeEventListener('scroll', onScroll)
      container.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <img src={heroSrc} alt="" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071022] via-[#071022]/50 to-transparent" />
      </div>

      <div ref={el => (layersRef.current.bg = el)} className="absolute inset-0 will-change-transform" aria-hidden></div>
      <div ref={el => (layersRef.current.mg = el)} className="absolute inset-0 will-change-transform" aria-hidden></div>
      <div ref={el => (layersRef.current.fg = el)} className="absolute inset-0 will-change-transform" aria-hidden></div>

      <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
