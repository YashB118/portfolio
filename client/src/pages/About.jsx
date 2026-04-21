import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import Accordion from '../components/Accordion.jsx';

const AboutMonolith3D = lazy(() => import('../components/three/AboutMonolith3D.jsx'));

const CERTS = [
  'Java Data Structure and Algorithm',
  'Ethereum and Solidity: Complete Developer\'s Guide',
  'Solana Blockchain Developer Program',
  'Java Spring Framework 6 with Spring Boot',
  'Microsoft Certified: Azure Fundamentals',
  'Udemy Labs — Docker · SWARM · Hands-on · DevOps'
];

const certAccordion = CERTS.map((c) => ({
  title: c,
  content: (
    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.7' }}>
      Completed certification course covering core concepts, hands-on labs, and real-world applications.
    </p>
  )
}));

export default function About() {
  return (
    <>
      {/* ── PAGE TITLE ── */}
      <div className="page-title-header">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h1 className="page-title">About</h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="line line-section" />

      {/* ── PROFILE SECTION ── */}
      <section className="module about-ambient-section">
        <div className="wrap wrap-page">
          <div className="layout-50 about-hero-grid">
            <div className="col-img hide-mobile">
              <div className="col-img-inner profile-image-wrapper">
                <Suspense fallback={null}>
                  <AboutMonolith3D />
                </Suspense>
                <div className="profile-initials">YB</div>
                <div className="profile-status-badge">
                  <span className="profile-status-dot" />
                  Available for Work
                </div>
              </div>
            </div>
            <div className="col-text">
              <ScrollReveal>
                <h4 className="section-label">Profile</h4>
                <h2 className="title mb-20">Full Stack Developer</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
                  Final-year B.E. Computer Engineering student with strong skills in Java and Blockchain development.
                  Built multiple blockchain-based projects using Ethereum, Solidity and smart contracts.
                  Proficient in Java, OOPs, multithreading, collections and Spring Boot.
                  Currently working as a Node.js Developer at Freshcodes Technology, Surat.
                </p>

                <div>
                  {[
                    { label: 'Email',    value: 'yashbonde21@gmail.com',  href: 'mailto:yashbonde21@gmail.com' },
                    { label: 'Phone',    value: '+91 8849552884',          href: 'tel:+918849552884' },
                    { label: 'Location', value: 'Surat, Gujarat, India',   href: null },
                    { label: 'GitHub',   value: 'github.com/BondeYash',    href: 'https://github.com/BondeYash' },
                    { label: 'LinkedIn', value: 'linkedin.com/in/gecdhd-comp-yash-bonde', href: 'https://www.linkedin.com/in/gecdhd-comp-yash-bonde/' }
                  ].map(({ label, value, href }) => (
                    <div className="contact-info-item" key={label}>
                      <span className="contact-info-label">{label}</span>
                      <span className="contact-info-value">
                        {href
                          ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{value}</a>
                          : value
                        }
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <Link to="/contact" className="button primary">Get In Touch</Link>
                  <Link to="/projects" className="button">View Projects</Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── EDUCATION ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Education</h2>
          </ScrollReveal>
          <div className="wrap-narrow about-timeline-wrap">
            <ScrollReveal delay={100}>
              <div className="timeline">
                <TimelineItem
                  date="September 2023 – Present"
                  location="Dahod, India"
                  title="B.E. Computer Engineering"
                  org="Government Engineering College Dahod"
                  cgpa="8.57"
                />
                <TimelineItem
                  date="May 2020 – August 2023"
                  location="Bharuch, India"
                  title="Diploma — Computer Engineering"
                  org="Shree KJ Polytechnic Bharuch"
                  cgpa="9.28"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── EXPERIENCE ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Experience</h2>
          </ScrollReveal>
          <div className="wrap-narrow about-timeline-wrap">
            <ScrollReveal delay={100}>
              <div className="timeline">
                <TimelineItem
                  date="November 2025 – Present"
                  location="Surat, Gujarat, India"
                  title="Node.js Developer"
                  org="Freshcodes Technology"
                  description="Developing and maintaining server-side applications using Node.js for scalable backend solutions."
                />
                <TimelineItem
                  date="July 2025"
                  location="Remote"
                  title="Microsoft Azure Cloud Fundamentals"
                  org="Micro Internship at Microsoft"
                  description="Gained experience working on the Azure Platform and learned about Cloud Computing fundamentals."
                />
                <TimelineItem
                  date="Polytechnic Final Year"
                  location="Bharuch, India"
                  title="Women Safety Android Application"
                  org="Final Year Project"
                  description="Developed an Android application for women's safety with emergency alerts and location sharing features."
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── AWARDS ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Awards</h2>
          </ScrollReveal>
          <div className="wrap-narrow about-awards-wrap">
            <ScrollReveal delay={100}>
              <div className="award-item">
                <div>
                  <p className="award-name">Dewang Mehta IT Awards 2025</p>
                  <p className="award-subtitle">Topper of GECD</p>
                </div>
                <p className="award-date">August 7, 2025</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* ── CERTIFICATIONS ── */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h2 className="title mb-40">Certifications</h2>
          </ScrollReveal>
          <div className="wrap-narrow">
            <ScrollReveal delay={100}>
              <Accordion items={certAccordion} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
