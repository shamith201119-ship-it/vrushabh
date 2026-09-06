import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";
import { Reveal, SectionHead } from "../components/ui";
import { BorderBeam, GridPattern, Meteors, Sparkles, SpotlightCard } from "../components/fx";

const belts = [
  { color: "#f5f0e6", name: "White", note: "You begin. Pure and open." },
  { color: "#f0c93c", name: "Yellow", note: "First light. You learn to stand." },
  { color: "#e07b1f", name: "Orange", note: "Your stances grow strong." },
  { color: "#3f8f3f", name: "Green", note: "You start to grow, like a tree." },
  { color: "#2f6bbf", name: "Blue", note: "Calm water. Your mind is steady." },
  { color: "#6b4226", name: "Brown", note: "Roots deep. Others look up to you." },
  { color: "#17120e", name: "Black", note: "Not the end. A new beginning." },
];

export default function Classes() {
  const { content } = useSite();

  return (
    <>
      <section className="container-x py-16 sm:py-20">
        <SectionHead
          kicker="Classes & timings"
          title="One week at our dojo"
          sub="Simple timings, same every week. Pick the slot that fits your day. (Demo timings — admin can change them anytime.)"
        />
      </section>

      {/* timetable */}
      <section className="container-x relative pb-20">
        <div className="card relative overflow-hidden">
          <BorderBeam />
          <div className="hidden grid-cols-[1.2fr_1fr_1fr] border-b border-line bg-band px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-onband-faint sm:grid sm:px-10">
            <span>Day</span>
            <span>Kids (5–15)</span>
            <span>Adults (16+)</span>
          </div>
          {content.timings.map((row, i) => (
            <motion.div
              key={row.days}
              className={`grid grid-cols-1 gap-1.5 px-6 py-4 text-sm sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:gap-0 sm:px-10 sm:py-5 ${i % 2 ? "bg-surface" : "bg-bg"}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <span className="font-bold">{row.days}</span>
              <span className={`text-xs sm:text-sm ${row.kids === "Holiday" ? "text-muted" : "font-semibold text-ink"}`}>
                <span className="mr-2 font-bold uppercase tracking-wider text-muted sm:hidden">Kids:</span>{row.kids}
              </span>
              <span className={`text-xs sm:text-sm ${row.adults === "Holiday" ? "text-muted" : "font-semibold text-ink"}`}>
                <span className="mr-2 font-bold uppercase tracking-wider text-muted sm:hidden">Adults:</span>{row.adults}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-crimson/25 bg-crimson/[0.06] px-7 py-6">
          <div>
            <p className="text-sm font-bold">Seat booking — ₹{content.bookingFee} one time</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{content.feesNote}</p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link to="/book" className="relative inline-flex overflow-hidden rounded-full p-[2px]">
              <span aria-hidden className="absolute inset-[-150%] animate-[spin_5s_linear_infinite]" style={{ background: "conic-gradient(from 0deg, #B3241F, #C9A24B 25%, transparent 50%, #B3241F 80%, #B3241F)" }} />
              <span className="relative flex items-center rounded-full bg-crimson px-7 py-3.5 text-sm font-bold text-paper">Book a Seat</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* belt journey — fitted wrap grid */}
      <section className="ink-section relative overflow-hidden py-20 sm:py-24">
        <GridPattern id="belts" />
        <Meteors count={5} />
        <Sparkles count={18} className="opacity-60" />
        <span className="kanji pointer-events-none absolute right-4 top-4 select-none text-[10rem] leading-none text-onband/[0.05]">帯</span>
        <div className="container-x relative">
          <SectionHead light kicker="The belt journey" title="Every belt is earned, never given" sub="You test for a new belt every few months. Small steps, big pride." />
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-5">
            {belts.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.06}>
                <motion.div
                  className="w-[104px] rounded-2xl border border-band-line bg-band-soft px-3 py-5 text-center sm:w-32 sm:px-4"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <motion.div
                    className="mx-auto h-16 w-3 rounded-full border border-band-line shadow-[0_10px_20px_-6px_rgba(0,0,0,0.5)] sm:h-20 sm:w-3.5"
                    style={{ background: b.color }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.25 }}
                  />
                  <p className="mt-3 text-xs font-bold text-onband sm:text-sm">{b.name}</p>
                  <p className="mt-1 hidden text-[10px] leading-relaxed text-onband-faint sm:block">{b.note}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* what to bring */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Before you come" title="What to bring" />
            <div className="mt-8 space-y-4">
              {[
                ["Water bottle", "Training makes you thirsty."],
                ["Comfortable clothes", "Any t-shirt and track pants for the first class. We will guide you for the uniform (gi)."],
                ["A bow and a smile", "The most important thing you carry in."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson text-sm font-bold text-paper">{i + 1}</span>
                    <div>
                      <p className="text-sm font-bold">{t}</p>
                      <p className="mt-0.5 text-sm text-muted">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHead kicker="Our promise" title="What you can expect" />
            <div className="mt-8 space-y-4">
              {[
                ["Safe, clean mat", "We keep the dojo clean and safe for every student."],
                ["Kind correction", "Mistakes are welcome here. That is how we learn."],
                ["Real progress", "Gradings every few months. Certificates and belts you earn."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-bg">✓</span>
                    <div>
                      <p className="text-sm font-bold">{t}</p>
                      <p className="mt-0.5 text-sm text-muted">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
