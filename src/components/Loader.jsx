import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated medical cross */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
      >
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500/20"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500/10"
            animate={{ scale: [1, 1.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <motion.path
                d="M25 10 H35 V25 H50 V35 H35 V50 H25 V35 H10 V25 H25 Z"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M25 10 H35 V25 H50 V35 H35 V50 H25 V35 H10 V25 H25 Z"
                fill="#14b8a6"
                opacity="0.15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="font-heading text-3xl text-white mb-1">Roshani</h1>
        <p className="text-primary-400 text-sm tracking-widest uppercase">Health Professional</p>
      </motion.div>

      {/* Heartbeat line */}
      <motion.div
        className="w-64 h-8 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <svg viewBox="0 0 256 32" className="w-full h-full" fill="none">
          <motion.polyline
            points="0,16 40,16 50,4 60,28 70,4 80,28 90,16 256,16"
            stroke="#14b8a6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Loading bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="text-slate-500 text-xs mt-4 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        LOADING PORTFOLIO...
      </motion.p>
    </motion.div>
  );
};

export default Loader;
