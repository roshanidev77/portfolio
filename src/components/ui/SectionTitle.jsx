import { motion } from "framer-motion";

const SectionTitle = ({ label, title, subtitle, light = false }) => {
  return (
    <div className="text-center mb-16">
      <motion.span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.span>

      <motion.h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light
            ? "text-white"
            : "text-navy-900 dark:text-white"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`text-base md:text-lg max-w-2xl mx-auto ${
            light ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="flex items-center justify-center gap-2 mt-6"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500" />
        <div className="w-2 h-2 rounded-full bg-primary-500" />
        <div className="h-px w-24 bg-gradient-to-r from-primary-500 via-cyan-400 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
      </motion.div>
    </div>
  );
};

export default SectionTitle;
