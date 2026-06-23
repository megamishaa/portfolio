import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "BOOTING WINDOW MANAGER...",
  "LOADING PIXEL SHELL...",
  "CHECKING OPEN FILES...",
  "COPYING MEESHA.EXE...",
  "NO FATAL ERRORS FOUND...",
  "",
  "COMPLETE THE TASK TO CONTINUE:",
];

export default function Landing({ onStart }) {
  const [lines, setLines] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [cursorLine, setCursor] = useState(0);
  const [checked, setChecked] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const intervals = [220, 220, 220, 320, 260, 220, 500];

    const run = async () => {
      for (let i = 0; i < BOOT_LINES.length; i += 1) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        setCursor(i);

        const delay = intervals[i] || 300;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setShowBtn(true);
    };

    run();
  }, []);

  const handleVerify = () => {
    if (checked) return;
    setChecked(true);
    setTimeout(() => {
      onStart();
    }, 220);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-start justify-center px-6 pt-36"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        backgroundImage: `
      linear-gradient(var(--bg-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px)
    `,
        backgroundSize: "24px 24px",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* NOTEBOOK */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 120, // adjust width

          backgroundImage: "url('/notebook2.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "120px auto",

          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      ;{/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "relative",
          zIndex: 2, // ✅ above overlay
          width: "min(100%, 980px)",
          display: "grid",
          gap: 20,
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(250px, 0.8fr)",
          gridTemplateRows: "auto minmax(104px, auto)",
          alignItems: "start",
        }}
      >
        {/* MAIN TERMINAL WINDOW + safety pin*/}
        <div style={{ position: "relative" }}>
          <motion.img
            src="/safetypin.png"
            alt="safety pin"
            style={{
              position: "absolute",
              top: -70,
              left: -74,
              width: 180,
              zIndex: 20,
              pointerEvents: "auto",
              cursor: "pointer",
              filter: "drop-shadow(2px 3px 0px rgba(0,0,0,0.35))",
            }}
            whileTap={{
              scale: 0.9,
              rotate: -5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 12,
            }}
          />
          <div
            style={{
              background: "#fff6e6",
              border: "3px solid #2b2b2b",
              boxShadow: "6px 6px 0 #2b2b2b",
              overflow: "hidden",
            }}
          >
            {/* TITLEBAR */}
            <div
              style={{
                background: "#ff6fa3",
                borderBottom: "3px solid #2b2b2b",
                color: "#fff",
                padding: "6px 10px",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "uppercase",
                fontSize: 11,
                letterSpacing: "0.08em",
              }}
            >
              <span>Window</span>
              <span>X</span>
            </div>

            {/* TERMINAL CONTENT */}
            <div style={{ padding: "18px 20px 16px", color: "#2b2b2b" }}>
              <div
                style={{
                  border: "2px solid #2b2b2b",
                  background: "#fffaf0",
                  minHeight: 300,
                  padding: "18px",
                  fontSize: 12,
                  lineHeight: 1.9,
                  letterSpacing: "0.08em",
                }}
              >
                {lines.map((line, i) => (
                  <motion.div
                    key={`${line}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {line || "\u00a0"}
                    {i === lines.length - 1 && i === cursorLine && (
                      <motion.span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 12,
                          background: "#a78bfa",
                          marginLeft: 6,
                        }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ position: "relative" }}>
          {/* ROTATING flower */}
          <motion.img
            src="/button.png"
            alt="button"
            style={{
              position: "absolute",
              right: -85,
              bottom: -78,
              width: 160,

              zIndex: 0,
              pointerEvents: "none",

              opacity: 0.9,
              filter: "drop-shadow(3px 4px 0 rgba(0,0,0,0.3))",
            }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear",
            }}
          />

          {/* LOADING BOX */}
          <div
            style={{
              position: "relative",
              zIndex: 2,

              background: "#ff6fa3",
              border: "3px solid #2b2b2b",
              boxShadow: "6px 6px 0 #2b2b2b",
              color: "#fff",
              padding: "14px 16px",
              textTransform: "uppercase",
              fontSize: 11,
            }}
          >
            <div style={{ marginBottom: 12 }}>Loading...</div>
            <div style={{ marginBottom: 8, fontSize: 16 }}>Meesha.exe</div>

            {/* PROGRESS BAR */}
            <div
              style={{
                height: 18,
                border: "2px solid #2b2b2b",
                padding: 2,
                marginBottom: 8,
                background: "#fff",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "#a78bfa",
                  width: "76%",
                }}
                animate={{ width: ["50%", "85%", "76%"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div>24 hours remaining</div>
          </div>
        </div>

        {/* LOGIN */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatePresence>
            {showBtn && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  width: "min(100%, 360px)",
                  background: "#fff6e6",
                  border: "3px solid #2b2b2b",
                  boxShadow: "6px 6px 0 #2b2b2b",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#ff6fa3",
                    color: "#fff",
                    padding: "6px 10px",
                    borderBottom: "3px solid #2b2b2b",
                    fontSize: 10,
                  }}
                >
                  Login
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={handleVerify}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 11,
                      textTransform: "uppercase",
                      color: "#2b2b2b",
                    }}
                  >
                    I am not a robot
                  </button>

                  <button
                    onClick={handleVerify}
                    style={{
                      width: 24,
                      height: 24,
                      border: "2px solid #2b2b2b",
                      background: checked ? "#a78bfa" : "#fff",
                      color: "#fff",
                      boxShadow: "2px 2px 0 #2b2b2b",
                      cursor: "pointer",
                    }}
                  >
                    {checked ? "✓" : ""}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
