"use client";

import { motion, AnimatePresence } from "framer-motion";
import NavButton from "./NavButton";

type NavProps = {
  onHome: () => void;
  onGallery: () => void;
  onContact: () => void;
  isVisible?: boolean;
};

const Nav = ({ onHome, onGallery, onContact, isVisible = true }: NavProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.3, // Synced with cake entrance - starts slightly after cake begins animating
          }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-200"
        >
          <NavButton onClick={onHome} delay={0.5}>
            Home
          </NavButton>
          <NavButton onClick={onGallery} delay={0.6}>
            Gallery
          </NavButton>
          <NavButton onClick={onContact} delay={0.7}>
            Contact
          </NavButton>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Nav;
