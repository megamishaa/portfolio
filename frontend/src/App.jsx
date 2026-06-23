import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WindowProvider, useWindows, WINDOWS } from "./context/WindowContext";

import Landing from "./components/ui/Landing";
import Sidebar from "./components/ui/Sidebar";
import Taskbar from "./components/ui/Taskbar";

import AboutWindow from "./components/windows/AboutWindow";
import SkillsWindow from "./components/windows/SkillsWindow";
import ProjectsWindow from "./components/windows/ProjectsWindow";
import ExperienceWindow from "./components/windows/ExperienceWindow";
import ContactWindow from "./components/windows/ContactWindow";

import "./styles/globals.css";

const INTRO_DURATION_MS = 5000;

function SequenceBackground({ foreground = false }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: foreground ? 30 : 0,
        background: "transparent",
        pointerEvents: foreground ? "auto" : "none",
      }}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <iframe
        src={`/new.html?stage=${foreground ? "intro" : "idle"}`}
        title="sequence-background"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          opacity: 1,
        }}
      />
    </motion.div>
  );
}

function OSShell({ visible }) {
  const { openWindow } = useWindows();

  useEffect(() => {
    if (!visible) return;

    const order = [WINDOWS.ABOUT];
    const timers = order.map((id, i) =>
      setTimeout(() => openWindow(id), 150 + i * 120),
    );

    return () => timers.forEach(clearTimeout);
  }, [visible, openWindow]);

  return (
    <motion.div
      style={{ position: "fixed", inset: 0, zIndex: 10 }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
    >
      <Sidebar />
      <Taskbar />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 20,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <AboutWindow />
        <SkillsWindow />
        <ProjectsWindow />
        <ExperienceWindow />
        <ContactWindow />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useState(() => {
    if (typeof window === "undefined") return "landing";
    return window.history.state?.stage ?? "landing";
  });
  const hasSyncedHistory = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      setStage(window.history.state?.stage ?? "landing");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!hasSyncedHistory.current) {
      window.history.replaceState({ stage }, "", window.location.href);
      hasSyncedHistory.current = true;
      return;
    }

    if (window.history.state?.stage !== stage) {
      window.history.pushState({ stage }, "", window.location.href);
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== "intro") return;

    const timer = setTimeout(() => {
      setStage("desktop");
    }, INTRO_DURATION_MS);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <WindowProvider>
      <div className="crt-overlay scanline-anim" />

      {stage !== "landing" && (
        <SequenceBackground foreground={stage === "intro"} />
      )}

      {stage === "desktop" && <OSShell visible />}

      <AnimatePresence mode="wait">
        {stage === "landing" && <Landing onStart={() => setStage("intro")} />}
      </AnimatePresence>
    </WindowProvider>
  );
}
