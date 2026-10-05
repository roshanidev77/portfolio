import { motion } from "framer-motion";
import { FiBook, FiAward, FiCheckCircle } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineMedicalServices } from "react-icons/md";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";

const icons = [MdOutlineSchool, MdOutlineMedicalServices];
const colors = [
  "from-blue-400 to-indigo-500",
  "from-primary-500 to-teal-600",
];

const EducationCard = ({ item, index }) => {
  const Icon = icons[index] || FiBook;
  const color = colors[index] || "from-primary-400 to-cyan-500";
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-start gap-6 md:gap-10`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-glow z-10`}>
          <Icon className="text-white text-2xl" />
        </div>
        {index < 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-400 to-transparent mt-2 min-h-[60px]" />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 bg-white dark:bg-navy-800 rounded-2xl p-6 md:p-8 shadow-glass border border-slate-100 dark:border-white/10 group cursor-default mb-8 relative overflow-hidden"
        whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Accent gradient strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />

        {/* Year badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${color} mb-4`}>
          {item.year}
        </span>

        <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {item.degree}
        </h3>
        <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-1">
          {item.institution}
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mb-4 flex items-center gap-1">
          <span>📍</span> {item.location}
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Achievement badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
          <FiAward className="text-primary-500 text-xs" />
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{item.badge}</span>
        </div>

        {/* Decorative corner */}
        <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const { t } = useLanguage();
  const items = t("education.items");

  return (
    <section id="education" className="section-padding bg-white dark:bg-navy-900">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          label={t("education.sectionLabel")}
          title={t("education.sectionTitle")}
          subtitle={t("education.subtitle")}
        />

        {/* Achievement highlight banner */}
        <motion.div
          className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border border-primary-200 dark:border-primary-800 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <FiCheckCircle className="text-white text-xl" />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-bold text-navy-900 dark:text-white text-sm">
              🏆 Loksewa Passed — First Attempt at Age 19!
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Successfully qualified Nepal Public Service Commission in 2081 B.S. — a milestone achieved through years of dedicated study and clinical training.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {Array.isArray(items) && items.map((item, i) => (
            <EducationCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
