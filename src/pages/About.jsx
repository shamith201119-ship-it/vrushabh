import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";
import { Reveal, SectionHead } from "../components/ui";
import { AuroraBackground, BorderBeam, DotPattern, MovingBorderLink, ProfileCard, SpotlightCard, TextGenerate } from "../components/fx";

export default function About() {
  const { content } = useSite();

  return (
    <>
      {/* page head */}
      <section className="ink-section relative overflow-hidden">
        <AuroraBackground />
        <span className="kanji pointer-events-none absolute -top-8 right-2 select-none text-[13rem] leading-none text-onband/[0.05]">道</span>
        <div className="container-x relative py-20 sm:py-24">
          <span className="kicker on-band">About us</span>
          <h2 className="display mt-4 max-w-3xl text-3xl sm:text-5xl">
            <TextGenerate gradient text="More than punches. It is a way of life." />
          </h2>
          <TextGenerate
            className="mt-5 block max-w-xl text-sm leading-relaxed text-onband-soft"
            text="Vrushabh Kalashaala is a small traditional dojo. We teach karate with patience, respect and heart."
            delay={0.3}
          />
        </div>
      </section>

      {/* master */}
      <section className="relative overflow-hidden py-20">
        <DotPattern id="about-master" />
        <div className="container-x relative grid items-start gap-14 pb-0 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ProfileCard
            className="mx-auto max-w-sm"
            photo={content.masterPhoto}
            name={content.masterName}
            title={content.masterRank}
            socials={[
              { label: "Instagram", href: content.socials.instagram, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" /></svg> },
              { label: "YouTube", href: content.socials.youtube, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z" /></svg> },
            ]}
          />
        </Reveal>

        <div>
          <Reveal><span className="kicker">The master</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-4 text-3xl sm:text-4xl">{content.masterName}</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative mt-6">
              <TextGenerate className="relative text-base leading-relaxed text-ink-soft" text={content.masterBio} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              In our dojo, the first thing we teach is how to bow — because before you learn to fight, you must learn to respect.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.26em] text-crimson">Achievements</h3>
          </Reveal>
          <div className="mt-5 space-y-0">
            {content.achievements.map((a, i) => (
              <Reveal key={a.text} delay={0.1 + i * 0.07}>
                <motion.div
                  className="flex items-start gap-5 border-b border-line py-4"
                  whileHover={{ x: 6 }}
                >
                  <span className="display shrink-0 text-lg text-crimson">{a.year}</span>
                  <p className="pt-0.5 text-sm font-semibold text-ink-soft">{a.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* certificates */}
      <section className="bg-cream/60 py-20">
        <div className="container-x">
          <SectionHead center kicker="Certificates" title="Qualified and certified" sub="Demo certificates — the admin can add the real ones anytime." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {content.certificates.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <SpotlightCard className="h-full">
                  <motion.div
                    className="card relative flex h-full flex-col items-center overflow-hidden p-8 text-center"
                    whileHover={{ y: -8, boxShadow: "0 24px 40px -24px rgba(23,18,14,0.35)" }}
                  >
                    <BorderBeam variant="crimson" />
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson/10"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#B3241F" strokeWidth="1.8">
                        <circle cx="12" cy="9" r="6" />
                        <path d="m8.5 14-2 7 5.5-3 5.5 3-2-7" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h3 className="mt-5 text-base font-bold leading-snug">{c.title}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{c.org}</p>
                  </motion.div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="container-x py-20 text-center">
        <Reveal>
          <h2 className="display mx-auto max-w-xl text-3xl sm:text-4xl">Come. Watch one class. Decide after.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">Your first trial class is completely free. No pressure, no questions.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MovingBorderLink to="/book">Book a Free Trial Seat</MovingBorderLink>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
              <Link to="/classes" className="btn-outline">See Class Timings</Link>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
