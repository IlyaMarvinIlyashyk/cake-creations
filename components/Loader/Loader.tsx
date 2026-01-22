"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdf2f8]"
    >
      {/* Animated cake icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl mb-4"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple cake icon */}
          <motion.path
            d="M12 2C12 2 10 4 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4 12 2 12 2Z"
            fill="#ff6b9d"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.rect
            x="3"
            y="10"
            width="18"
            height="4"
            rx="2"
            fill="#e8467c"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
          <motion.rect
            x="5"
            y="14"
            width="14"
            height="4"
            rx="1"
            fill="#ff6b9d"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
          <motion.rect
            x="4"
            y="18"
            width="16"
            height="4"
            rx="2"
            fill="#e8467c"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        </svg>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-friendly text-lg text-[#e8467c] tracking-wide"
      >
        Preparing something sweet...
      </motion.p>

      {/* Loading dots */}
      <div className="flex gap-1 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#ff6b9d]"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;
