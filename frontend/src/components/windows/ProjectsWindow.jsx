import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelWindow from "../ui/PixelWindow";

/* map statuses → theme colors */
const STATUS_COLORS = {
  DEPLOYED: "var(--primary)",
  ACTIVE: "var(--secondary)",
  BETA: "var(--ink-soft)",
  ARCHIVE: "var(--red)",
};

const FALLBACK = [
  {
    id: 1,
    title: "NEURAL_DASH",
    description: "Real-time analytics dashboard powered by ML. 10k events/sec.",
    tech: ["React", "Python", "TensorFlow"],
    link: "#",
    status: "DEPLOYED",
    year: "2024",
  },
  {
    id: 2,
    title: "CIPHER_API",
    description: "Zero-trust auth microservice. JWT plus refresh rotation.",
    tech: ["Node.js", "Express", "PostgreSQL"],
    link: "#",
    status: "ACTIVE",
    year: "2024",
  },
  {
    id: 3,
    title: "PIXEL_FORGE",
    description: "Browser-based pixel art editor with animation timeline.",
    tech: ["React", "Canvas API", "IndexedDB"],
    link: "#",
    status: "BETA",
    year: "2023",
  },
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const color = STATUS_COLORS[project.status] || "var(--primary)";

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{
          width: 440,
          background: "var(--paper)",
          border: "3px solid var(--line)",
          boxShadow: "6px 6px 0 var(--line)",
          color: "var(--ink)",
        }}
        initial={{ scale: 0.94, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          style={{
            background: color,
            color: "white",
            padding: "6px 10px",
            borderBottom: "3px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: 11,
          }}
        >
          <span>{project.title}</span>

          <button
            onClick={onClose}
            type="button"
            style={{
              background: "var(--paper)",
              border: "2px solid var(--line)",
              color: "var(--ink)",
              cursor: "pointer",
              width: 22,
              height: 22,
              boxShadow: "2px 2px 0 var(--line)",
            }}
          >
            X
          </button>
        </div>

        {/* body */}
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, lineHeight: 1.8, marginBottom: 16 }}>
            {project.description}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 16,
            }}
          >
            {project.tech.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 9,
                  padding: "4px 8px",
                  border: "2px solid var(--line)",
                  background: "white",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, color: "var(--ink-soft)" }}>
              YEAR: {project.year}
            </span>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn"
            >
              VIEW
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsWindow() {
  const [projects, setProjects] = useState(FALLBACK);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setProjects(d.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PixelWindow id="projects" title="PROJECTS.LOG">
        <div
          style={{
            padding: "12px 14px",
            fontSize: 11,
            color: "var(--ink)",
          }}
        >
          {/* header */}
          <div
            style={{
              fontSize: 9,
              color: "var(--ink-soft)",
              letterSpacing: "0.15em",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            {projects.length} entries found
          </div>

          {/* list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {projects.map((project, i) => {
              const color = STATUS_COLORS[project.status] || "var(--primary)";

              return (
                <motion.button
                  key={project.id}
                  onClick={() => setSelected(project)}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    border: "2px solid var(--line)",
                    padding: "10px 12px",
                    cursor: "pointer",
                    background: "var(--paper)",
                    textAlign: "left",
                    boxShadow: "3px 3px 0 var(--line)",
                  }}
                >
                  {/* top row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color,
                        letterSpacing: "0.12em",
                        fontSize: 11,
                      }}
                    >
                      {project.title}
                    </span>

                    <span
                      style={{
                        fontSize: 8,
                        padding: "2px 6px",
                        border: "2px solid var(--line)",
                        background: color,
                        color: "white",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* desc */}
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: 10,
                      lineHeight: 1.6,
                      marginBottom: 7,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: 8,
                          padding: "2px 5px",
                          background: "white",
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </PixelWindow>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
