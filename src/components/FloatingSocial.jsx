import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

/* Floating Instagram + YouTube buttons, right edge of the screen */
export default function FloatingSocial() {
  const { content } = useSite();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setShow(v > 320));
    return () => unsub();
  }, [scrollY]);

  const items = [
    {
      label: "Instagram",
      href: content.socials.instagram,
      bg: "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)",
      icon: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z",
    },
    {
      label: "YouTube",
      href: content.socials.youtube,
      bg: "#ff0000",
      icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z",
    },
  ];

  return (
    <motion.div
      className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3"
      initial={{ opacity: 0, x: 60 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {items.map((s, i) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="group flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-1 ring-black/10"
          style={{ background: s.bg }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-bg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
            {s.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
