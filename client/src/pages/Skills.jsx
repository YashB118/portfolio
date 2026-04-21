import ScrollReveal from '../components/ScrollReveal.jsx';
import Accordion from '../components/Accordion.jsx';

const SKILL_GROUPS = [
  {
    title: 'Programming Languages',
    skills: ['Java', 'Solidity', 'JavaScript']
  },
  {
    title: 'Web Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'MERN Stack', 'HTML5', 'CSS3']
  },
  {
    title: 'Blockchain Development',
    skills: ['Ethereum', 'Smart Contracts', 'Solana', 'Web3.js', 'Hardhat', 'OpenZeppelin']
  },
  {
    title: 'Frameworks',
    skills: ['Spring Boot', 'Spring Framework 6']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'Docker', 'Docker Swarm']
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Version Control', 'Postman', 'MongoDB Compass']
  }
];

const accordionItems = SKILL_GROUPS.map((g) => ({
  title: g.title,
  content: (
    <div className="skills-grid">
      {g.skills.map((s) => (
        <span className="tag" key={s}>{s}</span>
      ))}
    </div>
  )
}));

const LANGS = ['English', 'Hindi', 'Marathi', 'Gujarati'];

export default function Skills() {
  return (
    <>
      <div className="page-title-header">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h1 className="page-title">Skills</h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="line line-section" />

      {/* ── SKILLS ACCORDION ── */}
      <section className="module skills-ambient-section">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Technical Skills</h2>
          </ScrollReveal>
          <div className="wrap-narrow">
            <ScrollReveal delay={100}>
              <Accordion items={accordionItems} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── CERTIFICATIONS OVERVIEW ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Certifications</h2>
          </ScrollReveal>
          <div className="wrap-narrow skills-cert-wrap">
            {[
              { name: 'Java Data Structure and Algorithm',        issuer: 'Udemy' },
              { name: 'Ethereum and Solidity: Complete Guide',    issuer: 'Udemy' },
              { name: 'Solana Blockchain Developer Program',      issuer: 'Udemy' },
              { name: 'Java Spring Framework 6 with Spring Boot', issuer: 'Udemy' },
              { name: 'Microsoft Certified: Azure Fundamentals',  issuer: 'Microsoft' },
              { name: 'Docker · SWARM · Hands-on · DevOps',       issuer: 'Udemy' }
            ].map((c, i) => (
              <ScrollReveal key={c.name} delay={i * 60}>
                <div
                  className="skills-cert-row"
                  style={{
                    display: 'table',
                    width: '100%',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <span
                    style={{
                      display: 'table-cell',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-primary)',
                      verticalAlign: 'middle'
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      display: 'table-cell',
                      textAlign: 'right',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-green)',
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {c.issuer}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── LANGUAGES ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Languages</h2>
          </ScrollReveal>
          <div className="wrap-narrow">
            <ScrollReveal delay={100}>
              <div className="skills-grid">
                {LANGS.map((l) => (
                  <span className="tag" key={l}>{l}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
