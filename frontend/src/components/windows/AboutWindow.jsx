import { motion } from "framer-motion";
import PixelWindow from "../ui/PixelWindow";

const INFO_ROWS = [
  { label: "NAME", value: "MEESHA GAMBHIR" },
  { label: "ROLE", value: "FULLSTACK ENGINEER" },
  { label: "STATUS", value: "AVAILABLE FOR HIRE" },
  { label: "LOCATION", value: "DELHI, INDIA" },
  {
    label: "EMAIL",
    value: "meeshagambhir@gmail.com",
    link: "mailto:meeshagambhir@gmail.com",
  },
  {
    label: "GITHUB",
    value: "github.com/megamishaa",
    link: "https://github.com/megamishaa",
  },
];

export default function AboutWindow() {
  return (
    <PixelWindow id="about" title="ABOUT.TXT">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          padding: "14px 16px",
          fontSize: 12,
          color: "var(--ink)",
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            display: "flex",
            gap: 18,
            marginBottom: 18,
            alignItems: "flex-start",
          }}
        >
          {/* IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.06,
              rotate: -2,
              boxShadow: "6px 6px 0 #111",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            style={{
              width: 170,
              height: 170,
              border: "2px solid #111",
              background: "#fff",
              boxShadow: "4px 4px 0 #111",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src="/meesha.jpeg"
              alt="meesha"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* TEXT */}
          <div>
            <motion.div
              whileHover={{ letterSpacing: "0.18em" }}
              transition={{ duration: 0.1 }}
              style={{
                fontWeight: 800,
                fontFamily: "'Meddon', cursive",
                fontSize: 40,
                color: "var(--primary-dark)",
              }}
            >
              Meesha
            </motion.div>

            <div
              style={{
                color: "var(--primary)",
                fontSize: 12,
                letterSpacing: "0.12em",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Fullstack Engineer / Builder
            </div>

            <div
              style={{
                color: "var(--ink-soft)",
                fontSize: 12,
                lineHeight: 1.7,
                maxWidth: 800,
              }}
            >
              I aim to work creatively at the intersection of code and design,
              crafting projects that feel as good as they function. I’m driven
              by curiosity and the urge to build things that stand out.
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            borderTop: "2px solid var(--line)",
            marginBottom: 14,
          }}
        />

        {/* INFO ROWS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {INFO_ROWS.map(({ label, value, link }, i) => {
            const highlight = i % 2 === 1;

            return (
              <motion.div
                key={label}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  backgroundColor: highlight
                    ? "rgba(232,138,166,0.28)"
                    : "rgb(255, 244, 219)",
                  boxShadow: highlight
                    ? "0 0 0 2px var(--primary), 6px 6px 0 #111"
                    : "4px 4px 0 #111",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  padding: "10px 12px",
                  background: highlight
                    ? "rgba(232,138,166,0.18)"
                    : "var(--paper)",
                  border: highlight
                    ? "2px solid var(--primary)"
                    : "2px solid var(--line)",
                  cursor: link ? "pointer" : "default",
                  position: "relative",
                }}
              >
                {/* ACCENT BAR */}
                <div
                  style={{
                    position: "absolute",
                    width: 3,
                    height: "100%",
                    background: highlight ? "var(--primary)" : "var(--line)",
                    left: 0,
                    top: 0,
                    opacity: highlight ? 1 : 0.25,
                  }}
                />

                {/* LABEL */}
                <span
                  style={{
                    color: "var(--ink-soft)",
                    letterSpacing: "0.12em",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </span>

                {/* VALUE */}
                {link ? (
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ x: 2 }}
                    style={{
                      color: "var(--primary)",
                      fontSize: 10,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {value}
                    <span style={{ fontSize: 10 }}>↗</span>
                  </motion.a>
                ) : (
                  <span
                    style={{
                      color: highlight ? "var(--primary)" : "var(--ink)",
                      fontSize: 10,
                    }}
                  >
                    {value}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </PixelWindow>
  );
}
