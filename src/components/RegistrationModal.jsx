import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function RegistrationModal({ open, onClose, onSuccess }) {
  const dialogRef = useRef(null)
  const [form, setForm] = useState({ team: '', institution: '', email: '', members: '' })
  const [captcha, setCaptcha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!open) return
    if (!prefersReduced) {
      anime({ targets: el, opacity: [0, 1], translateY: [24, 0], duration: 300, easing: 'easeOutQuad' })
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    if (!captcha) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: form.team,
          institution: form.institution,
          email: form.email,
          members: form.members.split(',').map(s => s.trim()).filter(Boolean),
        }),
      })
      const data = await res.json()
      setOk(true)
      onSuccess?.(data)
      setForm({ team: '', institution: '', email: '', members: '' })
      setCaptcha(false)
      setTimeout(() => setOk(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <form
        ref={dialogRef}
        onSubmit={submit}
        className="relative w-full max-w-lg rounded-2xl border border-cyan-400/30 bg-[#0b132a]/95 backdrop-blur-md p-6 text-white shadow-[0_0_0_1px_rgba(0,229,255,0.12),0_40px_80px_rgba(0,0,0,0.5)]"
      >
        <h3 className="text-xl font-bold mb-4">Team Registration</h3>
        <div className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-cyan-200/80">Team Name</span>
            <input required value={form.team} onChange={e=>setForm(v=>({...v,team:e.target.value}))} className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-cyan-200/80">Institution</span>
            <input required value={form.institution} onChange={e=>setForm(v=>({...v,institution:e.target.value}))} className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-cyan-200/80">Contact Email</span>
            <input type="email" required value={form.email} onChange={e=>setForm(v=>({...v,email:e.target.value}))} className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-cyan-200/80">Members (comma separated)</span>
            <input value={form.members} onChange={e=>setForm(v=>({...v,members:e.target.value}))} className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </label>

          <label className="flex items-center gap-2 text-sm text-cyan-200/80">
            <input type="checkbox" checked={captcha} onChange={e=>setCaptcha(e.target.checked)} className="accent-cyan-400" />
            I'm not a robot
          </label>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400">Cancel</button>
          <button disabled={!captcha||loading} className="px-4 py-2 rounded bg-cyan-500 text-[#071022] font-semibold hover:bg-cyan-400 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            {loading ? 'Submitting…' : ok ? 'Registered!' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
