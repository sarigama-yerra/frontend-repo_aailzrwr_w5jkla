ROBO-HEIST: LOS SANTOS — Cinematic Robotics Event Landing

Overview
A high-fidelity landing experience inspired by GTA V loading screens: dark, cinematic, cool greys with cyan highlights, immersive motion, and responsive design. Includes choreographed animations, parallax hero with a 3D Spline scene, interactive panels (Countdown, Team Registration, Leaderboard), and a small mock backend.

What you get
- Immersive hero with layered parallax and Spline 3D scene
- Animated title with stroke reveal (anime.js)
- Three interactive panels styled like in‑game tiles
  - Live countdown (digit flip)
  - Team registration modal (mock API)
  - Leaderboard (dynamic, animated)
- Accessibility: keyboard focus, reduced motion support, semantic landmarks
- Performance-minded: GPU-accelerated transforms, image optimization hooks
- Ready to host frontend on Vercel

Quickstart
1) Clone and install
- git clone <your-repo>
- cd <repo>
- npm install

2) Configure environment
- Copy .env.local.example to .env and set values as needed
  - VITE_BACKEND_URL=http://localhost:8000
  - VITE_COUNTDOWN_TARGET=2025-12-20T10:00:00

3) Run locally
- Terminal A (frontend): npm run dev (starts on http://localhost:3000)
- Terminal B (backend): Python FastAPI server already configured here, runs on port 8000 in this environment.

Build
- npm run build
- npm run preview

Deploy to Vercel (Frontend)
- Push repository to GitHub
- Import the repo on Vercel as a Vite (Static) project
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm install
- Environment Variables:
  - VITE_BACKEND_URL: your backend URL (e.g., https://api.yourdomain.com)
  - VITE_COUNTDOWN_TARGET: 2025-12-20T10:00:00 (or your date)
- Redeploy after changes

Backend (Mock API) Endpoints
- GET /api/leaderboard → { teams: [{ id, team, score }] }
- POST /api/register → { ok: true, team: { id, team, score } }
- GET /test → { backend: "✅ Running", database: "🧪 Mock (in-memory)" }

You can deploy the backend separately (Render/Fly/railway) and set VITE_BACKEND_URL for the frontend. For a single Vercel-only deployment, migrate these endpoints into Next.js API routes.

Hero Background Asset
- Place your hero background image at public/hero.webp for best performance
- The page also renders a 3D Spline scene: https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode

Design & Aesthetic
- Color tokens via CSS vars (tunable):
  - --bg: #071022
  - --cyan: #00E5FF
  - --cyan-2: #00CFFF
- Typography
  - Headings: Anton or Bebas Neue (fallbacks provided)
  - Body: Inter
- Glass panels: glossy + thin cyan borders, neon rim glow on hover

Animations & Motion
- anime.js timelines for page entry + title stroke reveal + panel hover micro‑interactions
- IntersectionObserver pattern available for progressive reveals (hook-ready)
- requestAnimationFrame for parallax loop with translate3d and will-change
- Reduced motion: respects prefers-reduced-motion to disable non‑essential effects

Accessibility
- Skip link, focus rings, ARIA roles and labels
- Keyboard navigable modal + controls

Performance Budget
- Use webp for hero, lazy progressive effects, GPU transforms, small bundles
- Lighthouse baseline target ≥ 90 (avoid heavy third‑party scripts)

SEO & Meta
- Title and meta tags configured; add Open Graph preview pointing to public/hero.webp

Testing (optional)
- Add Jest + React Testing Library; focus on animation hooks and panel interactions

Vercel deployment checklist
- Branch: main
- Framework preset: Vite
- Build command: npm run build
- Output directory: dist
- Environment variables set for production

Notes
- To adopt a pure Next.js stack with API routes, move these UI components into app/pages and port the mock endpoints to /pages/api/register.ts and /pages/api/leaderboard.ts. Tailwind config and components remain compatible.
