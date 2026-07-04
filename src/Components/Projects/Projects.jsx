import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import projects from "./projectsData";
import "./Projects.css";

// ─── Media carousel (screenshots / showcase video) ───────────────────────────

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0, scale: 0.96 }),
};

function MediaCarousel({ media, title }) {
  const [[index, direction], setSlide] = useState([0, 0]);

  const go = (dir) =>
    setSlide(([i]) => [(i + dir + media.length) % media.length, dir]);

  const item = media[index];

  return (
    <div className="pj-media">
      <div className="pj-media-frame">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={index}
            className="pj-media-item"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {item.type === "video" ? (
              <video src={item.src} autoPlay muted loop playsInline />
            ) : (
              <img
                src={item.src}
                alt={`${title} — screenshot ${index + 1}`}
                draggable="false"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {media.length > 1 && (
        <>
          <button
            className="pj-media-nav pj-media-nav--prev"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
          >
            <ChevronIcon />
          </button>
          <button
            className="pj-media-nav pj-media-nav--next"
            onClick={() => go(1)}
            aria-label="Next screenshot"
          >
            <ChevronIcon flipped />
          </button>

          <div className="pj-media-dots">
            {media.map((_, i) => (
              <button
                key={i}
                className={i === index ? "pj-dot pj-dot--on" : "pj-dot"}
                onClick={() => setSlide([i, i > index ? 1 : -1])}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Expandable tech list ─────────────────────────────────────────────────────

function TechAccordion({ tech }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pj-tech">
      <button
        className={`pj-tech-toggle ${open ? "pj-tech-toggle--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Tech <ChevronDownIcon />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="pj-tech-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="pj-card-tech">
              {tech.map((t) => (
                <span key={t} className="pj-tech-pill">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stacked card ─────────────────────────────────────────────────────────────

function StackedCard({ project, index, total, stackProgress }) {
  // As the next card slides over this one, gently scale it down and dim it
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(stackProgress, [rangeStart, 1], [1, targetScale]);
  const dim = useTransform(stackProgress, [rangeEnd - 0.08, rangeEnd], [0, index === total - 1 ? 0 : 0.55]);

  return (
    <div className="pj-card-pin">
      <motion.article className="pj-card" style={{ scale }}>
        <div className="pj-card-info">
          <span className="pj-card-index">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            <i className="pj-index-line" />
            {project.year}
          </span>

          <h3 className="pj-card-title">{project.title}</h3>

          <ul className="pj-points">
            {project.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>

          <TechAccordion tech={project.techStack} />

          <div className="pj-card-links">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-btn pj-btn--ghost"
            >
              <GitHubIcon /> GitHub
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-btn pj-btn--solid"
              >
                Live <ArrowUpRight />
              </a>
            )}
          </div>
        </div>

        <MediaCarousel media={project.media} title={project.title} />

        <motion.div className="pj-card-dim" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="pj-section" id="projects">
      <header className="pj-header">
        <span className="pj-kicker">Selected Work</span>
        <h2 className="pj-heading">Projects</h2>
        <p className="pj-sub">scroll — one project at a time</p>
      </header>

      <div className="pj-stack" ref={stackRef}>
        {projects.map((p, i) => (
          <StackedCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            stackProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="pj-more">
        <a
          href="https://github.com/NileshAmbekarr?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="pj-btn pj-btn--ghost"
        >
          <GitHubIcon /> More on GitHub&hellip;
        </a>
      </div>
    </section>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronIcon({ flipped = false }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
