import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSite } from "../context/SiteContext";
import { Counter, Marquee, Reveal, SectionHead } from "../components/ui";
import {
  BackgroundBeams, BorderBeam, DotPattern, GridPattern, InfiniteMovingCards,
  Meteors, MovingBorderLink, PixelCard, ProfileCard, ShinyText, Sparkles,
  SpotlightCard, TextGenerate, TiltCard, WordRotate,
} from "../components/fx";

/* ================= HERO — dark, beams, meteors ================= */
function Hero() {
  const { content } = useSite();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="ink-section relative overflow-hidden">
      <BackgroundBeams id="hero" />
      <Meteors count={7} />
      <GridPattern id="hero" />
      <span className="kanji pointer-events-none absolute -right-6 bottom-0 select-none text-[16rem] leading-none text-onband/[0.05]">武</span>

      <motion.div style={{ opacity }} className="container-x relative grid items-center gap-16 pb-24 pt-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            className="chip !border-band-line !bg-band-soft !text-onband-soft"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            {content.since} · Bengaluru
          </motion.span>

          <h1 className="display mt-7 text-5xl text-onband sm:text-6xl lg:text-[4.4rem]">
            <TextGenerate text="Learn karate." />
            <br />
            <TextGenerate text="Grow strong." delay={0.25} />
            <br />
            <span className="text-crimson">
              <TextGenerate text="Stay" delay={0.5} />{" "}
              <WordRotate
                className="text-crimson"
                words={["humble.", "focused.", "fearless.", "gentle."]}
              />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-onband-soft"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {content.heroSub}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            <MovingBorderLink to="/book">
              Book Your Seat — ₹{content.bookingFee}
              <span aria-hidden>→</span>
            </MovingBorderLink>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
              <Link to="/classes" className="btn-ghost-light">See Classes</Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-11 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-onband-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
          >
            {["First class is free", "All ages welcome", "Certified black-belt teacher"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* karate fighter illustration in tilt frame */}
        <motion.div
          className="group/tilt relative mx-auto w-full max-w-md"
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard max={9}>
            <div className="relative overflow-hidden rounded-[28px] border border-band-line bg-gradient-to-b from-crimson/20 via-band to-band shadow-[0_40px_80px_-30px_rgba(23,18,14,0.5)]">
              <BorderBeam variant="gold" />
              <motion.img
                src="/images/hero-karate-cut.png"
                alt="Karate fighter in action"
                className="w-full object-contain"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-band/70 via-transparent to-transparent" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(280px circle at 70% 20%, rgba(201,162,75,0.18), transparent 65%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          </TiltCard>

          <motion.div
            className="absolute -left-9 top-14 rounded-2xl border border-band-line bg-band/85 px-4 py-3 shadow-xl backdrop-blur-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
          >
            <p className="display text-2xl text-gold"><Counter to={content.stats.students} />+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-onband-faint">Students</p>
          </motion.div>

          <motion.div
            className="absolute -right-6 bottom-16 rounded-2xl border border-crimson/40 bg-crimson px-4 py-3 text-paper shadow-[0_20px_40px_-16px_rgba(179,36,31,0.8)]"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.7 }}
          >
            <p className="display text-2xl"><Counter to={content.stats.medals} />+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-paper/75">Medals won</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative">
        <Marquee light items={["Discipline", "Respect", "Focus", "Strength", "Humility", "Courage"]} />
      </div>
    </section>
  );
}

/* ================= WHY US — spotlight cards ================= */
const whyUs = [
  { n: "01", t: "Learn to protect yourself", d: "Real self-defence, taught step by step. You will feel safe and sure." },
  { n: "02", t: "Small groups, real attention", d: "The teacher knows every student by name. Nobody is left behind." },
  { n: "03", t: "Discipline that stays", d: "Focus and respect learned on the mat helps in school, work and life." },
  { n: "04", t: "Strong body, calm mind", d: "Every class makes you fitter and calmer. You will sleep better too." },
];

