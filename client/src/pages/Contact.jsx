import { lazy, Suspense } from 'react';
import ScrollReveal from '../components/ScrollReveal.jsx';
import ContactForm from '../components/ContactForm.jsx';

const ContactOrb3D = lazy(() => import('../components/three/ContactOrb3D.jsx'));

export default function Contact() {
  return (
    <>
      <div className="page-title-header">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h1 className="page-title">Contact</h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="line line-section" />

      <section className="module contact-ambient-section">
        <Suspense fallback={null}>
          <ContactOrb3D />
        </Suspense>
        <div className="wrap wrap-page">
          <div className="layout-50">
            {/* Left — Contact Info */}
            <div className="col-text contact-panel" style={{ paddingRight: 'calc(var(--gutter))' }}>
              <ScrollReveal>
                <h4 className="section-label">Get In Touch</h4>
                <h2 className="title mb-30">Let's Build Something Together</h2>

                <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
                  I'm open to full-time engineering roles, freelance projects, blockchain development
                  contracts, and interesting collaborations. Don't hesitate to reach out.
                </p>

                {[
                  {
                    label: 'Email',
                    value: 'yashbonde21@gmail.com',
                    href: 'mailto:yashbonde21@gmail.com'
                  },
                  {
                    label: 'Phone',
                    value: '+91 88495 52884',
                    href: 'tel:+918849552884'
                  },
                  {
                    label: 'Location',
                    value: 'Surat, Gujarat, India',
                    href: null
                  }
                ].map(({ label, value, href }) => (
                  <div className="contact-info-item" key={label}>
                    <span className="contact-info-label">{label}</span>
                    <span className="contact-info-value">
                      {href
                        ? <a href={href}>{value}</a>
                        : value
                      }
                    </span>
                  </div>
                ))}

                <div style={{ marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com/BondeYash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button accent small"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gecdhd-comp-yash-bonde/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button small"
                  >
                    LinkedIn
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Form */}
            <div className="col-text contact-panel contact-form-panel">
              <ScrollReveal delay={150}>
                <h4 className="section-label">Send a Message</h4>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="line line-section" />

      {/* Quote */}
      <section className="module">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <div className="wrap-narrow text-center">
              <blockquote className="big">
                "Code is not just syntax — it's a solution waiting to be discovered."
              </blockquote>
              <cite style={{ marginTop: '20px', display: 'block' }}>— Bonde Yash</cite>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
