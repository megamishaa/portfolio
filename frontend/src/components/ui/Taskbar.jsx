import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <motion.div
      className="fixed top-0 right-0 z-50 flex items-center gap-4"
      style={{
        left: 72,
        top: 0,
        minHeight: 40,

        background: "#f3e6c6",
        borderBottom: "3px solid #2b2b2b",
        color: "#2b2b2b",
        padding: "6px 14px",
        color: "#2b2b2b",
        letterSpacing: "0.08em",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.1, duration: 0.25 }}
    >
      {/* APP */}
      <motion.span
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.1 }}
        style={{
          border: "2px solid #2b2b2b",
          padding: "5px 10px",
          fontSize: 10,

          // 🎨 pastel accent instead of blue
          background: "#e88aa6",
          color: "#fff",

          boxShadow: "2px 2px 0 #2b2b2b",
          cursor: "pointer",
        }}
      >
        PORTFOLIO.EXE
      </motion.span>

      {/* STATUS DOT (THIS adds life) */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: 8,
          height: 8,
          background: "#a8c96b",
          border: "2px solid #2b2b2b",
        }}
      />

      {/* CLOCK */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          marginLeft: "auto",
          border: "2px solid #2b2b2b",

          // 🎨 light block instead of white harsh
          background: "#fffaf0",

          padding: "5px 10px",
          fontSize: 10,
          minWidth: 70,
          textAlign: "center",

          boxShadow: "2px 2px 0 #2b2b2b",
        }}
      >
        <motion.span
          key={fmt(time)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
        >
          {fmt(time)}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
