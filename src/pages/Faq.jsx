import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, SectionHead } from "../components/ui";
import { BorderBeam, Meteors, MovingBorderLink, Sparkles, TextGenerate } from "../components/fx";

const faqs = [
  {
    q: "What is the right age to start karate?",
    a: "Children can start from 5 years old. We have three groups — Little Tigers (5–9), Juniors (10–15) and Adults (16+). You are never too old to begin. Our oldest beginner was 42!",
  },
  {
    q: "I have never done karate before. Can I still join?",
    a: "Yes! Most of our students start with zero experience. The first classes are slow and simple — how to stand, how to bow, how to fall safely. You will not be thrown into anything hard.",
  },
  {
    q: "Can I try one class before paying?",
    a: "Absolutely. Your first trial class is completely free. Come in comfortable clothes, watch or join, and decide after. To reserve a seat, the one-time booking is ₹250 — it is adjusted in your first month.",
  },
  {
    q: "How much does it cost every month?",
    a: "The monthly fee is ₹800. There are no hidden charges. Belts, certificates and grading fees are told to you clearly before every test — never after.",
  },
  {
    q: "Is karate safe for my child?",
    a: "Safety comes first in our dojo. Kids train on soft mats, contact is controlled, and the teacher watches every pair. Warm-ups, discipline and slow progress keep injuries almost zero.",
  },
  {
    q: "How long does it take to get a black belt?",
    a: "With regular practice, around 4 to 5 years. But belts are not a race. Every student grows at their own speed, and we test you only when you are truly ready.",
  },
  {
    q: "What should I bring on my first day?",
    a: "Just three things — a water bottle, comfortable clothes (any t-shirt and track pants), and a smile. We will guide you about the karate uniform (gi) after your first class.",
  },
  {
    q: "Can parents stay and watch the class?",
    a: "Yes, parents are always welcome to watch. Many parents sit through the class — seeing the training yourself is the best way to trust it.",
  },
  {
    q: "What if I miss a class?",
    a: "Life happens — no problem. You can attend any other batch in the same week to cover up. Just inform the teacher once.",
  },
  {
    q: "Do you prepare students for competitions?",
    a: "Yes. Students who are interested get extra training for district and state championships. Our students have won 120+ medals — but competing is always your choice, never forced.",
  },
];

function FaqItem({ item, open, onClick }) {
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open ? "border-crimson/40 bg-surface" : "border-line bg-surface hover:border-crimson/30"
      }`}
      layout
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-4">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${open ? "bg-crimson text-paper" : "bg-cream text-crimson"}`}>
            ?
          </span>
          <span className="text-sm font-bold sm:text-base">{item.q}</span>
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg leading-none ${open ? "border-crimson text-crimson" : "border-line text-muted"}`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 pl-[72px] text-sm leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <>
      {/* head */}
      <section className="ink-section relative overflow-hidden">
        <Meteors count={5} />
        <Sparkles count={14} />
        <span className="kanji pointer-events-none absolute -top-8 right-2 select-none text-[13rem] leading-none text-onband/[0.05]">問</span>
        <div className="container-x relative py-20 sm:py-24">
          <span className="kicker on-band">FAQ</span>
          <h2 className="display mt-4 max-w-2xl text-3xl text-onband sm:text-5xl">
            <TextGenerate text="Questions? We have simple answers." />
          </h2>
          <TextGenerate
            className="mt-5 block max-w-lg text-sm leading-relaxed text-onband-soft"
            text="Everything parents and students ask us before joining. If your question is not here, just call or message us."
            delay={0.3}
          />
        </div>
      </section>

      {/* accordion */}
      <section className="container-x relative max-w-3xl py-16 sm:py-20">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 0.05, 0.3)}>
              <FaqItem item={f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* still have questions */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="ink-section relative overflow-hidden rounded-[36px] px-8 py-14 text-center sm:px-16">
            <BorderBeam variant="gold" />
            <Meteors count={4} />
            <h3 className="display relative text-2xl text-onband sm:text-3xl">Still thinking? Just ask us.</h3>
            <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-onband-soft">
              Call us, message us, or simply come watch one class for free. Seeing is believing.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <MovingBorderLink to="/contact" innerClassName="!bg-paper !text-[#17120e] hover:!bg-cream">
                Contact Us
              </MovingBorderLink>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
                <Link to="/book" className="btn-ghost-light">Book a Seat — ₹250</Link>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
