import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/* ============ patterns ============ */

export function GridPattern({ id, stroke = "#faf6ef", opacity = 1, className = "" }) {
  const pid = `gp-${id}`;
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        WebkitMaskImage: "radial-gradient(65% 65% at 50% 40%, #000 20%, transparent 100%)",
        maskImage: "radial-gradient(65% 65% at 50% 40%, #000 20%, transparent 100%)",
      }}
    >
      <defs>
        <pattern id={pid} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke={stroke} strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} opacity={opacity} />
    </svg>
  );
}

export function DotPattern({ id, fill = "currentColor", className = "" }) {
  const pid = `dp-${id}`;
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, #000 10%, transparent 100%)",
        maskImage: "radial-gradient(60% 60% at 50% 40%, #000 10%, transparent 100%)",
      }}
    >
      <defs>
        <pattern id={pid} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill={fill} fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

/* ============ background beams ============ */

const BEAM_PATHS = [
  "M-100 380C-100 380 260 60 500 100C740 140 980 420 1220 460C1460 500 1700 340 1820 300",
  "M-100 420C-100 420 240 120 480 160C720 200 960 480 1200 520C1440 560 1680 380 1820 340",
  "M-100 460C-100 460 220 180 460 220C700 260 940 540 1180 580C1420 620 1660 420 1820 380",
  "M-100 340C-100 340 280 20 520 60C760 100 1000 380 1240 420C1480 460 1720 300 1820 260",
  "M-100 500C-100 500 200 240 440 280C680 320 920 600 1160 640C1400 680 1640 480 1820 440",
  "M-100 540C-100 540 180 300 420 340C660 380 900 660 1140 700C1380 740 1620 540 1820 500",
];

export function BackgroundBeams({ id, className = "" }) {
  const gid = `beam-${id}`;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 1720 800" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B3241F" />
            <stop offset="50%" stopColor="#C9A24B" />
            <stop offset="100%" stopColor="#FAF6EF" />
          </linearGradient>
        </defs>
        {BEAM_PATHS.map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        ))}
        {BEAM_PATHS.map((d, i) => (
          <motion.path
            key={`beam-${i}`}
            d={d}
            stroke={`url(#${gid})`}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(201,162,75,0.55))" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ============ meteors & sparkles ============ */

export function Meteors({ count = 8, className = "" }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: -Math.random() * 30,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 1.6,
      })),
    [count]
  );
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Sparkles({ count = 16, color = "#c9a24b", className = "" }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 1.8 + Math.random() * 1.6,
      })),
    [count]
  );
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: color,
            boxShadow: `0 0 ${s.size * 2.5}px ${color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ============ aurora ============ */

export function AuroraBackground({ className = "" }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <span
        className="aurora-blob animate-aurora"
        style={{ left: "-12%", top: "-35%", height: 460, width: 460, background: "conic-gradient(from 90deg, rgba(179,36,31,0.4), rgba(201,162,75,0.3), transparent 60%)" }}
      />
      <span
        className="aurora-blob animate-aurora"
        style={{ right: "-15%", bottom: "-45%", height: 520, width: 520, background: "conic-gradient(from 240deg, rgba(143,27,23,0.45), rgba(224,80,58,0.25), transparent 60%)", animationDelay: "-6s" }}
      />
    </div>
  );
}

/* ============ spotlight card ============ */

export function SpotlightCard({ children, className = "", spotlight = "rgba(179,36,31,0.10)" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`group/spot relative overflow-hidden ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(300px circle at var(--sx, 50%) var(--sy, 50%), ${spotlight}, transparent 65%)` }}
      />
      {children}
    </div>
  );
}

/* ============ border beam (traveling light on card border) ============ */

export function BorderBeam({ variant = "gold", className = "" }) {
  return (
    <span
      aria-hidden
      className={`border-beam animate-angle ${variant === "gold" ? "" : "border-beam-crimson"} ${className}`}
    />
  );
}

/* ============ moving border buttons ============ */

function BorderSpin() {
  return (
    <span
      aria-hidden
      className="absolute inset-[-150%] animate-[spin_5s_linear_infinite]"
      style={{
        background: "conic-gradient(from 0deg, #B3241F, #C9A24B 25%, transparent 50%, #B3241F 80%, #B3241F)",
      }}
    />
  );
}

export function MovingBorderLink({ to, children, className = "", innerClassName = "" }) {
  return (
    <motion.span
      className={`relative inline-flex overflow-hidden rounded-full p-[2px] ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <BorderSpin />
      <Link
        to={to}
        className={`relative flex items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-bold text-paper shadow-[0_10px_24px_-10px_rgba(179,36,31,0.8)] transition-colors hover:bg-crimson-dark ${innerClassName}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}

export function MovingBorderButton({ children, type = "button", onClick, className = "", innerClassName = "" }) {
  return (
    <motion.span
      className={`relative inline-flex overflow-hidden rounded-full p-[2px] ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <BorderSpin />
      <button
        type={type}
        onClick={onClick}
        className={`relative flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-bold text-paper shadow-[0_10px_24px_-10px_rgba(179,36,31,0.8)] transition-colors hover:bg-crimson-dark ${innerClassName}`}
      >
        {children}
      </button>
    </motion.span>
  );
}

