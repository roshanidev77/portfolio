import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/portfolioData";

const InfoItem = ({ icon: Icon, title, value, delay }) => (
  <motion.div
    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 hover:bg-white/10 transition-colors group"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-glow group-hover:scale-110 transition-transform">
      <Icon className="text-white" size={18} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium tracking-wider uppercase mb-0.5">{title}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  </motion.div>
);

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const socials = [
    { icon: FiFacebook, href: profile.social.facebook, label: "Facebook" },
    { icon: FiInstagram, href: profile.social.instagram, label: "Instagram" },
    { icon: FiLinkedin, href: profile.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-navy-950 via-navy-900 to-primary-950 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          label={t("contact.sectionLabel")}
          title={t("contact.sectionTitle")}
          subtitle={t("contact.subtitle")}
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand card */}
            <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow">
                  <MdOutlineHealthAndSafety className="text-white text-2xl" />
                </div>
                <div>
                  <p className="font-heading text-xl text-white font-bold">Roshani Neupane</p>
                  <p className="text-primary-400 text-xs">Health Professional · Nepal</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open to professional collaborations, health consultations, and community health initiatives. Reach out and let's work together for better Nepal healthcare.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <InfoItem icon={FiMapPin} title="Current Workplace" value={t("contact.info.workplace")} delay={0.1} />
              <InfoItem icon={FiMapPin} title="Hometown" value={t("contact.info.hometown")} delay={0.2} />
              <InfoItem icon={FiMail} title="Email" value={profile.email} delay={0.3} />
              <InfoItem icon={FiPhone} title="Phone" value={profile.phone} delay={0.4} />
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-900/30 transition-all"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg text-3xl">
                    ✓
                  </div>
                  <p className="text-white font-semibold text-lg">{t("contact.form.success")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["name", "email"].map((field) => (
                      <div key={field} className="relative group">
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={t(`contact.form.${field}`)}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary-500 focus:bg-white/15 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact.form.subject")}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary-500 focus:bg-white/15 transition-all"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message")}
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary-500 focus:bg-white/15 transition-all resize-none"
                  />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-glow-lg transition-all disabled:opacity-70"
                    whileHover={{ scale: sending ? 1 : 1.02 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        {t("contact.form.send")}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
