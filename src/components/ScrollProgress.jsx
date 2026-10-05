import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-gradient-to-r from-primary-500 via-cyan-400 to-blue-500 origin-left"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
