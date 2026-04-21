import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { FEATURED_PROJECTS } from '../data/projects.js';

const HeroConstellation = lazy(() => import('../components/three/HeroConstellation.jsx'));

const SKILLS = {
  Programming:  ['Java', 'Solidity', 'JavaScript'],
  'Web Dev':    ['React.js', 'Node.js', 'Express.js', 'MERN Stack'],
  Blockchain:   ['Ethereum', 'Smart Contracts'],
  Frameworks:   ['Spring Boot'],
  Tools:        ['Git', 'Docker'],
  Cloud:        ['Microsoft Azure']
};

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setFeatured(FEATURED_PROJECTS);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-overlay" />
        <Suspense fallback={null}>
          <HeroConstellation />
        </Suspense>
        <div className="hero-gradient" />

        <div className="hero-content">
          <ScrollReveal className="fade-in" delay={200}>
            <h4 className="section-label" style={{ marginBottom: '20px' }}>
              Full Stack Developer
            </h4>
            <h1 className="overlay-title">BONDE YASH</h1>
            <cite style={{ marginTop: '16px', display: 'block' }}>
              Java · Blockchain · MERN Stack
            </cite>
            <div style={{
              marginTop: '36px',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {['Java', 'React', 'Node.js', 'Solidity', 'MongoDB'].map((tech) => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(165,180,252,0.5)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  padding: '5px 12px',
                  borderRadius: '2px'
                }}>{tech}</span>
              ))}
            </div>
            <div style={{ marginTop: '36px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/projects" className="button primary">View Projects</Link>
              <Link to="/contact"  className="button white">Get In Touch</Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="hero-scroll-indicator">
          <small>Scroll</small>
          <span />
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="module featured-projects-section">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <div className="wrap-text text-center">
              <h4 className="section-label">About</h4>
              <h2 className="promo-title mb-30">
                Final-Year Engineer · Builder · Blockchain Developer
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
                Final-year B.E. Computer Engineering student at Government Engineering College Dahod
                with a CGPA of 8.57. Strong foundation in Java, Blockchain, and full-stack web development.
                Built production-ready DApps, AI tools, and MERN applications. Currently working as a
                Node.js Developer at Freshcodes Technology.
              </p>
              <Link to="/about" className="more">Read More</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── SKILLS PREVIEW ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title text-center mb-40">Technical Skills</h2>
          </ScrollReveal>
          <div className="wrap-narrow">
            {Object.entries(SKILLS).map(([cat, tags], ci) => (
              <ScrollReveal key={cat} delay={ci * 80}>
                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '22px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      letterSpacing: '2.2px',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-green)',
                      minWidth: '130px',
                      paddingTop: '6px'
                    }}
                  >
                    {cat}
                  </span>
                  <div className="skills-grid">
                    {tags.map((t) => (
                      <span className="tag" key={t} style={{ fontSize: '11px', letterSpacing: '1.8px', padding: '6px 14px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={500}>
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link to="/skills" className="more">All Skills</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── FEATURED PROJECTS ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title text-center mb-40">Featured Projects</h2>
          </ScrollReveal>

          {featured.length > 0 ? (
            <div className="projects-row wrapper-grid featured-projects-row">
              {featured.map((p, i) => (
                <ScrollReveal key={p._id} delay={i * 120}>
                  <ProjectCard project={p} className="featured-project-card" />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="wrap-text text-center">
              <p className="muted">Loading projects…</p>
            </div>
          )}

          <ScrollReveal delay={400}>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Link to="/projects" className="button">All Projects</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title" style={{ color: '#fff' }}>Let's Build Something</h2>
            <p>
              Open to full-time roles, freelance projects, and blockchain collaborations.
            </p>
            <Link to="/contact" className="button white">Get In Touch</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
