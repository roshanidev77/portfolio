import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiMapPin } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GiHeartBeats, GiMedicalPack } from "react-icons/gi";
import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/portfolioData";
import roshaniPortrait from "../assets/roshani.png";

/* Typing hook */
const useTyping = (texts, speed = 80, pause = 1800) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [display, deleting, idx, texts, speed, pause]);
  return display;
};

/* Floating particle */
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-primary-400/20 dark:bg-primary-400/15"
    style={style}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

const particles = Array.from({ length: 18 }, (_, i) => ({
  width: `${Math.random() * 60 + 10}px`,
  height: `${Math.random() * 60 + 10}px`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 6 + 4,
}));

/* Heartbeat SVG wave */
const HeartbeatWave = () => (
  <svg viewBox="0 0 400 60" className="w-full max-w-sm opacity-40" fill="none">
    <motion.polyline
      points="0,30 60,30 80,10 100,50 120,10 140,50 160,30 400,30"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-primary-400"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
    />
  </svg>
);

const Hero = () => {
  const { t } = useLanguage();
  const typingTexts = t("hero.typing");
  const typed = useTyping(Array.isArray(typingTexts) ? typingTexts : ["Health Professional"]);

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary-400/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[120px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => <Particle key={i} style={p} />)}
      </div>

      {/* Floating medical icons */}
      <motion.div
        className="absolute top-20 right-[8%] text-primary-300/40 dark:text-primary-600/30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <MdOutlineHealthAndSafety size={64} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[6%] text-cyan-300/40 dark:text-cyan-600/30"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      >
        <GiMedicalPack size={56} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-[10%] text-teal-300/30 dark:text-teal-600/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <GiHeartBeats size={48} />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-32 md:py-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 text-xs font-semibold tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Government Health Officer · Nepal
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-slate-500 dark:text-slate-400 text-lg mb-2 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("hero.greeting")}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-navy-900 dark:text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-primary-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {profile.nameNp}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            className="font-heading text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-4 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            "{t("hero.tagline")}"
          </motion.h2>

          {/* Typing effect */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-2 mb-4 h-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-slate-400 dark:text-slate-500 text-sm">I am a</span>
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg min-w-[220px]">
              {typed}
              <motion.span
                className="inline-block w-0.5 h-5 bg-primary-500 ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FiMapPin size={14} className="text-primary-500 flex-shrink-0" />
            <span>{t("hero.location")}</span>
          </motion.div>

          {/* Heartbeat wave */}
          <motion.div
            className="flex justify-center lg:justify-start mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <HeartbeatWave />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={scrollToAbout}
              className="btn-primary text-sm px-8 py-3.5 flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20,184,166,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.cta1")}
              <FiArrowDown size={16} className="animate-bounce-subtle" />
            </motion.button>
            <motion.button
              onClick={scrollToContact}
              className="btn-outline text-sm px-8 py-3.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.cta2")}
            </motion.button>
          </motion.div>
        </div>

        {/* Profile image / illustration */}
        <motion.div
          className="flex-shrink-0 order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] lg:w-[32rem] lg:h-[32rem]">
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary-300/40 dark:border-primary-700/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-cyan-300/30 dark:border-cyan-700/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Glow ring */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary-400/20 to-cyan-400/20 blur-xl" />

            {/* Image container */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-100 to-cyan-100 dark:from-primary-900/50 dark:to-cyan-900/50 border-4 border-white dark:border-navy-800 shadow-2xl overflow-hidden flex items-end justify-center">
              <img
                src={roshaniPortrait}
                alt="Roshani"
                className="h-full w-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-2 -right-2 px-3 py-1.5 rounded-full bg-white dark:bg-navy-800 border border-primary-200 dark:border-primary-800 shadow-lg text-xs font-semibold text-primary-700 dark:text-primary-300 flex items-center gap-1"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Loksewa ✓
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full bg-white dark:bg-navy-800 border border-cyan-200 dark:border-cyan-800 shadow-lg text-xs font-semibold text-cyan-700 dark:text-cyan-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              Age 19 · First Attempt
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600 hover:text-primary-500 transition-colors group"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="text-xs tracking-widest uppercase">{t("hero.scrollDown")}</span>
        <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-current"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;
