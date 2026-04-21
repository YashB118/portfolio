import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      {/* Desktop */}
      <div className="footer-desktop">
        <div className="footer-inner">
          <div className="footer-row">
            <div className="footer-col">
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '2px', fontSize: '14px' }}>
                Bonde Yash
              </span>
            </div>
            <div className="footer-col">
              <span>© {year}</span>
            </div>
          </div>
          <div className="footer-row" style={{ marginTop: '20px' }}>
            <div className="footer-col">
              <a href="mailto:yashbonde21@gmail.com" className="muted">yashbonde21@gmail.com</a>
            </div>
            <div className="footer-col">
              <span className="muted">Surat, Gujarat, India</span>
            </div>
            <div className="footer-col">
              <span className="muted">Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="footer-mobile">
        <p style={{ marginBottom: '10px', fontFamily: 'var(--font-serif)', letterSpacing: '1px', fontSize: '14px' }}>
          Bonde Yash
        </p>
        <p className="muted" style={{ fontSize: '10px', letterSpacing: '2px', marginBottom: '15px' }}>
          Full Stack Developer — Surat, India
        </p>
        <ul className="footer-links" style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <p className="muted" style={{ fontSize: '10px', marginTop: '15px', letterSpacing: '2px' }}>
          © {year}
        </p>
      </div>
    </footer>
  );
}
