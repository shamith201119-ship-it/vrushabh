import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";
import { LogoMark } from "./ui";
import { GridPattern, Sparkles } from "../components/fx";

export default function Footer() {
  const { content } = useSite();
  return (
    <footer className="ink-section relative overflow-hidden">
      <GridPattern id="footer" />
      <Sparkles count={10} className="opacity-50" />
      <span className="kanji pointer-events-none absolute -bottom-24 right-4 select-none text-[16rem] leading-none text-onband/[0.04]">
        武
      </span>
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={42} />
            <span className="display text-xl text-onband">{content.schoolName}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-onband-soft">
            {content.tagline} A martial arts school for kids, teens and adults. Come, watch one class for free.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: content.socials.instagram, label: "Instagram", icon: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" },
              { href: content.socials.youtube, label: "YouTube", icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-band-line text-onband-soft transition-colors hover:border-crimson hover:bg-crimson hover:text-onband"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.26em] text-gold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-onband-soft">
            {[["Home", "/"], ["About the Master", "/about"], ["Classes & Timings", "/classes"], ["Gallery", "/gallery"], ["FAQ", "/faq"], ["Contact", "/contact"], ["Book a Seat", "/book"]].map(([l, to]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-onband">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.26em] text-gold">Reach Us</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-onband-soft">
            <li><a href={`tel:${content.phone}`} className="hover:text-onband">📞 {content.phone}</a></li>
            <li><a href={`mailto:${content.email}`} className="hover:text-onband">✉ {content.email}</a></li>
            <li>{content.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-onband-faint sm:flex-row">
          <span>© {new Date().getFullYear()} {content.schoolName}. All rights reserved.</span>
          <Link to="/admin" className="transition-colors hover:text-onband-soft">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
