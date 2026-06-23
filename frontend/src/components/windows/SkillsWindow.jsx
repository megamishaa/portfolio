import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PixelWindow from "../ui/PixelWindow";

const FALLBACK = {
  frontend: [
    { name: "React", icon: "[]", level: 95 },
    { name: "TypeScript", icon: "</>", level: 90 },
    { name: "Next.js", icon: ">>", level: 85 },
    { name: "Tailwind", icon: "##", level: 92 },
    { name: "Canvas API", icon: "OO", level: 80 },
    { name: "Framer Motion", icon: "~~", level: 78 },
  ],
  backend: [
    { name: "Node.js", icon: "JS", level: 92 },
    { name: "Python", icon: "PY", level: 88 },
    { name: "Go", icon: "GO", level: 72 },
    { name: "PostgreSQL", icon: "DB", level: 85 },
    { name: "Redis", icon: "RD", level: 80 },
    { name: "GraphQL", icon: "GQ", level: 75 },
  ],
  tools: [
    { name: "Docker", icon: "DK", level: 88 },
    { name: "Git", icon: "GT", level: 95 },
    { name: "Linux", icon: "LX", level: 85 },
    { name: "AWS", icon: "AW", level: 78 },
    { name: "Nginx", icon: "NX", level: 80 },
    { name: "Figma", icon: "FG", level: 70 },
  ],
};

/* map categories → your theme */
const CATEGORY_COLORS = {
  frontend: "var(--primary)",
  backend: "var(--secondary)",
  tools: "var(--ink-soft)",
};

function SkillRow({ skill, color, animate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 98px 1fr 30px",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        border: "2px solid var(--line)",
        background: "var(--paper)",
      }}
    >
      {/* icon */}
      <span
        style={{
          color: "var(--ink)",
          fontSize: 9,
          display: "inline-flex",
          width: 22,
          height: 22,
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid var(--line)",
        }}
      >
        {skill.icon}
      </span>

      {/* name */}
      <span
        style={{
          fontSize: 10,
          color: "var(--ink)",
          letterSpacing: "0.05em",
        }}
      >
        {skill.name}
      </span>

      {/* progress */}
      <div className="pixel-progress">
        <motion.div
          className="pixel-progress-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.level}%` : 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        />
      </div>

      {/* % */}
      <span
        style={{
          fontSize: 9,
          color: "var(--ink-soft)",
          textAlign: "right",
        }}
      >
        {skill.level}
      </span>
    </div>
  );
}

export default function SkillsWindow() {
  const [skills, setSkills] = useState(FALLBACK);
  const [active, setActive] = useState("frontend");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setSkills(d.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(timer);
  }, [active]);

  const categories = Object.keys(skills);

  return (
    <PixelWindow id="skills" title="SKILLS.DB">
      <div
        style={{
          padding: "12px 16px",
          fontSize: 11,
          color: "var(--ink)",
        }}
      >
        {/* tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 14,
            borderBottom: "2px solid var(--line)",
            paddingBottom: 6,
          }}
        >
          {categories.map((cat) => {
            const color = CATEGORY_COLORS[cat] || "var(--primary)";
            const isActive = active === cat;

            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                type="button"
                style={{
                  background: isActive ? color : "var(--paper)",
                  color: isActive ? "white" : "var(--ink)",
                  border: "2px solid var(--line)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  padding: "6px 12px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  boxShadow: "2px 2px 0 var(--line)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* label */}
        <div
          style={{
            fontSize: 9,
            color: "var(--ink-soft)",
            letterSpacing: "0.15em",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Loaded category: {active}
        </div>

        {/* skills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(skills[active] || []).map((skill) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              color={CATEGORY_COLORS[active]}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </PixelWindow>
  );
}
