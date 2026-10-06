import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiHeart } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/portfolioData";

const NAV_LINKS = ["home", "about", "education", "experience", "achievements", "gallery", "services", "contact"];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { icon: FiFacebook, href: profile.social.facebook, label: "Facebook" },
    { icon: FiInstagram, href: profile.social.instagram, label: "Instagram" },
    { icon: FiLinkedin, href: profile.social.linkedin, label: "LinkedIn" },
    { icon: FiTwitter, href: profile.social.twitter, label: "Twitter" },
  ];

  return (
    <footer className="bg-navy-950 text-slate-400 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      {/* Glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center">
                <MdOutlineHealthAndSafety className="text-white text-xl" />
              </div>
              <div>
                <div className="font-heading text-xl text-white font-semibold">Roshani Neupane</div>
                <div className="text-xs text-primary-400 tracking-widest">HEALTH PROFESSIONAL</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              {t("footer.quote")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">
              {t("footer.quickLinks")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left text-sm text-slate-500 hover:text-primary-400 transition-colors capitalize"
                >
                  {t(`nav.${id}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">
              {t("footer.connect")}
            </h4>
            <div className="flex gap-3 mb-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-900/30 transition-all"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
            <div className="space-y-1 text-sm text-slate-500">
              <p>{profile.currentWorkplace}</p>
              <p>{profile.hometown}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            © {year} Roshani Neupane. {t("footer.rights")}
          </span>
          <span className="flex items-center gap-1">
            {t("footer.madeWith")} <FiHeart className="text-red-500 mx-1" size={12} /> {t("footer.forNepal")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
