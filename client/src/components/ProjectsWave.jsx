import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import ProjectIllustration from './ProjectIllustration'

// ─── constants ───────────────────────────────────────────────────────────────
const SECTION_VH = 160
const BG_COLORS  = [
  '#eef0ff', '#edfff5', '#fff5ee',
  '#eef6ff', '#f8eeff', '#eefffc',
]

// ─── WaveDecorator ────────────────────────────────────────────────────────────
function WaveDecorator({ waveY }) {
  return (
    <motion.div
      aria-hidden
      className="wave-decorator"
      style={{ y: waveY }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '110px', display: 'block' }}
      >
        <path
          d="M 0 55 C 180 10 360 100 540 55 C 720 10 900 100 1080 55
             C 1260 10 1380 80 1440 55 L 1440 110 L 0 110 Z"
          fill="rgba(99,102,241,0.06)"
        />
        <path
          d="M 0 55 C 180 10 360 100 540 55 C 720 10 900 100 1080 55
             C 1260 10 1380 80 1440 55"
          fill="none"
          stroke="rgba(99,102,241,0.28)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 0 66 C 200 28 400 95 600 66 C 800 28 1000 90 1200 66
             C 1320 42 1400 76 1440 66"
          fill="none"
          stroke="rgba(165,180,252,0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

// ─── ProjectSlide — direct DOM updates (no WAAPI on slide children) ──────────
function ProjectSlide({ project, index, n, isActive }) {
  return (
    <motion.div
      className="wave-project-section"
      style={{
        zIndex:       isActive ? n + 2 : index + 1,
        opacity:      isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* ── left: text ── */}
      <motion.div
        className="wave-project-content"
        initial={false}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {project.subtitle && (
          <span className="wave-project-category">{project.subtitle}</span>
        )}

        <h2 className="wave-project-title">{project.title}</h2>

        <p className="wave-project-description">{project.description}</p>

        {project.tags?.length > 0 && (
          <div className="wave-tags">
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="wave-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="wave-cta">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="wave-btn wave-btn--primary"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="wave-btn wave-btn--secondary"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>

      {/* ── right: illustration ── */}
      <motion.div
        className="wave-project-visual"
        initial={false}
        animate={isActive ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: 40, filter: 'blur(8px)' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="wave-illustration-frame">
          <ProjectIllustration
            title={project.title}
            gradient={project.gradient}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── ProjectsWave ─────────────────────────────────────────────────────────────
export default function ProjectsWave({ projects }) {
  const containerRef  = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const n = projects.length

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end end'],
  })

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping:   20,
    restDelta: 0.001,
  })

  const waveY = useTransform(
    springProgress,
    [0, 1],
    [-140, (typeof window !== 'undefined' ? window.innerHeight : 800) + 140],
  )

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setActiveIndex(Math.min(Math.floor(v * n), n - 1))
    })
    return unsub
  }, [scrollYProgress, n])

  useEffect(() => {
    setActiveIndex(0)
  }, [projects])

  const scrollToProject = useCallback(
    (i) => {
      const el = containerRef.current
      if (!el) return
      const absTop     = el.getBoundingClientRect().top + window.scrollY
      const scrollable = el.offsetHeight - window.innerHeight
      window.scrollTo({ top: absTop + (i / n) * scrollable, behavior: 'smooth' })
    },
    [n],
  )

  if (!n) return null

  return (
    <div
      ref={containerRef}
      className="projects-wave-root"
      style={{ height: `${n * SECTION_VH}vh` }}
    >
      <div className="projects-wave-sticky">

        {/* animated background tint */}
        <motion.div
          className="wave-bg"
          animate={{ backgroundColor: BG_COLORS[activeIndex % BG_COLORS.length] }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* scroll-linked wave SVG */}
        <WaveDecorator waveY={waveY} />

        {/* vertical progress bar */}
        <div className="wave-progress-track" aria-hidden>
          <motion.div
            className="wave-progress-fill"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />
        </div>

        {/* all slides — visibility driven by direct DOM updates */}
        {projects.map((project, i) => (
          <ProjectSlide
            key={project._id ?? i}
            project={project}
            index={i}
            n={n}
            isActive={i === activeIndex}
          />
        ))}

        {/* animated counter */}
        <div className="wave-counter" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              className="wave-counter-current"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, y: 10,   transition: { duration: 0.18 } }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="wave-counter-sep">/</span>
          <span className="wave-counter-total">{String(n).padStart(2, '0')}</span>
        </div>

        {/* nav dots */}
        <nav className="wave-nav-dots" aria-label="Project navigation">
          {projects.map((p, i) => (
            <button
              key={p._id ?? i}
              className={`wave-dot${i === activeIndex ? ' wave-dot--active' : ''}`}
              onClick={() => scrollToProject(i)}
              aria-label={`Go to ${p.title}`}
              title={p.title}
            />
          ))}
        </nav>

        {/* scroll hint — first project only */}
        <AnimatePresence>
          {activeIndex === 0 && (
            <motion.div
              className="wave-scroll-hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.5, y: 0, transition: { delay: 1.4, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
                <rect x="5.5" y="1" width="7" height="12" rx="3.5"
                  stroke="currentColor" strokeWidth="1.4"/>
                <rect x="7.5" y="4" width="3" height="4" rx="1.5"
                  fill="currentColor">
                  <animate attributeName="y" values="4;7;4" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/>
                </rect>
                <path d="M 9 17 L 9 26 M 6 23 L 9 26 L 12 23"
                  stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>scroll</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
