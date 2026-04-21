import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal.jsx';
import ProjectIllustration from '../components/ProjectIllustration.jsx';
import { PROJECTS_DATA } from '../data/projects.js';

const ProjectsSpine3D = lazy(() => import('../components/three/ProjectsSpine3D.jsx'));

const FILTERS = ['ALL', 'AI', 'BLOCKCHAIN', 'MERN', 'JAVA', 'MOBILE'];

function ProjectDetailsModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeBtnRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="projects-modal-backdrop"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="projects-modal-window"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <button className="projects-modal-close" onClick={onClose} aria-label="Close project details" ref={closeBtnRef}>
            ×
          </button>
          <div className="projects-modal-media">
            <ProjectIllustration title={project.title} gradient={project.gradient} />
          </div>
          {project.subtitle ? <p className="projects-modal-subtitle">{project.subtitle}</p> : null}
          <h2 className="projects-modal-title">{project.title}</h2>
          <p className="projects-modal-description">{project.description}</p>
          <div className="projects-modal-tags">
            {(project.tags || []).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="projects-modal-actions">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button accent small">
                GitHub
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button small">
                Live Demo
              </a>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const treeRef = useRef(null);
  const progressRef = useRef(0);
  const [allProjects, setAllProjects] = useState([]);
  const [active, setActive]     = useState('ALL');
  const [loading, setLoading]   = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: treeRef,
    offset: ['start 85%', 'end 20%'],
  });

  const trunkScaleY = useTransform(scrollYProgress, [0, 1], [0.02, 1]);
  const trunkGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '92%']);
  const leftTrackY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const rightTrackY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (value) => {
      progressRef.current = value;
    });
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    setLoading(true);
    setAllProjects(PROJECTS_DATA);
    setLoading(false);
  }, []);

  const projects = useMemo(() => {
    if (active === 'ALL') return allProjects;
    return allProjects.filter((project) => project.category?.includes(active));
  }, [allProjects, active]);

  return (
    <>
      <div className="page-title-header">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <h1 className="page-title">Projects</h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="line line-section" />

      <div className="projects-tabs-wrap">
        <div className="wrap wrap-page">
          <ScrollReveal>
            <div className="filter-bar projects-filter-bar">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`tag filter-tag${active === f ? ' active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {loading ? (
        <div className="wrap-text text-center">
          <p className="muted" style={{ padding: '80px 0' }}>Loading projects…</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="wrap-text text-center">
          <p className="muted" style={{ padding: '80px 0' }}>No projects found in this category.</p>
        </div>
      ) : (
        <section className="projects-simple-section">
          <div className="wrap wrap-page">
            <div className="projects-tree" ref={treeRef}>
              <motion.div className="projects-tree-line" aria-hidden style={{ scaleY: trunkScaleY, transformOrigin: 'top center' }} />
              <motion.div className="projects-tree-line-glow" aria-hidden style={{ top: trunkGlowY }} />
              <Suspense fallback={null}>
                <ProjectsSpine3D progressRef={progressRef} />
              </Suspense>
              {projects.map((project, index) => (
                <motion.article
                  className={`projects-tree-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  key={project._id ?? `${project.title}-${index}`}
                  style={{ y: index % 2 === 0 ? leftTrackY : rightTrackY }}
                  initial={{ opacity: 0, y: 48, rotate: index % 2 === 0 ? -1.4 : 1.4 }}
                  whileInView={{ opacity: 1, y: index % 2 === 0 ? -4 : 4, rotate: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                >
                  <button className="projects-simple-card projects-tree-card-btn" onClick={() => setSelectedProject(project)}>
                    <span className="projects-tree-dot" aria-hidden />
                    <span className="projects-tree-branch" aria-hidden />
                    <div className="projects-simple-media">
                      <ProjectIllustration title={project.title} gradient={project.gradient} />
                    </div>

                    <div className="projects-simple-body">
                      {project.subtitle ? (
                        <p className="projects-simple-subtitle">{project.subtitle}</p>
                      ) : null}
                      <h2 className="projects-simple-title">{project.title}</h2>
                      <p className="projects-simple-description">{project.description}</p>

                      <div className="projects-simple-tags">
                        {(project.tags || []).slice(0, 4).map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>

                      <span className="projects-tree-view">View Project Details</span>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
