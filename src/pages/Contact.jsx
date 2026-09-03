import { useState } from "react";
import { motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { Reveal, SectionHead } from "../components/ui";
import { AuroraBackground, BorderBeam, BorderGlow, MovingBorderButton, Sparkles, SpotlightCard } from "../components/fx";

function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card flex h-full flex-col items-center justify-center p-10 text-center"
      >
        <motion.span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson text-3xl text-paper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
        >
          ✓
        </motion.span>
        <h3 className="display mt-5 text-2xl">Message received.</h3>
        <p className="mt-2 text-sm text-muted">We will call you soon. For anything urgent, please call us directly.</p>
      </motion.div>
    );
  }

  return (
    <form
      className="card p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="display text-2xl">Ask us anything</h3>
      <p className="mt-1.5 text-sm text-muted">Fill this small form. We reply within a day.</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="field-label">Your name</label>
          <input required className="field" placeholder="e.g. Ravi Kumar" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="field-label">Phone number</label>
          <input required type="tel" pattern="[0-9+ ]{8,15}" className="field" placeholder="e.g. 98765 43210" value={form.phone} onChange={set("phone")} />
        </div>
        <div>
          <label className="field-label">Your question</label>
          <textarea required rows="4" className="field resize-none" placeholder="Ask about fees, timings, age, anything…" value={form.msg} onChange={set("msg")} />
        </div>
        <MovingBorderButton type="submit" className="w-full" innerClassName="w-full">Send Message</MovingBorderButton>
      </div>
    </form>
  );
}

export default function Contact() {
  const { content } = useSite();
  const srcMatch = content.mapEmbed.match(/src="([^"]+)"/);
  const mapSrc = srcMatch ? srcMatch[1] : content.mapEmbed;

  const cards = [
    { icon: "📞", label: "Call us", value: content.phone, href: `tel:${content.phone}` },
    { icon: "✉", label: "Email", value: content.email, href: `mailto:${content.email}` },
    { icon: "📍", label: "Dojo", value: content.address },
  ];

  return (
    <>
      <section className="ink-section relative overflow-hidden py-20 sm:py-24">
        <AuroraBackground />
        <Sparkles count={16} />
        <div className="container-x relative">
          <span className="kicker on-band">Contact</span>
          <h2 className="display mt-4 max-w-2xl text-3xl text-onband sm:text-5xl">Talk to us. We are friendly.</h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-onband-soft">
            Call, email, or just drop by during class hours. You can also watch a class before joining.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-5 pb-16 sm:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <BorderGlow className="h-full">
              <SpotlightCard className="h-full">
                <motion.div
                  className="card h-full p-7"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1.5 block text-sm font-bold text-ink hover:text-crimson">{c.value}</a>
                  ) : (
                    <p className="mt-1.5 text-sm font-bold leading-relaxed">{c.value}</p>
                  )}
                </motion.div>
              </SpotlightCard>
            </BorderGlow>
          </Reveal>
        ))}
      </section>

      <section className="container-x grid gap-8 pb-24 lg:grid-cols-2">
        <Reveal>
          <div className="card relative overflow-hidden">
            <BorderBeam />
            <iframe
              src={mapSrc}
              className="h-[420px] w-full border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Vrushabh Kalashaala location"
            />
            <div className="px-7 py-5">
              <p className="text-sm font-bold">Find us on the map</p>
              <p className="mt-1 text-xs text-muted">New here? Come 10 minutes early and ask for the master.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <EnquiryForm />
        </Reveal>
      </section>
    </>
  );
}
