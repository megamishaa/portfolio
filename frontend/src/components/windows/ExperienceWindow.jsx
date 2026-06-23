import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PixelWindow from "../ui/PixelWindow";

const FALLBACK = [
  {
    id: 1,
    role: "SENIOR FRONTEND ENGINEER",
    company: "AXIOM_SYSTEMS",
    period: "2022 - PRESENT",
    duration: "2+ YRS",
    description:
      "Lead engineer on core product. Architected component library. Reduced bundle size by 40%.",
    tags: ["React", "TypeScript", "GraphQL"],
    status: "CURRENT",
  },
  {
    id: 2,
    role: "FULLSTACK DEVELOPER",
    company: "NOVA_TECH_LAB",
    period: "2020 - 2022",
    duration: "2 YRS",
    description:
      "Real-time collaboration for SaaS. WebSocket infra serving 50k concurrent users.",
    tags: ["Node.js", "React", "WebSocket"],
    status: "PAST",
  },
  {
    id: 3,
    role: "BACKEND DEVELOPER",
    company: "CIPHER_IO",
    period: "2019 - 2020",
    duration: "1 YR",
    description:
      "REST API for fintech startup. Transaction pipeline handling $2M daily volume.",
    tags: ["Python", "Django", "PostgreSQL"],
    status: "PAST",
  },
];

export default function ExperienceWindow() {
  const [experience, setExperience] = useState(FALLBACK);

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setExperience(d.data);
      })
      .catch(() => {});
  }, []);

  return (
    <PixelWindow id="experience" title="CAREER.LOG">
      <div
        style={{
          padding: "12px 16px",
          fontSize: 11,
          color: "var(--ink)",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 9,
            color: "var(--ink-soft)",
            letterSpacing: "0.15em",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          Career timeline
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 22 }}>
          {/* vertical line */}
          <div
            style={{
              position: "absolute",
              left: 7,
              top: 8,
              bottom: 8,
              width: 3,
              background: "var(--primary)",
            }}
          />

          {experience.map((item, i) => {
            const isCurrent = item.status === "CURRENT";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  position: "relative",
                  marginBottom: i < experience.length - 1 ? 20 : 0,
                }}
              >
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -19,
                    top: 6,
                    width: 11,
                    height: 11,
                    background: isCurrent ? "var(--primary)" : "var(--paper)",
                    border: "2px solid var(--line)",
                  }}
                />

                {/* card */}
                <div
                  style={{
                    border: "2px solid var(--line)",
                    padding: "10px 12px",
                    background: "var(--paper)",
                    boxShadow: "3px 3px 0 var(--line)",
                  }}
                >
                  {/* top row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 4,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: isCurrent ? "var(--primary)" : "var(--ink)",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          marginBottom: 2,
                        }}
                      >
                        {item.role}
                      </div>

                      <div
                        style={{
                          color: "var(--ink-soft)",
                          fontSize: 10,
                        }}
                      >
                        {item.company}
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 9,
                          color: "var(--ink-soft)",
                        }}
                      >
                        {item.period}
                      </div>

                      <div
                        style={{
                          fontSize: 9,
                          color: "var(--secondary)",
                          marginTop: 2,
                        }}
                      >
                        {item.duration}
                      </div>
                    </div>
                  </div>

                  {/* description */}
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: 10,
                      lineHeight: 1.7,
                      margin: "8px 0",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 8,
                          padding: "2px 6px",
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                          background: "var(--paper)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PixelWindow>
  );
}
