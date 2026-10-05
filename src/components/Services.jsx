import { motion } from "framer-motion";
import {
  MdOutlineHealthAndSafety,
  MdOutlineCampaign,
  MdOutlineVaccines,
  MdOutlinePeopleAlt,
  MdOutlineChildCare,
  MdOutlineLocalHospital,
} from "react-icons/md";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";

const serviceIcons = [
  MdOutlineLocalHospital,
  MdOutlineCampaign,
  MdOutlineHealthAndSafety,
  MdOutlinePeopleAlt,
  MdOutlineChildCare,
  MdOutlineVaccines,
];

const serviceColors = [
  "from-primary-400 to-teal-500",
  "from-cyan-400 to-blue-500",
  "from-blue-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-pink-400 to-rose-500",
  "from-amber-400 to-orange-500",
];

const ServiceCard = ({ item, index }) => {
  const Icon = serviceIcons[index % serviceIcons.length];
  const color = serviceColors[index % serviceColors.length];

  return (
    <motion.div
      className="group relative bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-100 dark:border-white/10 shadow-glass overflow-hidden card-hover text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      {/* Hover background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Icon */}
      <motion.div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="text-white text-3xl" />
      </motion.div>

      <h3 className="font-heading text-base font-bold text-navy-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </motion.div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const items = t("services.items");

  return (
    <section id="services" className="section-padding bg-white dark:bg-navy-900">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("services.sectionLabel")}
          title={t("services.sectionTitle")}
          subtitle={t("services.subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom impact statement */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 py-6 px-8 rounded-3xl bg-gradient-to-r from-primary-50 via-cyan-50 to-blue-50 dark:from-primary-900/20 dark:via-cyan-900/10 dark:to-blue-900/20 border border-primary-200/50 dark:border-primary-800/30">
            {[
              { emoji: "🏥", text: "7+ Hospitals" },
              { emoji: "🌿", text: "Rural Healthcare" },
              { emoji: "👨‍👩‍👧", text: "Community Service" },
              { emoji: "💊", text: "Quality Care" },
              { emoji: "🇳🇵", text: "Serving Nepal" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium">
                <span className="text-xl">{item.emoji}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
