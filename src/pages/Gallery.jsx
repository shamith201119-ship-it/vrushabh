import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { Photo, Reveal, SectionHead } from "../components/ui";
import { BorderBeam, DotPattern, SpotlightCard } from "../components/fx";

const demoTiles = [
  "Student photo with costume",
  "Medal ceremony",
  "Belt grading day",
  "Team at championship",
  "Students with certificates",
  "Morning practice",
];

export default function Gallery() {
  const { content } = useSite();
  const [selected, setSelected] = useState(null);

  const photos = content.gallery.length
    ? content.gallery
    : demoTiles.map((caption) => ({ src: null, caption }));

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-20">
        <DotPattern id="gallery" />
        <div className="container-x relative">
          <SectionHead
            kicker="Gallery"
            title="Life on the mat"
            sub="Our students, our medals, our proud moments. (Demo tiles now — real photos are added from the admin panel.)"
          />
        </div>
      </section>

      <section className="container-x grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal key={p.caption + i} delay={(i % 3) * 0.08}>
            <SpotlightCard className="group/tilt h-full">
              <motion.div
                className="group cursor-pointer overflow-hidden rounded-3xl border border-line bg-surface"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                onClick={() => setSelected(p)}
              >
                <Photo src={p.src} alt={p.caption} placeholder={p.caption} className="aspect-[4/3]" />
                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-bold">{p.caption}</p>
                  <span className="text-xs font-bold text-crimson opacity-0 transition-opacity group-hover:opacity-100">View</span>
                </div>
              </motion.div>
            </SpotlightCard>
          </Reveal>
        ))}
      </section>

      <section className="bg-cream/60 py-20">
        <div className="container-x text-center">
          <SectionHead center kicker="Proud moments" title="Medals and certificates" sub="Every student who earns something gets their moment here." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["🥇 Gold — State Championship", "🥈 Silver — District Meet", "🥉 Bronze — Open Tournament", "🏆 Best Dojo Trophy"].map((m, i) => (
              <Reveal key={m} delay={i * 0.08}>
                <motion.div
                  className="card p-7"
                  whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                >
                  <motion.span
                    className="inline-block text-4xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, delay: i * 0.3, ease: "easeInOut" }}
                  >
                    {m.split(" ")[0]}
                  </motion.span>
                  <p className="mt-4 text-sm font-bold">{m.slice(2)}</p>
                  <p className="mt-1 text-xs text-muted">Add real photo from admin</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-night/95 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="w-full max-w-3xl overflow-hidden rounded-3xl bg-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo src={selected.src} alt={selected.caption} className="aspect-[16/10] w-full" />
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-sm font-bold">{selected.caption}</p>
                <button onClick={() => setSelected(null)} className="text-xs font-bold uppercase tracking-widest text-crimson">Close ✕</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
