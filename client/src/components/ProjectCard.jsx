import { useEffect, useRef, useState } from 'react';
import ProjectIllustration from './ProjectIllustration.jsx';

function Modal({ project, onClose }) {
  const [visible, setVisible] = useState(true);
  const closeBtnRef = useRef(null);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const previous = document.activeElement;
    closeBtnRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, []);

  return (
    <div
      className={`modal-backdrop${visible ? ' visible' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="modal-window" role="dialog" aria-modal="true" aria-label={project.title}>
        <button className="modal-close" onClick={close} aria-label="Close" ref={closeBtnRef}>×</button>

        <div style={{ width: '100%', height: '200px', overflow: 'hidden', marginBottom: '30px' }}>
          <ProjectIllustration title={project.title} gradient={project.gradient} />
        </div>

        <p className="modal-subtitle">{project.subtitle}</p>
        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-desc">{project.description}</p>

        <div className="skills-grid" style={{ marginBottom: '24px' }}>
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>

        <div className="modal-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button accent small"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button small"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`item-card ${className}`.trim()} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <div className="img-wrapper square">
          <div className="img-wrapper-inner project-illustration-wrap" role="img" aria-label={project.title}>
            <ProjectIllustration title={project.title} gradient={project.gradient} />
          </div>
        </div>
        <div className="card-body">
          <p className="card-subtitle">{project.subtitle}</p>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description.slice(0, 75)}…</p>
          <div className="skills-grid">
            {project.tags.slice(0, 3).map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <button
            className="more mt-10"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            View Details
          </button>
        </div>
      </div>

      {open && <Modal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
