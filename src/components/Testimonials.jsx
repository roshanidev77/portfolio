import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const avatarColors = [
  "from-primary-400 to-teal-500",
  "from-blue-400 to-indigo-500",
  "from-pink-400 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-green-500",
];

const TestimonialCard = ({ item, index }) => {
  const color = avatarColors[index % avatarColors.length];
  const initials = item.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="h-full px-2 py-4">
      <div className="bg-white dark:bg-navy-800 rounded-3xl p-6 md:p-8 shadow-glass border border-slate-100 dark:border-white/10 h-full flex flex-col relative overflow-hidden group">
        {/* Quote decoration */}
        <div className="absolute top-4 right-6 font-heading text-7xl text-primary-100 dark:text-primary-900/40 leading-none select-none pointer-events-none">
          "
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(item.rating || 5)].map((_, i) => (
            <FiStar key={i} className="text-amber-400 fill-amber-400" size={14} />
          ))}
        </div>

        {/* Text */}
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed flex-1 italic mb-6">
          "{item.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg`}>
            {initials}
          </div>
          <div>
            <p className="font-bold text-navy-900 dark:text-white text-sm">{item.name}</p>
            <p className="text-primary-500 dark:text-primary-400 text-xs">{item.role}</p>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const items = t("testimonials.items");

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-primary-900 via-navy-900 to-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-[120px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]"
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          label={t("testimonials.sectionLabel")}
          title={t("testimonials.sectionTitle")}
          subtitle={t("testimonials.subtitle")}
          light
        />

        {Array.isArray(items) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation
              loop
              className="pb-12"
            >
              {items.map((item, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <TestimonialCard item={item} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
