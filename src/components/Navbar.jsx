import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { LogoMark } from "./ui";
import { getTheme, setTheme } from "../theme";

function ThemeToggle() {
  const [theme, setT] = useState(getTheme());
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setT(next);
  };
  return (
    <motion.button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface text-ink hover:border-crimson hover:text-crimson"
      whileTap={{ scale: 0.88, rotate: -20 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
          className="text-base"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { content } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <LogoMark size={38} />
            <span className="display text-lg tracking-wide">
              {content.schoolName.split(" ")[0]}{" "}
              <span className="text-crimson">{content.schoolName.split(" ").slice(1).join(" ")}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="group relative text-sm font-semibold text-ink-soft hover:text-ink">
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-crimson transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
              <Link to="/book" className="btn-primary !px-6 !py-2.5">
                Book a Seat
              </Link>
            </motion.div>
          </nav>

          {/* mobile burger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="h-[2px] w-6 bg-ink" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-[2px] w-6 bg-ink" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="h-[2px] w-6 bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ink-section fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.06 * i }}
              >
                <NavLink to={l.to} className="display text-3xl text-onband">
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Link to="/book" className="btn-primary">
                Book a Seat — ₹{content.bookingFee}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
