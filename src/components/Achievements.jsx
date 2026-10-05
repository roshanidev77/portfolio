import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiStar, FiUsers, FiHeart } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { stats } from "../data/portfolioData";

const AchievIcon = [FiStar, FiAward, FiHeart, FiUsers];

const AchievCard = ({ item, index }) => {
  const Icon = AchievIcon[index % AchievIcon.length];
  const colors = [
    "from-amber-400 to-orange-500",
    "from-primary-500 to-teal-600",
    "from-pink-400 to-rose-500",
    "from-blue-500 to-indigo-600",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="group relative bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-100 dark:border-white/10 shadow-glass overflow-hidden card-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Year tag */}
      <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${color}`}>
        {item.year}
      </span>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-white text-2xl" />
      </div>

      <h3 className="font-heading text-lg font-bold text-navy-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>

      {/* Decorative corner gradient */}
      <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-tl-full bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
    </motion.div>
  );
};

const AnimCounter = ({ target, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(String(target).replace(/\D/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    let start = 0;
    const frames = duration * 60;
    const inc = num / frames;
    const timer = setInterval(() => {
      start += inc;
      if (start >= num) { setVal(num); clearInterval(timer); }
      else setVal(Math.ceil(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold gradient-text">
      {val}{suffix}
    </span>
  );
};

const CounterItem = ({ value, suffix, label, delay }) => (
  <motion.div
    className="text-center p-6"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <AnimCounter target={value} suffix={suffix} />
    <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 font-medium">{label}</p>
  </motion.div>
);

const Achievements = () => {
  const { t } = useLanguage();
  const items = t("achievements.items");

  const counters = [
    { value: stats.hospitalsWorked, suffix: "+", label: t("achievements.counters.hospitals"), delay: 0.1 },
    { value: stats.govMonths, suffix: "+", label: t("achievements.counters.months"), delay: 0.2 },
    { value: 1000, suffix: "+", label: t("achievements.counters.patients"), delay: 0.3 },
    { value: stats.loksweaAge, suffix: "", label: t("achievements.counters.age"), delay: 0.4 },
  ];

  return (
    <section id="achievements" className="section-padding bg-white dark:bg-navy-900">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("achievements.sectionLabel")}
          title={t("achievements.sectionTitle")}
          subtitle={t("achievements.subtitle")}
        />

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {Array.isArray(items) && items.map((item, i) => (
            <AchievCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Animated counters strip */}
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-primary-600 via-teal-600 to-cyan-600 p-px shadow-glow-lg mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl bg-navy-900/90 dark:bg-navy-950/90 backdrop-blur-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {counters.map((c) => (
                <CounterItem key={c.label} {...c} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Inspirational quote */}
        <motion.div
          className="relative text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative large quote mark */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-heading text-9xl text-primary-200 dark:text-primary-900/50 leading-none select-none pointer-events-none">
            "
          </div>

          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border border-primary-200/50 dark:border-primary-800/30">
            <p className="font-heading text-lg md:text-xl text-navy-900 dark:text-white leading-relaxed italic mb-6">
              {t("achievements.quote")}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary-400" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-amber-400 fill-amber-400" size={14} />
                ))}
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-primary-400 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