function WhyUs() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <DotPattern id="why" />
      <div className="container-x relative">
        <SectionHead kicker="Why join us" title="A dojo that feels like family" sub="Four simple reasons why families trust us with their children." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.09}>
              <SpotlightCard className="card h-full p-7">
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <span className="display text-4xl text-line">{w.n}</span>
                  <h3 className="mt-5 text-lg font-bold leading-snug">{w.t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{w.d}</p>
                  <span className="rule-sun mt-6 block" />
                </motion.div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= STATS — ink band, sparkles, grid ================= */
function StatsBand() {
  const { content } = useSite();
  const stats = [
    { v: content.stats.students, s: "+", l: "Students trained" },
    { v: content.stats.years, s: "+", l: "Years of teaching" },
    { v: content.stats.medals, s: "+", l: "Medals won by our students" },
  ];
  return (
    <section className="ink-section relative overflow-hidden">
      <GridPattern id="stats" />
      <Sparkles count={22} className="opacity-70" />
      <Meteors count={4} />
      <div className="container-x relative grid gap-10 py-16 text-center sm:grid-cols-3 sm:py-20">
        {stats.map((st, i) => (
          <Reveal key={st.l} delay={i * 0.12}>
            <p className="display text-5xl text-onband sm:text-6xl">
              <Counter to={st.v} /><span className="text-crimson">{st.s}</span>
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.26em] text-onband-faint">{st.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= PROGRAMS — tilt cards ================= */
function Programs() {
  const { content } = useSite();
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead kicker="Programs" title="Find your group" sub="Three simple groups. Pick the one that fits your age." />
        <Reveal delay={0.2}>
          <Link to="/classes" className="btn-outline">Full timetable</Link>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {content.programs.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <TiltCard className="group/tilt h-full" max={7}>
              <PixelCard className={`h-full rounded-3xl border ${i === 1 ? "border-crimson/60" : "border-line"}`} pixelSize={24}>
                <div className={`relative h-full rounded-3xl p-8 ${i === 1 ? "bg-band/85 backdrop-blur-sm" : "bg-surface backdrop-blur-md"}`}>
                  {i === 1 && <GridPattern id={`prog-${i}`} />}
                  <motion.span
                    className="relative inline-block text-4xl"
                    whileHover={{ rotate: [0, -14, 12, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {p.icon}
                  </motion.span>
                  <h3 className="display relative mt-5 text-2xl">{p.name}</h3>
                  <p className={`relative mt-1 text-xs font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-gold" : "text-crimson"}`}>{p.ages}</p>
                  <p className={`relative mt-4 text-sm leading-relaxed ${i === 1 ? "text-onband-soft" : "text-muted"}`}>{p.desc}</p>
                  <Link
                    to="/book"
                    className={`relative mt-7 inline-flex items-center gap-2 text-sm font-bold ${i === 1 ? "text-onband" : "text-ink"}`}
                  >
                    Join this group
                    <motion.span aria-hidden whileHover={{ x: 4 }}>→</motion.span>
                  </Link>
                </div>
              </PixelCard>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= MASTER — evervault-style text wall ================= */
function MasterTeaser() {
  const { content } = useSite();
  return (
    <section className="bg-cream/60 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <motion.div
            className="relative mx-auto max-w-xs"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <ProfileCard
              photo={content.masterPhoto}
              name={content.masterName}
              title={content.masterRank}
              socials={[
                { label: "Instagram", href: content.socials.instagram, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" /></svg> },
                { label: "YouTube", href: content.socials.youtube, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z" /></svg> },
              ]}
            />
          </motion.div>
        </Reveal>
        <div>
          <SectionHead kicker="Your teacher" title={`Meet ${content.masterName}`} />
          <div className="relative mt-6 max-w-xl">
            <TextGenerate className="relative text-base leading-relaxed text-ink-soft" text={content.masterBio} />
          </div>
          <div className="mt-8 space-y-3">
            {content.achievements.slice(0, 3).map((a, i) => (
              <Reveal key={a.text} delay={0.1 + i * 0.08}>
                <motion.div className="flex items-start gap-4" whileHover={{ x: 6 }}>
                  <span className="display shrink-0 rounded-full border border-crimson/30 px-3 py-1 text-sm text-crimson">{a.year}</span>
                  <p className="pt-1 text-sm font-semibold text-ink-soft">{a.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <Link to="/about" className="btn-outline mt-9">Read the full story</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= TESTIMONIALS — infinite moving cards ================= */
const testimonials = [
  { q: "My son used to be very shy. After one year here he performs on stage and stands straight. The teacher is patient and kind.", n: "Sunitha R.", r: "Parent · Little Tigers" },
  { q: "I joined for fitness. I stayed for the peace of mind. Best one hour of my day, every time.", n: "Praveen M.", r: "Adult student" },
  { q: "The dojo is clean, timings are clear, and fees are honest. My daughter won her first medal this year!", n: "Anand K.", r: "Parent · Juniors" },
  { q: "They teach respect first, karate second. Exactly what we wanted for our boys.", n: "Lakshmi & Rao", r: "Parents" },
];

function TestimonialCard({ t }) {
  return (
    <figure className="card relative h-full overflow-hidden p-8">
      <BorderBeam />
      <span className="display text-5xl leading-none text-crimson">"</span>
      <blockquote className="mt-2 text-sm leading-relaxed text-ink-soft">{t.q}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson text-sm font-bold text-paper">
          {t.n[0]}
        </span>
        <span>
          <p className="text-sm font-bold">{t.n}</p>
          <p className="text-xs text-muted">{t.r}</p>
        </span>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead center kicker="Kind words" title="Families who train with us" />
      </div>
      <Reveal className="mt-12">
        <InfiniteMovingCards cards={testimonials.map((t) => <TestimonialCard t={t} />)} />
        <div className="h-6" />
        <InfiniteMovingCards cards={[...testimonials].reverse().map((t) => <TestimonialCard t={t} />)} reverse />
      </Reveal>
    </section>
  );
}

/* ================= CTA — beams + meteors ================= */
function CtaBand() {
  const { content } = useSite();
  return (
    <section className="container-x pb-24">
      <Reveal>
        <div className="ink-section relative overflow-hidden rounded-[36px] px-8 py-16 text-center sm:px-16 sm:py-20">
          <BackgroundBeams id="cta" />
          <Meteors count={6} />
          <Sparkles count={14} />
          <span className="kanji pointer-events-none absolute -bottom-16 left-6 select-none text-[10rem] leading-none text-onband/[0.06]">武</span>
          <h2 className="display relative mx-auto max-w-2xl text-3xl text-onband sm:text-5xl">
            Your first step costs only <ShinyText speed={2.6}>₹{content.bookingFee}</ShinyText>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-sm leading-relaxed text-onband-soft">
            Book your seat online in two minutes. Pay securely with any UPI app. We will call you to say hello.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-4">
            <MovingBorderLink to="/book" innerClassName="!bg-paper !text-[#17120e] hover:!bg-cream">
              Book My Seat Now
            </MovingBorderLink>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contact" className="btn-ghost-light">Ask a Question</Link>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <StatsBand />
      <Programs />
      <MasterTeaser />
      <Testimonials />
      <CtaBand />
    </>
  );
}
