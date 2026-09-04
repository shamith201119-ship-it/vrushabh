import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { BackgroundBeams, BorderBeam, GridPattern, Meteors, Sparkles } from "../components/fx";

export default function AdminLogin() {
  const { login, isAdmin } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) navigate("/admin/panel", { replace: true });
  }, [isAdmin, navigate]);

  const submit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin/panel");
    } else {
      setError("Wrong username or password. Please try again.");
    }
  };

  return (
    <section className="ink-section relative flex min-h-[85vh] items-center justify-center overflow-hidden px-5">
      <BackgroundBeams id="admin" />
      <Meteors count={6} />
      <Sparkles count={14} />
      <GridPattern id="admin" />
      <span className="kanji pointer-events-none absolute bottom-0 right-4 select-none text-[12rem] leading-none text-onband/[0.05]">守</span>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-3xl border border-band-line bg-band-soft p-10 backdrop-blur-md"
      >
        <BorderBeam variant="gold" />
        <motion.div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson text-2xl"
          whileHover={{ rotate: [0, -8, 8, 0] }}
        >
          🥋
        </motion.div>
        <h1 className="display mt-6 text-center text-2xl text-onband">Admin Login</h1>
        <p className="mt-2 text-center text-xs text-onband-faint">Only for the school owner.</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="field-label !text-onband-soft">Username</label>
            <input
              className="field !border-band-line !bg-band-soft !text-onband placeholder:!text-onband-faint"
              placeholder="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
            />
          </div>
          <div>
            <label className="field-label !text-onband-soft">Password</label>
            <input
              type="password"
              className="field !border-band-line !bg-band-soft !text-onband placeholder:!text-onband-faint"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </div>
          {error && (
            <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-crimson">
              {error}
            </motion.p>
          )}
          <motion.button type="submit" className="btn-primary w-full" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            Enter Admin Panel →
          </motion.button>
        </div>

        <Link to="/" className="mt-6 block text-center text-xs text-onband-faint hover:text-onband">← Back to website</Link>
      </motion.form>
    </section>
  );
}
