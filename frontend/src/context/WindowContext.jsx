import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const WindowContext = createContext(null);

let cascadeIndex = 0;
const CASCADE_OFFSET = 16;

export const WINDOWS = {
  ABOUT: "about",
  SKILLS: "skills",
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  CONTACT: "contact",
};

function getViewportFrame() {
  if (typeof window === "undefined") {
    return { x: 92, y: 56, w: 1120, h: 720 };
  }

  const sidebarWidth = 72;
  const taskbarHeight = 36;
  const gutter = 20;

  return {
    x: sidebarWidth + gutter,
    y: taskbarHeight + gutter,
    w: Math.max(620, window.innerWidth - sidebarWidth - gutter * 6),
    h: Math.max(360, window.innerHeight - taskbarHeight - gutter * 8),
  };
}

function getDefaultWindowLayout(id) {
  const frame = getViewportFrame();
  const sharedWindowSize = {
    w: Math.floor(frame.w * 0.95),
    h: Math.floor(frame.h),
  };

  const sizeOverrides = {
    about: sharedWindowSize,
    projects: sharedWindowSize,
    skills: sharedWindowSize,
    experience: sharedWindowSize,
    contact: {
      w: Math.floor(frame.w * 0.6),
      h: Math.floor(frame.h * 0.6),
    },
  };

  return {
    pos: { x: frame.x, y: frame.y },
    size: sizeOverrides[id] ?? sharedWindowSize,
  };
}

function buildDefaultWindows() {
  const ids = Object.values(WINDOWS);
  const out = {};

  ids.forEach((id, i) => {
    const defaultLayout = getDefaultWindowLayout(id);

    out[id] = {
      open: false,
      hasOpened: false,
      minimized: false,
      pos: defaultLayout.pos,
      size: defaultLayout.size,
      zIndex: 10 + i,
    };
  });

  return out;
}

export function WindowProvider({ children }) {
  useEffect(() => {
    cascadeIndex = 0;
  }, []);

  const [windows, setWindows] = useState(buildDefaultWindows);
  const [topZ, setTopZ] = useState(15);

  const openWindow = useCallback((id) => {
    setTopZ((z) => {
      const newZ = z + 1;

      setWindows((prev) => {
        const defaultLayout = getDefaultWindowLayout(id);
        const alreadyOpened = prev[id]?.hasOpened;
        const nextPos = alreadyOpened
          ? (prev[id]?.pos ?? defaultLayout.pos)
          : {
              x: defaultLayout.pos.x + cascadeIndex * CASCADE_OFFSET,
              y: defaultLayout.pos.y + cascadeIndex * CASCADE_OFFSET,
            };

        if (!alreadyOpened) {
          cascadeIndex += 1;
        }

        return {
          ...prev,
          [id]: {
            open: true,
            hasOpened: true,
            minimized: false,
            pos: nextPos,
            size: prev[id]?.size ?? defaultLayout.size,
            zIndex: newZ,
          },
        };
      });

      return newZ;
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false } }));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: !prev[id]?.minimized },
    }));
  }, []);

  const focusWindow = useCallback((id) => {
    setTopZ((z) => {
      const newZ = z + 1;

      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: newZ },
      }));

      return newZ;
    });
  }, []);

  const setWindowPos = useCallback((id, pos) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], pos } }));
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        setWindowPos,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export const useWindows = () => useContext(WindowContext);
