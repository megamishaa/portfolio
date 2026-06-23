import { motion } from "framer-motion";
import { useWindows, WINDOWS } from "../../context/WindowContext";

const NAV_ITEMS = [
  { id: WINDOWS.ABOUT, icon: "01", label: "ABOUT" },
  { id: WINDOWS.PROJECTS, icon: "02", label: "WORK" },
  { id: WINDOWS.SKILLS, icon: "03", label: "SKILLS" },
  { id: WINDOWS.EXPERIENCE, icon: "04", label: "CAREER" },
  { id: WINDOWS.CONTACT, icon: "05", label: "MAIL" },
];

export default function Sidebar() {
  const { windows, openWindow, closeWindow } = useWindows();

  const handleClick = (id) => {
    if (windows[id]?.open) {
      closeWindow(id);
      return;
    }
    openWindow(id);
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center"
      style={{
        width: 72,
        background: "#f3e6c6",
        borderRight: "3px solid #2b2b2b",
        padding: "12px 8px 10px",
      }}
      initial={{ x: -72 }}
      animate={{ x: 0 }}
      transition={{ delay: 3.1, duration: 0.3 }}
    >
      {/*TOP*/}
      <div
        style={{
          width: "100%",
          padding: "8px 6px 10px",
          borderBottom: "2px solid #2b2b2b",
          marginBottom: 14,
          textAlign: "center",
          fontSize: 12,
          letterSpacing: "0.2em",
          color: "#000",
          position: "relative",
        }}
      >
        M.OS
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: 0,
            height: 2,
            width: "40%",
            background: "#e88aa6",
          }}
        />
      </div>

      {/* NAV */}
      <nav className="flex flex-col items-center w-full flex-1 gap-8">
        {NAV_ITEMS.map(({ id, icon, label }, i) => {
          const isActive = windows[id]?.open && !windows[id]?.minimized;

          const baseColor = "#2b2b2b";
          const activeColor = "#ff6fa3";

          return (
            <motion.button
              key={id}
              onClick={() => handleClick(id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 + i * 0.06 }}
              whileTap={{ scale: 0.96 }}
              title={label}
              type="button"
              style={{
                padding: "8px 4px",
                color: isActive ? activeColor : baseColor,
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 34,
                  border: "2px solid currentColor",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                  background: isActive ? "#ff6fa3" : "#fff",
                  color: isActive ? "#fff" : baseColor,
                  boxShadow: "2px 2px 0 #2b2b2b",
                }}
              >
                {icon}
              </span>

              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.12em",
                  display: "block",
                  marginTop: 36,
                }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* BOTTOM */}
      <div
        style={{
          borderTop: "3px solid #2b2b2b",
          paddingTop: 10,
          textAlign: "center",
          color: "#2b2b2b",
          fontSize: 8,
          letterSpacing: "0.14em",
        }}
      >
        READY
      </div>
    </motion.aside>
  );
}
