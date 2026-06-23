import { useEffect, useRef } from "react";

const IMAGE_SRC = "/pinkflower.png";

// tuning
const STEP = 8; // sampling density from source image (higher = fewer dots)
const THRESHOLD = 120; // ignore darker pixels (reduces noise)
const FLOWER_COUNT = 36; // number of flowers on screen

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    dots: [],
    flowers: [],
    raf: null,
    imgW: 0,
    imgH: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    const s = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildFlowers();
    };

    const buildDots = (img) => {
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      offCtx.drawImage(img, 0, 0);

      const { data } = offCtx.getImageData(
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
      );

      s.dots = [];
      s.imgW = img.naturalWidth;
      s.imgH = img.naturalHeight;

      for (let y = 0; y < s.imgH; y += STEP) {
        for (let x = 0; x < s.imgW; x += STEP) {
          const i = (y * s.imgW + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a < 20) continue;

          const brightness = (r + g + b) / 3;
          if (brightness < THRESHOLD) continue;

          s.dots.push({
            nx: x / s.imgW,
            ny: y / s.imgH,
            brightness,
          });
        }
      }
    };

    const buildFlowers = () => {
      s.flowers = [];
      for (let i = 0; i < FLOWER_COUNT; i++) {
        s.flowers.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          scale: 60 + Math.random() * 80,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
        });
      }
    };

    const getColor = (brightness, alpha) => {
      if (brightness > 200) {
        return `rgba(255, 95, 155, ${alpha})`; // pink
      }
      if (brightness > 150) {
        return `rgba(165, 140, 255, ${alpha})`; // lavender
      }
      return `rgba(120, 210, 255, ${alpha})`; // cyan
    };
import { useEffect, useRef } from "react";

const IMAGE_SRC = "/pinkflower.png";
const FLOWER_COUNT = 24;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    flowers: [],
    raf: null,
    img: null,
    imgW: 0,
    imgH: 0,
    bg: "#f3e8d2",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const s = stateRef.current;

    // ✅ get CSS bg color once
    s.bg =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--bg")
        .trim() || "#f3e8d2";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildFlowers();
    };

    const buildFlowers = () => {
      s.flowers = [];
      for (let i = 0; i < FLOWER_COUNT; i++) {
        s.flowers.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          scale: 80 + Math.random() * 100,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const draw = (t) => {
      ctx.fillStyle = s.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const f of s.flowers) {
        const sway = Math.sin(t * f.speed + f.phase) * 10;

        ctx.save();

        // center + sway
        ctx.translate(
          f.x + sway - f.scale / 2,
          f.y - f.scale / 2
        );

        // subtle rotation (optional)
        ctx.rotate(Math.sin(t * f.speed) * 0.05);

        ctx.drawImage(
          s.img,
          0,
          0,
          s.imgW,
          s.imgH,
          0,
          0,
          f.scale,
          f.scale
        );

        ctx.restore();
      }
    };

    const loop = (ts) => {
      draw(ts * 0.001);
      s.raf = requestAnimationFrame(loop);
    };

    // load image
    const img = new Image();
    img.src = IMAGE_SRC;

    img.onload = () => {
      s.img = img;
      s.imgW = img.naturalWidth;
      s.imgH = img.naturalHeight;

      resize();
      window.addEventListener("resize", resize);

      s.raf = requestAnimationFrame(loop);
    };

    img.onerror = () => {
      resize();
      ctx.fillStyle = "#f3e8d2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return () => {
      window.removeEventListener("resize", resize);
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
    const draw = (t) => {
      // beige background
      ctx.fillStyle = "--bg";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold 6px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const f of s.flowers) {
        const sway = Math.sin(t * f.speed + f.phase) * 8;

        for (const d of s.dots) {
          const x = f.x + d.nx * f.scale + sway * (1 - d.ny);
          const y = f.y + d.ny * f.scale;

          if (
            x < -20 ||
            x > canvas.width + 20 ||
            y < -20 ||
            y > canvas.height + 20
          )
            continue;

          const alpha = 0.25 + (d.brightness / 255) * 0.4;
          ctx.fillStyle = getColor(d.brightness, alpha);
          ctx.fillText("·", x, y);
        }
      }
    };

    const loop = (ts) => {
      draw(ts * 0.001);
      s.raf = requestAnimationFrame(loop);
    };

    // load image
    const img = new Image();
    img.src = IMAGE_SRC;

    img.onload = () => {
      resize();
      buildDots(img);
      buildFlowers();
      s.raf = requestAnimationFrame(loop);
    };

    img.onerror = () => {
      // fallback: just beige screen
      resize();
      ctx.fillStyle = "#f3e8d2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
