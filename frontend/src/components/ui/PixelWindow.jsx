import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindows } from "../../context/WindowContext";

export default function PixelWindow({ id, title, children, className = "" }) {
  const { windows, closeWindow, minimizeWindow, focusWindow, setWindowPos } =
    useWindows();
  const win = windows[id];
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const onMouseDown = useCallback(
    (e) => {
      if (e.target.closest(".win-btn")) return;
      focusWindow(id);
      isDragging.current = true;
      offsetRef.current = {
        x: e.clientX - (win?.pos?.x ?? 100),
        y: e.clientY - (win?.pos?.y ?? 100),
      };
      e.preventDefault();
    },
    [focusWindow, id, win?.pos],
  );

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const newX = Math.max(
        60,
        Math.min(window.innerWidth - 120, e.clientX - offsetRef.current.x),
      );
      const newY = Math.max(
        34,
        Math.min(window.innerHeight - 40, e.clientY - offsetRef.current.y),
      );
      setWindowPos(id, { x: newX, y: newY });
    };

    const onUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [id, setWindowPos]);

  if (!win?.open) return null;

  return (
    <AnimatePresence>
      {win.open && (
        <motion.div
          ref={dragRef}
          className={`pixel-window ${className}`}
          style={{
            left: win.pos?.x ?? 100,
            top: win.pos?.y ?? 60,
            width: win.size?.w ?? 420,
            height: win.size?.h ?? 400,
            zIndex: win.zIndex ?? 10,
          }}
          initial={{ opacity: 0, scale: 0.92, y: -10 }}
          animate={
            win.minimized
              ? { opacity: 0, scale: 0.85, y: 20, pointerEvents: "none" }
              : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.9, y: -8 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          onMouseDown={() => focusWindow(id)}
        >
          <div className="pixel-window-titlebar" onMouseDown={onMouseDown}>
            <span
              className="flex-1 select-none"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </span>

            <button
              className="win-btn"
              onClick={() => minimizeWindow(id)}
              title="Minimize"
              type="button"
            >
              _
            </button>
            <button className="win-btn" title="Maximize" type="button">
              []
            </button>
            <button
              className="win-btn"
              onClick={() => closeWindow(id)}
              title="Close"
              type="button"
            >
              X
            </button>
          </div>

          {!win.minimized && (
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{
                height: win.size?.h ? win.size.h - 28 : 372,
                maxHeight: win.size?.h ? win.size.h - 28 : 372,
                background: "#f5f5f5",
              }}
            >
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
