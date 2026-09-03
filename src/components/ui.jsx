import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSite } from "../context/SiteContext";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({ children, delay = 0, y = 28, once = true, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- section heading ---------- */
export function SectionHead({ kicker, title, sub, light = false, center = false }) {
  return (
    <div className={`${center ? "text-center" : ""} max-w-2xl ${center ? "mx-auto" : ""}`}>
      <Reveal>
        <span className={`kicker ${light ? "on-band" : ""}`}>{kicker}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`display mt-4 text-3xl sm:text-4xl lg:text-5xl ${light ? "text-onband" : "text-ink"}`}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-4 text-base leading-relaxed ${light ? "text-onband-soft" : "text-muted"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- animated number ---------- */
export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- logo mark ---------- */
export function LogoMark({ size = 40 }) {
  const { content } = useSite();
  if (content.logo) {
    return (
      <img
        src={content.logo}
        alt="logo"
        style={{ height: size, width: size }}
        className="rounded-xl object-cover"
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="logo">
      <rect width="64" height="64" rx="14" fill="#17120E" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#B3241F" strokeWidth="3" />
      <text x="32" y="41" fontFamily="Georgia, serif" fontSize="24" fill="#FAF6EF" textAnchor="middle">武</text>
    </svg>
  );
}

/* ---------- photo with graceful demo placeholder ---------- */
export function Photo({ src, alt, className = "", placeholder = "Photo coming soon", imgClassName = "" }) {
  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
          <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="22" stroke="#c9bda6" strokeWidth="2.5" />
            <text x="32" y="41" fontFamily="Georgia, serif" fontSize="26" fill="#c9bda6" textAnchor="middle">武</text>
          </svg>
          <span className="px-4 text-center text-xs font-semibold uppercase tracking-[0.18em]">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- marquee strip ---------- */
export function Marquee({ items, light = false }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y py-4 ${light ? "border-band-line" : "border-line"}`}>
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className={`flex items-center gap-10 text-sm font-bold uppercase tracking-[0.3em] ${light ? "text-onband-faint" : "text-muted"}`}>
            {t}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-crimson" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- tap-friendly interactive wrapper ---------- */
export function Tappable({ children, className = "", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {children}
    </motion.button>
  );
}
