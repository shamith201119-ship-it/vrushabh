import { motion } from "framer-motion";
import { useSite } from "../context/SiteContext";

export default function Loader() {
  const { content } = useSite();
  return (
    <motion.div
      className="ink-section fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, y: -60, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* faint kanji watermark */}
      <motion.span
        className="kanji pointer-events-none absolute text-[26rem] leading-none text-onband/[0.05]"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        武
      </motion.span>

      {/* karate student in namaste pose, rising over the red sun */}
      <div className="relative flex h-[300px] w-[300px] items-end justify-center sm:h-[360px] sm:w-[360px]">
        {/* red sun */}
        <motion.div
          className="absolute bottom-6 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-crimson sm:h-[290px] sm:w-[290px]"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* soft glow inside the sun */}
        <motion.div
          className="absolute bottom-6 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full sm:h-[290px] sm:w-[290px]"
          style={{ background: "radial-gradient(circle at 50% 35%, rgba(250,246,239,0.35), transparent 65%)" }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        {/* pulsing halo ring */}
        <motion.div
          className="absolute bottom-6 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full border-2 border-onband/40 sm:h-[290px] sm:w-[290px]"
          animate={{ scale: [1, 1.14, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.8 }}
        />
        {/* the student */}
        <motion.img
          src="/images/loader-karate-cut.png"
          alt="Karate student in namaste pose"
          className="relative z-10 h-[270px] object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)] sm:h-[330px]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.35 },
            y: { repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 1 },
          }}
        />
        {/* floating chips for a little extra life */}
        <motion.span
          className="absolute right-2 top-10 z-20 rounded-full bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-paper shadow-lg"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        >
          Oss!
        </motion.span>
        <motion.span
          className="absolute left-1 top-24 z-20 rounded-full bg-gold px-3 py-1 text-sm shadow-lg"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut", delay: 0.5 }}
        >
          🥋
        </motion.span>
      </div>

      <motion.p
        className="display mt-6 text-2xl tracking-wide text-onband sm:text-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        {content.schoolName}
      </motion.p>

      <motion.p
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-onband-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Strong body. Calm mind. Brave heart.
      </motion.p>

      {/* progress bar */}
      <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-band-line">
        <motion.div
          className="h-full bg-onband"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.3, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
