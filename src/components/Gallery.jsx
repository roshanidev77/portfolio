import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZoomIn } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { galleryItems } from "../data/portfolioData";

const GalleryCard = ({ item, onClick }) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-glass"
    whileHover={{ scale: 1.03, zIndex: 10 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(item)}
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    {/* Placeholder image with gradient */}
    <div className={`w-full aspect-square bg-gradient-to-br ${item.color} flex flex-col items-center justify-center gap-3 relative`}>
      <span className="text-5xl">{item.icon}</span>
      <span className="text-white/80 text-xs font-medium tracking-wider text-center px-4">{item.label}</span>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <motion.div
          className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          initial={false}
        >
          <FiZoomIn className="text-white" size={18} />
        </motion.div>
      </div>
    </div>

    {/* Category badge */}
    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs">
      {item.category}
    </div>
  </motion.div>
);

const Lightbox = ({ item, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="relative max-w-2xl w-full"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`w-full aspect-square md:aspect-video bg-gradient-to-br ${item.color} rounded-3xl flex flex-col items-center justify-center gap-4`}>
        <span className="text-8xl">{item.icon}</span>
        <p className="text-white text-xl font-semibold">{item.label}</p>
        <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">{item.category}</span>
      </div>
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <FiX size={18} />
      </button>
    </motion.div>
  </motion.div>
);

const Gallery = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = t("gallery.categories");
  const catLabels = Array.isArray(categories)
    ? categories
    : ["All", "Clinical", "Community", "Professional", "Municipality"];

  // Map translated category to English for filtering
  const catMap = { All: "All", "सबै": "All", नैदानिक: "Clinical", सामुदायिक: "Community", व्यावसायिक: "Professional", नगरपालिका: "Municipality" };

  const filtered = activeCategory === "All" || activeCategory === "सबै"
    ? galleryItems
    : galleryItems.filter((i) => i.category === (catMap[activeCategory] || activeCategory));

  return (
    <>
      <section id="gallery" className="section-padding bg-slate-50/60 dark:bg-navy-950">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            label={t("gallery.sectionLabel")}
            title={t("gallery.sectionTitle")}
            subtitle={t("gallery.subtitle")}
          />

          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {catLabels.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-glow"
                    : "bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-primary-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onClick={setLightboxItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
