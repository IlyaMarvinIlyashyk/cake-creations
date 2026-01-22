import { AnimatePresence, motion } from "framer-motion";
import { NavSection } from "../Nav/models/nav.models";

interface HeroOverlayProps {
  section: NavSection;
  isAnimating?: boolean;
}

export const HeroOverlay = ({
  section,
  isAnimating = true,
}: HeroOverlayProps) => {
  // Only show the hero when on home section AND animation has started
  const shouldShow = section === "home" && isAnimating;

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className="fixed inset-0 z-10 pointer-events-none flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2, // Synced with cake entrance animation
            }}
            className="w-full max-w-layout mx-auto px-25 2xl:px-10"
          >
            <motion.h1
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#e8467c] text-candy-shadow"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.4, // Staggered after container
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              Elena&apos;s
            </motion.h1>
            <motion.p
              className="font-friendly text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#ff6b9d] tracking-wide mt-2 md:mt-4 text-candy-shadow-sm"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.55, // Staggered after h1
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              Cake Creations
            </motion.p>
            <motion.span
              className="font-friendly text-base sm:text-lg md:text-xl text-[#c4b5fd] mt-4 block tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.75, // Staggered after subtitle
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              Sweet moments, made with love
            </motion.span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
