import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
      animate={{ x: pos.x - 150, y: pos.y - 150 }}
      transition={{ type: "spring", stiffness: 80, damping: 25, mass: 0.5 }}
    >
      <div className="w-[300px] h-[300px] rounded-full bg-primary-500/8 blur-[80px]" />
    </motion.div>
  );
};

export default CursorGlow;
