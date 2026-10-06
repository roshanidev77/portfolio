import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiStar, FiHeart, FiShield, FiAward } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { stats } from "../data/portfolioData";

const traitIcons = {
  Hardworking: "💪",
  Disciplined: "🎯",
  Compassionate: "❤️",
  "Nation-serving": "🇳🇵",
  Ambitious: "⭐",
  Inspirational: "✨",
  परिश्रमी: "💪",
  अनुशासित: "🎯",
  दयालु: "❤️",
  राष्ट्रसेवी: "🇳🇵",
  महत्वाकांक्षी: "⭐",
  प्रेरणादायी: "✨",
};

const StatCard = ({ value, label, suffix = "", icon: Icon, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value);
    if (isNaN(num)) { setDisplayed(value); return; }
    let start = 0;
    const frames = 90;
    const increment = num / frames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setDisplayed(num); clearInterval(timer); }
      else setDisplayed(Math.ceil(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="relative group bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-glass border border-slate-100 dark:border-white/10 text-center overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${color}`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-white text-xl" />
        </div>
        <div className="text-3xl md:text-4xl font-bold font-heading gradient-text mb-1">
          {displayed}{suffix}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const traits = t("about.traits.items");

  const statCards = [
    { value: stats.yearsOfService, suffix: "+", label: t("about.stats.service"), icon: FiAward, color: "from-primary-400 to-teal-500", delay: 0.1 },
    { value: stats.hospitalsWorked, suffix: "", label: t("about.stats.hospitals"), icon: FiHeart, color: "from-cyan-400 to-blue-500", delay: 0.2 },
    { value: stats.municipalitiesServed, suffix: "", label: t("about.stats.municipal"), icon: FiShield, color: "from-blue-400 to-indigo-500", delay: 0.3 },
    { value: stats.loksweaAge, suffix: "", label: t("about.stats.loksewa"), icon: FiStar, color: "from-amber-400 to-orange-500", delay: 0.4 },
  ];

  return (
    <section id="about" className="section-padding bg-slate-50/60 dark:bg-navy-950">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("about.sectionLabel")}
          title={t("about.sectionTitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: profile card illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 to-cyan-100 dark:from-primary-900/30 dark:to-cyan-900/30 p-8 border border-primary-200/50 dark:border-primary-700/30 shadow-xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 h-6 rounded bg-white/50 dark:bg-white/10 ml-2" />
                </div>

                {/* Profile block */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-white/60 dark:bg-navy-800/60 rounded-2xl">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-2xl font-bold font-heading">R</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 dark:text-white">Roshani Neupane</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">Health Post In-Charge</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-slate-500">Active · Mandandeupur</span>
                    </div>
                  </div>
                </div>

                {/* Mini stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Loksewa", value: "1st Try ✓", color: "text-green-600 dark:text-green-400" },
                    { label: "Age", value: "19 yrs", color: "text-primary-600 dark:text-primary-400" },
                    { label: "Hospitals", value: "7+", color: "text-cyan-600 dark:text-cyan-400" },
                    { label: "Experience", value: "3+ yrs", color: "text-blue-600 dark:text-blue-400" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-white/60 dark:bg-navy-700/50 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className={`font-bold text-sm ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow orbs */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary-300 to-cyan-400 opacity-20 blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-20 blur-2xl"
                animate={{ scale: [1.3, 1, 1.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Nepal flag */}
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white dark:bg-navy-800 shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-800">
                <span className="text-2xl">🇳🇵</span>
              </div>
            </div>
          </motion.div>

          {/* Right: bio text */}
          <div>
            {[t("about.bio1"), t("about.bio2"), t("about.bio3")].map((bio, i) => (
              <motion.p
                key={i}
                className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {bio}
              </motion.p>
            ))}

            {/* Trait pills */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">
                {t("about.traits.title")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(traits) && traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 rounded-full bg-white dark:bg-navy-800 border border-primary-200 dark:border-primary-800 text-sm text-primary-700 dark:text-primary-300 font-medium shadow-sm hover:shadow-glow transition-shadow"
                  >
                    {traitIcons[trait] || "🌿"} {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
