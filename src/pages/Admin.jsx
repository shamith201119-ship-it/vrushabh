import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useSite, fileToCompressedDataURL, DEFAULT_CONTENT } from "../context/SiteContext";
import { LogoMark } from "../components/ui";

/* ---------- small building blocks ---------- */
function Field({ label, value, onChange, type = "text", ...rest }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input type={type} className="field" value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest} />
    </div>
  );
}

function Area({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <textarea rows={rows} className="field resize-none" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Card({ title, desc, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-line bg-surface p-7"
    >
      {title && <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-crimson">{title}</h3>}
      {desc && <p className="mt-1 text-xs text-muted">{desc}</p>}
      <div className={title ? "mt-5" : ""}>{children}</div>
    </motion.div>
  );
}

function ImagePicker({ label, value, onChange, hint }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-line bg-surface p-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface">
        {value ? <img src={value} alt={label} className="h-full w-full object-cover" /> : <span className="text-xl opacity-30">🖼</span>}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{label}</p>
        {hint && <p className="text-xs text-muted">{hint}</p>}
        <div className="mt-2 flex gap-2">
          <label className="cursor-pointer rounded-lg bg-night px-3 py-1.5 text-xs font-bold text-paper hover:bg-crimson">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) onChange(await fileToCompressedDataURL(file));
              }}
            />
          </label>
          {value && (
            <button type="button" onClick={() => onChange(null)} className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold text-muted hover:border-crimson hover:text-crimson">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- tabs ---------- */
function OverviewTab() {
  const { bookings } = useSite();
  const revenue = bookings.filter((b) => b.status === "confirmed").length * 250;
  const cards = [
    { l: "Total bookings", v: bookings.length, i: "📋" },
    { l: "Pending", v: bookings.filter((b) => b.status === "pending").length, i: "⏳" },
    { l: "Confirmed", v: bookings.filter((b) => b.status === "confirmed").length, i: "✅" },
    { l: "Collected (₹)", v: revenue, i: "💰" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.l}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl border border-line bg-surface p-6"
            whileHover={{ y: -4 }}
          >
            <span className="text-2xl">{c.i}</span>
            <p className="display mt-3 text-3xl">{c.v}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">{c.l}</p>
          </motion.div>
        ))}
      </div>
      <Card title="Latest bookings">
        {bookings.length === 0 ? (
          <p className="text-sm text-muted">No bookings yet. They will appear here the moment someone books a seat.</p>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface px-4 py-3 text-sm">
                <span className="font-bold">{b.name} <span className="font-normal text-muted">· {b.phone}</span></span>
                <span className="text-xs text-muted">{new Date(b.createdAt).toLocaleString()}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function BookingsTab() {
  const { bookings, setBookingStatus, deleteBooking } = useSite();

  const exportCSV = () => {
    const head = ["ID", "Name", "Age", "Phone", "Email", "Group", "Timing", "Experience", "Txn", "Status", "Booked At"];
    const rows = bookings.map((b) => [b.id, b.name, b.age, b.phone, b.email, b.program, b.slot, b.experience, b.txn, b.status, new Date(b.createdAt).toLocaleString()]);
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "vrushabh-bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card title={`All bookings (${bookings.length})`} desc="Every person who booked a seat, with all their details.">
      {bookings.length === 0 ? (
        <p className="text-sm text-muted">Nothing here yet.</p>
      ) : (
        <>
          <button onClick={exportCSV} className="mb-4 rounded-lg bg-night px-4 py-2 text-xs font-bold text-paper hover:bg-crimson">
            ⬇ Export CSV
          </button>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-widest text-muted">
                  {["Booking", "Student", "Contact", "Group / Timing", "Payment", "Status", ""].map((h) => (
                    <th key={h} className="pb-3 pr-4 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <motion.tr key={b.id} className="border-b border-line/60 align-top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <td className="py-4 pr-4">
                      <p className="font-bold">{b.id}</p>
                      <p className="text-xs text-muted">{new Date(b.createdAt).toLocaleString()}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-bold">{b.name}</p>
                      <p className="text-xs text-muted">{b.age} yrs · {b.experience}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p>{b.phone}</p>
                      <p className="text-xs text-muted">{b.email || "—"}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p>{b.program}</p>
                      <p className="text-xs text-muted">{b.slot}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-semibold">₹250</p>
                      <p className="text-xs text-muted">Txn: {b.txn}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <select
                        value={b.status}
                        onChange={(e) => setBookingStatus(b.id, e.target.value)}
                        className={`rounded-lg border px-2 py-1.5 text-xs font-bold ${
                          b.status === "confirmed" ? "border-green-300 bg-green-50 text-green-700" : b.status === "cancelled" ? "border-red-300 bg-red-50 text-red-700" : "border-amber-300 bg-amber-50 text-amber-700"
                        }`}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="py-4">
                      <button onClick={() => deleteBooking(b.id)} className="text-xs font-bold text-muted hover:text-crimson">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  );
}

function ContentTab() {
  const { content, update, setContent } = useSite();
  const u = (k) => (v) => update({ [k]: v });

  const listHelpers = {
    achievements: () => update({ achievements: [...content.achievements, { year: "20XX", text: "New achievement" }] }),
    certificates: () => update({ certificates: [...content.certificates, { title: "New certificate", org: "Issuing body" }] }),
    timings: () => update({ timings: [...content.timings, { days: "Day", kids: "Time", adults: "Time" }] }),
    programs: () => update({ programs: [...content.programs, { name: "New group", ages: "Age ?", desc: "Description", icon: "🥋" }] }),
    slots: () => update({ slots: [...content.slots, "New slot"] }),
  };

  const setListItem = (key, i, field, value) => {
    const copy = [...content[key]];
    copy[i] = typeof copy[i] === "object" ? { ...copy[i], [field]: value } : value;
    update({ [key]: copy });
  };
  const removeListItem = (key, i) => update({ [key]: content[key].filter((_, x) => x !== i) });

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { if (confirm("Reset ALL text content back to the demo defaults?")) setContent(DEFAULT_CONTENT); }} className="text-xs font-bold text-muted hover:text-crimson">
          ↺ Reset content to demo defaults
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="School basics">
          <div className="space-y-4">
            <Field label="School name" value={content.schoolName} onChange={u("schoolName")} />
            <Field label="Tagline" value={content.tagline} onChange={u("tagline")} />
            <Area label="Hero title (use Enter for new lines)" value={content.heroTitle} onChange={u("heroTitle")} />
            <Area label="Hero sub text" value={content.heroSub} onChange={u("heroSub")} rows={4} />
            <Field label="Badge text (e.g. Since 2011)" value={content.since} onChange={u("since")} />
          </div>
        </Card>

        <Card title="Contact & location">
          <div className="space-y-4">
            <Field label="Phone" value={content.phone} onChange={u("phone")} />
            <Field label="Email" value={content.email} onChange={u("email")} />
            <Area label="Address" value={content.address} onChange={u("address")} />
            <Field label="UPI ID" value={content.upiId} onChange={u("upiId")} />
            <Field label="Booking fee (₹)" type="number" value={content.bookingFee} onChange={(v) => update({ bookingFee: Number(v) || 0 })} />
            <Area label="Monthly fee note" value={content.feesNote} onChange={u("feesNote")} />
            <Area label="Google Maps embed code (full <iframe> code or just the src link)" rows={4} value={content.mapEmbed} onChange={u("mapEmbed")} />
          </div>
        </Card>

        <Card title="The master">
          <div className="space-y-4">
            <Field label="Master name" value={content.masterName} onChange={u("masterName")} />
            <Field label="Rank / title" value={content.masterRank} onChange={u("masterRank")} />
            <Area label="Bio" rows={5} value={content.masterBio} onChange={u("masterBio")} />
          </div>
        </Card>

        <Card title="Stats (numbers on home page)">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Students" type="number" value={content.stats.students} onChange={(v) => update({ stats: { ...content.stats, students: Number(v) || 0 } })} />
            <Field label="Years" type="number" value={content.stats.years} onChange={(v) => update({ stats: { ...content.stats, years: Number(v) || 0 } })} />
            <Field label="Medals" type="number" value={content.stats.medals} onChange={(v) => update({ stats: { ...content.stats, medals: Number(v) || 0 } })} />
          </div>
        </Card>

        <Card title="Achievements" desc="Year + one line each.">
          <div className="space-y-3">
            {content.achievements.map((a, i) => (
              <div key={i} className="flex gap-2">
                <input className="field !w-24" value={a.year} onChange={(e) => setListItem("achievements", i, "year", e.target.value)} />
                <input className="field" value={a.text} onChange={(e) => setListItem("achievements", i, "text", e.target.value)} />
                <button onClick={() => removeListItem("achievements", i)} className="px-2 text-muted hover:text-crimson">✕</button>
              </div>
            ))}
            <button onClick={listHelpers.achievements} className="text-xs font-bold text-crimson">+ Add achievement</button>
          </div>
        </Card>

        <Card title="Certificates">
          <div className="space-y-3">
            {content.certificates.map((c, i) => (
              <div key={i} className="space-y-2 rounded-xl bg-surface p-3">
                <div className="flex gap-2">
                  <input className="field" value={c.title} onChange={(e) => setListItem("certificates", i, "title", e.target.value)} />
                  <button onClick={() => removeListItem("certificates", i)} className="px-2 text-muted hover:text-crimson">✕</button>
                </div>
                <input className="field" value={c.org} onChange={(e) => setListItem("certificates", i, "org", e.target.value)} />
              </div>
            ))}
            <button onClick={listHelpers.certificates} className="text-xs font-bold text-crimson">+ Add certificate</button>
          </div>
        </Card>

        <Card title="Class timings">
          <div className="space-y-3">
            {content.timings.map((t, i) => (
              <div key={i} className="flex gap-2">
                <input className="field" value={t.days} onChange={(e) => setListItem("timings", i, "days", e.target.value)} />
                <input className="field" value={t.kids} onChange={(e) => setListItem("timings", i, "kids", e.target.value)} />
                <input className="field" value={t.adults} onChange={(e) => setListItem("timings", i, "adults", e.target.value)} />
                <button onClick={() => removeListItem("timings", i)} className="px-2 text-muted hover:text-crimson">✕</button>
              </div>
            ))}
            <button onClick={listHelpers.timings} className="text-xs font-bold text-crimson">+ Add row</button>
          </div>
        </Card>

        <Card title="Programs">
          <div className="space-y-3">
            {content.programs.map((p, i) => (
              <div key={i} className="space-y-2 rounded-xl bg-surface p-3">
                <div className="flex gap-2">
                  <input className="field !w-16 text-center" value={p.icon} onChange={(e) => setListItem("programs", i, "icon", e.target.value)} />
                  <input className="field" value={p.name} onChange={(e) => setListItem("programs", i, "name", e.target.value)} />
                  <button onClick={() => removeListItem("programs", i)} className="px-2 text-muted hover:text-crimson">✕</button>
                </div>
                <input className="field" value={p.ages} onChange={(e) => setListItem("programs", i, "ages", e.target.value)} />
                <input className="field" value={p.desc} onChange={(e) => setListItem("programs", i, "desc", e.target.value)} />
              </div>
            ))}
            <button onClick={listHelpers.programs} className="text-xs font-bold text-crimson">+ Add program</button>
          </div>
        </Card>

        <Card title="Booking time slots" desc="One per line in the dropdown.">
          <div className="space-y-2">
            {content.slots.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input className="field" value={s} onChange={(e) => setListItem("slots", i, null, e.target.value)} />
                <button onClick={() => removeListItem("slots", i)} className="px-2 text-muted hover:text-crimson">✕</button>
              </div>
            ))}
            <button onClick={listHelpers.slots} className="text-xs font-bold text-crimson">+ Add slot</button>
          </div>
        </Card>

        <Card title="Social media links">
          <div className="space-y-4">
            <Field label="Instagram URL" value={content.socials.instagram} onChange={(v) => update({ socials: { ...content.socials, instagram: v } })} />
            <Field label="YouTube URL" value={content.socials.youtube} onChange={(v) => update({ socials: { ...content.socials, youtube: v } })} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function MediaTab() {
  const { content, update } = useSite();

  const addGallery = async (files) => {
    const arr = [];
    for (const f of files) {
      const src = await fileToCompressedDataURL(f);
      arr.push({ src, caption: f.name.replace(/\.[^.]+$/, "") });
    }
    update({ gallery: [...content.gallery, ...arr] });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Logo" desc="Square image works best.">
          <ImagePicker label="School logo" value={content.logo} onChange={(v) => update({ logo: v })} />
        </Card>
        <Card title="Master photo" desc="Shows on the home page and about page.">
          <ImagePicker label="Master professional photo" value={content.masterPhoto} onChange={(v) => update({ masterPhoto: v })} />
        </Card>
        <Card title="Payment QR code" desc="Upload YOUR real UPI QR. If empty, the site shows an auto-generated QR from your UPI ID.">
          <ImagePicker label="UPI QR image" value={content.qrImage} onChange={(v) => update({ qrImage: v })} />
        </Card>
        <Card title={`Student gallery (${content.gallery.length} photos)`} desc="Student photos in costume, medals, certificates — everything.">
          <label className="inline-block cursor-pointer rounded-lg bg-night px-4 py-2 text-xs font-bold text-paper hover:bg-crimson">
            + Add photos
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && addGallery([...e.target.files])} />
          </label>
          {content.gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {content.gallery.map((g, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl border border-line">
                  <img src={g.src} alt={g.caption} className="aspect-square w-full object-cover" />
                  <button
                    onClick={() => update({ gallery: content.gallery.filter((_, x) => x !== i) })}
                    className="absolute right-1.5 top-1.5 rounded-full bg-ink/80 px-2 py-0.5 text-xs text-bg opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function SettingsTab() {
  const { adminCreds, setAdminCreds, resetAll, logout } = useSite();
  const [creds, setCreds] = useState(adminCreds);
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Change admin username / password">
        <div className="space-y-4">
          <Field label="Username" value={creds.username} onChange={(v) => setCreds((c) => ({ ...c, username: v }))} />
          <Field label="Password" value={creds.password} onChange={(v) => setCreds((c) => ({ ...c, password: v }))} />
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { setAdminCreds(creds); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
              className="btn-primary !px-6 !py-2.5"
            >
              Save
            </motion.button>
            {saved && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-green-600">Saved ✓</motion.span>}
          </div>
        </div>
      </Card>

      <Card title="Danger zone">
        <div className="space-y-4">
          <p className="text-sm text-muted">Reset wipes all content edits and every booking back to a fresh demo state. This cannot be undone.</p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { if (confirm("Really reset everything — content AND bookings?")) resetAll(); }}
            className="btn border !border-crimson !text-crimson hover:!bg-crimson hover:!text-paper"
          >
            Reset everything
          </motion.button>
          <button onClick={logout} className="block text-xs font-bold text-muted hover:text-crimson">Log out of admin panel</button>
        </div>
      </Card>
    </div>
  );
}

/* ---------- main panel ---------- */
const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "bookings", label: "Bookings", icon: "📋" },
  { id: "content", label: "Content", icon: "✏️" },
  { id: "media", label: "Photos & Media", icon: "🖼" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function Admin() {
  const { isAdmin } = useSite();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!isAdmin) navigate("/admin", { replace: true });
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <section className="bg-cream/50 py-10">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark size={40} />
            <div>
              <h1 className="display text-2xl">Admin Panel</h1>
              <p className="text-xs text-muted">Everything you change here saves automatically.</p>
            </div>
          </div>
          <Link to="/" className="btn-outline !px-5 !py-2.5 text-xs">View Website ↗</Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => setTab(t.id)}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                tab === t.id ? "bg-ink text-bg" : "border border-line bg-surface text-ink-soft hover:border-ink"
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>{t.label}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "overview" && <OverviewTab />}
              {tab === "bookings" && <BookingsTab />}
              {tab === "content" && <ContentTab />}
              {tab === "media" && <MediaTab />}
              {tab === "settings" && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
