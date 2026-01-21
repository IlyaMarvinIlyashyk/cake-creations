"use client";

import { motion } from "framer-motion";
import NavButton from "./NavButton";

type NavProps = {
  onHome: () => void;
  onGallery: () => void;
  onContact: () => void;
};

const Nav = ({ onHome, onGallery, onContact }: NavProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-200"
    >
      <NavButton onClick={onHome} delay={0.1}>
        Home
      </NavButton>
      <NavButton onClick={onGallery} delay={0.2}>
        Gallery
      </NavButton>
      <NavButton onClick={onContact} delay={0.3}>
        Contact
      </NavButton>
    </motion.nav>
  );
};

export default Nav;
