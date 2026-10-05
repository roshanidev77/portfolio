import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCalendar, FiBriefcase, FiChevronDown } from "react-icons/fi";
import { MdOutlineLocalHospital, MdOutlineHealthAndSafety } from "react-icons/md";
import { GiMedicalPack } from "react-icons/gi";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";

const hospitalIcons = {
  "Bhaktapur Hospital": "🏥",
  "Dr. Iwamura Hospital": "🏥",
  "Siddhi Memorial Hospital": "🏥",
  "Patan Mental Hospital": "🧠",
  "Reiyukai Eiko Masunaga Eye Hospital": "👁️",
  "Changunarayan Community Hospital": "🌿",
  "Changunarayan Municipal Hospital": "🏛️",
  "Melamchi Municipality": "🏛️",
  "Mandandeupur Municipality–5": "⭐",
};

const TrainingCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="relative pl-10 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-6 bottom-0 w-px bg-gradient-to-b from-primary-300 to-transparent dark:from-primary-700" />

      {/* Timeline dot */}
      <div className="absolute left-2 top-4 w-4 h-4 rounded-full bg-white dark:bg-navy-900 border-2 border-primary-400 shadow-glow z-10" />

      {/* Card */}
      <motion.div
        className="bg-white dark:bg-navy-800 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-glass cursor-pointer overflow-hidden"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5 flex-shrink-0">
              {hospitalIcons[item.place] || "🏥"}
            </span>
            <div>
              <h4 className="font-bold text-navy-900 dark:text-white text-sm">{item.place}</h4>
              <p className="text-primary-600 dark:text-primary-400 text-xs font-medium">{item.role}</p>
              <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
                <FiCalendar size={10} />
                <span>{item.duration}</span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1"
          >
            <FiChevronDown className="text-slate-400" size={16} />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pb-4 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-white/10">
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const GovCard = ({ item, index }) => {
  return (
    <motion.div
      className="relative bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-100 dark:border-white/10 shadow-glass group overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: "0 25px 60px rgba(0,0,0,0.12)" }}
    >
      {/* Accent top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${item.current ? "bg-gradient-to-r from-primary-500 to-cyan-500" : "bg-gradient-to-r from-blue-400 to-indigo-500"}`} />

      {/* Current badge */}
      {item.current && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">Current</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${item.current ? "bg-gradient-to-br from-primary-500 to-cyan-500" : "bg-gradient-to-br from-blue-400 to-indigo-500"}`}>
          <MdOutlineHealthAndSafety className="text-white text-2xl" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-navy-900 dark:text-white text-base mb-0.5">{item.place}</h3>
          <p className={`text-sm font-semibold mb-2 ${item.current ? "text-primary-600 dark:text-primary-400" : "text-blue-600 dark:text-blue-400"}`}>
            {item.role}
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
            <FiCalendar size={11} />
            <span>{item.duration}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>

      {/* Decorative icon */}
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
        <MdOutlineHealthAndSafety className="w-full h-full text-primary-500" />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const training = t("experience.training");
  const government = t("experience.government");

  return (
    <section id="experience" className="section-padding bg-slate-50/60 dark:bg-navy-950">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("experience.sectionLabel")}
          title={t("experience.sectionTitle")}
          subtitle={t("experience.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Clinical training column */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center shadow-glow">
                <MdOutlineLocalHospital className="text-white text-lg" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white">
                  {t("experience.trainingTitle")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t("experience.trainingSubtitle")}</p>
              </div>
            </motion.div>

            <div className="relative">
              {Array.isArray(training) && training.map((item, i) => (
                <TrainingCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Government service column */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-glow-blue">
                <GiMedicalPack className="text-white text-lg" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white">
                  {t("experience.govTitle")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t("experience.govSubtitle")}</p>
              </div>
            </motion.div>

            <div className="space-y-5">
              {Array.isArray(government) && government.map((item, i) => (
                <GovCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* Info card */}
            <motion.div
              className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border border-primary-200/50 dark:border-primary-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="font-bold text-navy-900 dark:text-white text-sm">
                    Total Government Service: 26+ months
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    Spanning Melamchi & Mandandeupur Municipality, Kavrepalanchok
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
