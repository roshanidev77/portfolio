import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = ["home", "about", "education", "experience", "achievements", "gallery", "services", "contact"];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // update active section
      const sections = NAV_LINKS.map((id) => document.getElementById(id));
      const current = sections.find((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-navy-900/90 backdrop-blur-xl shadow-glass border-b border-slate-200/50 dark:border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <MdOutlineHealthAndSafety className="text-white text-xl" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-bold text-navy-900 dark:text-white">
                Roshani Neupane
              </span>
              <span className="block text-[10px] text-primary-600 dark:text-primary-400 tracking-widest uppercase leading-none">
                Health Professional
              </span>
            </div>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-3 py-2 text-sm font-medium capitalize rounded-lg transition-colors duration-200 ${
                  activeSection === id
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary-50 dark:bg-primary-900/30 rounded-lg"
                  />
                )}
                <span className="relative z-10">{t(`nav.${id}`)}</span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle Language"
            >
              <span className={language === "en" ? "opacity-100" : "opacity-50"}>EN</span>
              <span className="text-slate-400">/</span>
              <span className={language === "np" ? "opacity-100" : "opacity-50"}>
                <span className="sm:hidden">ने</span>
                <span className="hidden sm:inline">नेपाली</span>
              </span>
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-16 right-4 left-4 bg-white dark:bg-navy-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((id, i) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium capitalize transition-colors ${
                      activeSection === id
                        ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {t(`nav.${id}`)}
                  </motion.button>
                ))}
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-4 py-2">
                  <button
                    onClick={toggleLanguage}
                    className="text-xs font-semibold text-primary-600 dark:text-primary-400"
                  >
                    {language === "en" ? "Switch to नेपाली" : "Switch to English"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
