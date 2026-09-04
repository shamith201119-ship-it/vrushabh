import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { Reveal, SectionHead } from "../components/ui";
import { BorderBeam, Meteors, MovingBorderButton, Sparkles } from "../components/fx";

const steps = ["Your Details", "Pay ₹250", "Confirm Payment", "Done"];

const stepAnim = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

function Stepper({ current }) {
  return (
    <div className="mb-12 flex items-center justify-center gap-0">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                i < current
                  ? "border-crimson bg-crimson text-paper"
                  : i === current
                    ? "border-crimson bg-surface text-crimson"
                    : "border-line bg-surface text-muted"
              }`}
              animate={i === current ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ repeat: i === current ? Infinity : 0, duration: 1.6 }}
            >
              {i < current ? "✓" : i + 1}
            </motion.div>
            <span className={`mt-2 hidden text-[11px] font-bold uppercase tracking-wider sm:block ${i <= current ? "text-ink" : "text-muted"}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="mx-2 mb-5 h-[2px] w-8 overflow-hidden rounded bg-line sm:w-16">
              <motion.div
                className="h-full bg-crimson"
                initial={false}
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Book() {
  const { content, addBooking } = useSite();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", program: content.programs[0]?.name || "", slot: content.slots[0] || "", experience: "Beginner" });
  const [txn, setTxn] = useState("");
  const [txnError, setTxnError] = useState("");
  const [booking, setBooking] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const upiLink = useMemo(() => {
    return `upi://pay?pa=${encodeURIComponent(content.upiId)}&pn=${encodeURIComponent(content.schoolName)}&am=${content.bookingFee}&cu=INR&tn=${encodeURIComponent("Seat booking")}`;
  }, [content.upiId, content.schoolName, content.bookingFee]);

  const submitDetails = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const confirmTxn = (e) => {
    e.preventDefault();
    if (txn.trim().length < 6) {
      setTxnError("Please enter the full transaction number (at least 6 characters).");
      return;
    }
    const b = addBooking({ ...form, txn: txn.trim() });
    setBooking(b);
    setStep(3);
  };

  return (
    <section className="container-x max-w-3xl py-14 sm:py-20">
      <SectionHead center kicker="Book your seat" title="Two minutes. One seat. Yours." sub={`Pay ₹${content.bookingFee} once to reserve your place. We confirm every booking with a call.`} />

      {/* floating accents around the form */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 overflow-hidden opacity-60">
        <Sparkles count={12} />
      </div>

      <div className="mt-12">
        <Stepper current={step} />

        <AnimatePresence mode="wait">
          {/* STEP 1 — details */}
          {step === 0 && (
            <motion.form key="s0" {...stepAnim} className="card p-8 sm:p-10" onSubmit={submitDetails}>
              <h3 className="display text-2xl">Tell us about the student</h3>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="field-label">Full name *</label>
                  <input required className="field" placeholder="e.g. Aarav Sharma" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className="field-label">Age *</label>
                  <input required type="number" min="4" max="80" className="field" placeholder="e.g. 9" value={form.age} onChange={set("age")} />
                </div>
                <div>
                  <label className="field-label">Phone number *</label>
                  <input required type="tel" pattern="[0-9+ ]{8,15}" className="field" placeholder="e.g. 98765 43210" value={form.phone} onChange={set("phone")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Email</label>
                  <input type="email" className="field" placeholder="you@example.com (optional)" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className="field-label">Choose group *</label>
                  <select className="field" value={form.program} onChange={set("program")}>
                    {content.programs.map((p) => (
                      <option key={p.name} value={p.name}>{p.name} · {p.ages}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Preferred timing *</label>
                  <select className="field" value={form.slot} onChange={set("slot")}>
                    {content.slots.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Karate experience</label>
                  <div className="flex gap-3">
                    {["Beginner", "Some experience"].map((x) => (
                      <button
                        type="button"
                        key={x}
                        onClick={() => setForm((f) => ({ ...f, experience: x }))}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                          form.experience === x ? "border-crimson bg-crimson text-paper" : "border-line bg-surface text-ink-soft hover:border-crimson/50"
                        }`}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <motion.button type="submit" className="btn-primary mt-8 w-full" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Continue to Payment →
              </motion.button>
            </motion.form>
          )}

          {/* STEP 2 — pay */}
          {step === 1 && (
            <motion.div key="s1" {...stepAnim} className="card p-8 sm:p-10">
              <h3 className="display text-2xl">Pay ₹{content.bookingFee} with any UPI app</h3>
              <p className="mt-1.5 text-sm text-muted">GPay, PhonePe, Paytm — any app works. Scan the code below.</p>

              <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-8">
                <BorderBeam />
                <AnimatePresence mode="wait">
                  {content.qrImage ? (
                    <motion.img
                      key="custom-qr"
                      src={content.qrImage}
                      alt="UPI QR code"
                      className="h-56 w-56 rounded-xl border border-line object-contain"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  ) : (
                    <motion.div
                      key="generated-qr"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-line bg-surface p-4"
                    >
                      <QRCodeSVG value={upiLink} size={200} fgColor="#17120e" bgColor="#ffffff" level="M" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">UPI ID</p>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="rounded-lg bg-cream px-3 py-1.5 text-sm font-bold">{content.upiId}</code>
                    <motion.button
                      type="button"
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold hover:border-crimson hover:text-crimson"
                      whileTap={{ scale: 0.92 }}
                      onClick={() => navigator.clipboard?.writeText(content.upiId)}
                    >
                      Copy
                    </motion.button>
                  </div>
                  <p className="mt-3 text-xs text-muted">Or open any UPI app and tap "Scan QR". Amount: ₹{content.bookingFee}</p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <motion.button type="button" className="btn-outline flex-1" whileTap={{ scale: 0.97 }} onClick={() => setStep(0)}>
                  ← Back
                </motion.button>
                <MovingBorderButton type="button" className="flex-[2]" innerClassName="w-full" onClick={() => setStep(2)}>
                  I Have Paid →
                </MovingBorderButton>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — txn id */}
          {step === 2 && (
            <motion.form key="s2" {...stepAnim} className="card p-8 sm:p-10" onSubmit={confirmTxn}>
              <h3 className="display text-2xl">Enter your transaction number</h3>
              <p className="mt-1.5 text-sm text-muted">After paying, your UPI app shows a UPI reference / transaction number. Type it here.</p>

              <div className="mt-7">
                <label className="field-label">UPI transaction / reference number *</label>
                <input
                  className={`field text-lg font-bold tracking-widest ${txnError ? "border-crimson" : ""}`}
                  placeholder="e.g. 4135 7892 4561"
                  value={txn}
                  onChange={(e) => { setTxn(e.target.value); setTxnError(""); }}
                />
                {txnError && <p className="mt-2 text-xs font-bold text-crimson">{txnError}</p>}
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
                <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#B3241F]" />
                I confirm I have paid ₹{content.bookingFee} to {content.upiId} and the details above are correct.
              </label>

              <div className="mt-8 flex gap-3">
                <motion.button type="button" className="btn-outline flex-1" whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}>
                  ← Back
                </motion.button>
                <motion.button type="submit" className="btn-primary flex-[2]" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  Finish Booking ✓
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* STEP 4 — done */}
          {step === 3 && booking && (
            <motion.div key="s3" {...stepAnim} className="ink-section relative overflow-visible rounded-3xl p-10 text-center">
              <Meteors count={8} />
              <Sparkles count={18} />
              <motion.div
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-crimson text-4xl text-paper shadow-[0_0_60px_-10px_rgba(179,36,31,0.9)]"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 14 }}
              >
                ✓
              </motion.div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute left-1/2 top-24 h-2 w-2 rounded-full bg-gold"
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos((i / 6) * Math.PI * 2) * 100,
                    y: Math.sin((i / 6) * Math.PI * 2) * 60,
                    scale: 0.4,
                  }}
                  transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
                />
              ))}
              <h3 className="display relative mt-6 text-3xl text-onband">Your seat is booked!</h3>
              <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-onband-soft">
                Thank you, {booking.name.split(" ")[0]}! We will call you on <b>{booking.phone}</b> within 24 hours to confirm your slot. Please keep your transaction number safe.
              </p>

              <div className="relative mx-auto mt-8 max-w-sm rounded-2xl border border-band-line bg-band-soft p-6 text-left text-sm backdrop-blur-sm">
                <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-gold">Booking ID</p>
                <p className="display mt-1 text-center text-2xl tracking-widest text-onband">{booking.id}</p>
                <div className="mt-4 space-y-1.5 border-t border-band-line pt-4 text-onband-soft">
                  <p><b>Name:</b> {booking.name}</p>
                  <p><b>Group:</b> {booking.program}</p>
                  <p><b>Timing:</b> {booking.slot}</p>
                  <p><b>Paid:</b> ₹{content.bookingFee} · Txn: {booking.txn}</p>
                </div>
              </div>

              <Link to="/" className="btn-ghost-light relative mt-8">Back to Home</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal className="mt-8">
        <p className="text-center text-xs text-muted">
          Any problem with payment? <Link to="/contact" className="font-bold text-crimson hover:underline">Contact us</Link> — we will help.
        </p>
      </Reveal>
    </section>
  );
}