/* ============ word rotate ============ */

export function WordRotate({ words, interval = 2400, className = "" }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ============ text generate (blur-in words) ============ */

export function TextGenerate({ text, className = "", delay = 0, once = true, gradient = false }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`inline-block ${gradient ? "grad-word" : ""}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once, margin: "-40px" }}
          transition={{ duration: 0.55, delay: delay + i * 0.07, ease: "easeOut" }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* ============ 3D tilt card ============ */

export function TiltCard({ children, className = "", max = 9 }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    ref.current.style.setProperty("--gx", `${nx * 100}%`);
    ref.current.style.setProperty("--gy", `${ny * 100}%`);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: "radial-gradient(340px circle at var(--gx,50%) var(--gy,50%), rgba(250,246,239,0.16), transparent 60%)" }}
        />
        {children}
      </motion.div>
    </div>
  );
}

/* ============ infinite moving cards ============ */

export function InfiniteMovingCards({ cards, reverse = false, duration = 46, className = "" }) {
  const row = [...cards, ...cards];
  return (
    <div className={`marquee-paused relative overflow-hidden ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div
        className={`marquee-track ${reverse ? "reverse" : ""} flex w-max gap-6 py-2`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {row.map((card, i) => (
          <div key={i} className="w-[330px] shrink-0 sm:w-[380px]">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ global click sparks ============ */

export function ClickSparkCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let sparks = [];
    let raf = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#B3241F", "#C9A24B", "#17120E"];
    const onClick = (e) => {
      const target = e.target instanceof Element ? e.target.closest("button, a") : null;
      if (!target) return;
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3.5;
        sparks.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, color: colors[i % colors.length], w: 1.2 + Math.random() * 1.4,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((p) => p.life > 0);
      for (const p of sparks) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.life -= 0.035;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3.2, p.y - p.vy * 3.2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (sparks.length) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

/* ============ scroll progress bar ============ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-crimson via-gold to-crimson"
    />
  );
}

/* ============ shiny text (shimmer sweep) ============ */

export function ShinyText({ children, className = "", speed = 3, delay = 0 }) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{ "--shiny-speed": `${speed}s`, animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

/* ============ gradient text ============ */

export function GradientText({ children, className = "", colors = ["#B3241F", "#C9A24B", "#B3241F"] }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: `linear-gradient(90deg, ${colors.join(",")})` }}
    >
      {children}
    </span>
  );
}

/* ============ border glow (mouse-following glow border) ============ */

export function BorderGlow({ children, className = "", glow = "rgba(201,162,75,0.55)" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`group/glow relative rounded-3xl p-[1.5px] ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--gx, 50%) var(--gy, 50%), ${glow}, transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
      />
      {children}
    </div>
  );
}

/* ============ pixel card (pixel mosaic reveal on hover) ============ */

const PIXEL_SHADES = [
  "rgba(179,36,31,0.95)", "rgba(143,27,23,0.85)", "rgba(201,162,75,0.85)",
  "rgba(179,36,31,0.55)", "rgba(201,162,75,0.45)", "rgba(143,27,23,0.35)",
];

export function PixelCard({ children, className = "", variant = "crimson", gap = 6, pixelSize = 22, childrenClassName = "" }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ gx: -999, gy: -999, pixels: [], w: 0, h: 0, raf: null, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const step = pixelSize + gap;

    const setup = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      st.w = r.width;
      st.h = r.height;
      canvas.width = st.w * dpr;
      canvas.height = st.h * dpr;
      canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(st.w / step) + 2;
      const rows = Math.ceil(st.h / step) + 2;
      st.pixels = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          st.pixels.push({ ox: x * step, oy: y * step, cur: 0, tgt: 0, c: PIXEL_SHADES[(Math.random() * PIXEL_SHADES.length) | 0] });
        }
      }
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas.parentElement);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, st.w, st.h);
      st.t += 0.05;
      for (const p of st.pixels) {
        const dx = p.ox + step / 2 - st.gx;
        const dy = p.oy + step / 2 - st.gy;
        const dist = Math.hypot(dx, dy);
        p.tgt = dist < 130 ? 1 - dist / 130 : 0;
        p.cur += (p.tgt - p.cur) * 0.16;
        if (p.cur > 0.02) {
          const s = pixelSize * Math.min(1, p.cur * 1.25);
          const off = (pixelSize - s) / 2;
          ctx.globalAlpha = Math.min(1, p.cur * 1.2);
          ctx.fillStyle = p.c;
          ctx.fillRect(p.ox + off, p.oy + off, s, s);
        }
      }
      ctx.globalAlpha = 1;
      st.raf = requestAnimationFrame(draw);
    };
    st.raf = requestAnimationFrame(draw);

    const parent = canvas.parentElement;
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      st.gx = e.clientX - r.left;
      st.gy = e.clientY - r.top;
    };
    const onLeave = () => { st.gx = -999; st.gy = -999; };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(st.raf);
    };
  }, [gap, pixelSize]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className={`relative z-10 h-full ${childrenClassName}`}>{children}</div>
    </div>
  );
}

/* ============ profile card (reactbits style, for the master) ============ */

export function ProfileCard({ photo, name, title, socials = [], className = "" }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 160, damping: 16 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 160, damping: 16 });
  const glowX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(py, [0, 1], ["15%", "85%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(300px circle at ${gx} ${gy}, rgba(201,162,75,0.28), transparent 70%)`
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-3xl border border-band-line bg-band shadow-[0_40px_80px_-30px_rgba(23,18,14,0.45)]"
      >
        {/* glow follows the mouse */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBackground }}
        />
        {/* image area */}
        <div className="relative aspect-[4/4.4] w-full overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-band-soft text-onband-faint">
              <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="24" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="2" />
                <text x="32" y="42" fontFamily="Georgia, serif" fontSize="28" fill="#C9A24B" fillOpacity="0.6" textAnchor="middle">武</text>
              </svg>
              <span className="px-6 text-center text-[11px] font-bold uppercase tracking-[0.2em]">Master photo — add from admin</span>
            </div>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-band to-transparent" />
        </div>
        {/* info bar */}
        <div className="relative -mt-10 flex items-center justify-between gap-4 px-6 pb-6" style={{ transform: "translateZ(40px)" }}>
          <div>
            <p className="display text-xl text-onband">{name}</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{title}</p>
          </div>
          <div className="flex gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-band-line text-onband-soft hover:border-gold hover:text-gold"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============ carousel (3D coverflow, reactbits style) ============ */

export function Carousel({ items, baseWidth = 640, autoplay = true, autoplayDelay = 3200, loop = true }) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % count : Math.min(i + 1, count - 1)));
    }, autoplayDelay);
    return () => clearInterval(t);
  }, [autoplay, autoplayDelay, count, loop]);

  const go = (dir) => setIndex((i) => (i + dir + count) % count);

  return (
    <div className="relative mx-auto" style={{ width: `min(100%, ${baseWidth}px)` }}>
      <div className="relative h-[300px] sm:h-[320px]" style={{ perspective: 1000 }}>
        {items.map((item, i) => {
          let offset = i - index;
          if (loop && Math.abs(offset) > count / 2) offset -= Math.sign(offset) * count;
          const abs = Math.abs(offset);
          if (abs > 2.2) return null;
          return (
            <motion.div
              key={i}
              className="absolute inset-0 cursor-pointer"
              animate={{
                transform: `translateX(${offset * 46}%) translateZ(${-abs * 190}px) rotateY(${offset * -38}deg) scale(${1 - abs * 0.08})`,
                opacity: abs > 2.2 ? 0 : 1 - abs * 0.28,
                zIndex: count - abs,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={() => setIndex(i)}
            >
              {item}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <motion.button
          aria-label="Previous"
          onClick={() => go(-1)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md hover:border-crimson hover:text-crimson"
        >
          ←
        </motion.button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-crimson" : "w-1.5 bg-line"}`}
            />
          ))}
        </div>
        <motion.button
          aria-label="Next"
          onClick={() => go(1)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md hover:border-crimson hover:text-crimson"
        >
          →
        </motion.button>
      </div>
    </div>
  );
}
