import { motion } from "framer-motion";

const NavButton = ({
    onClick,
    children,
    delay = 0,
}: {
    onClick: () => void;
    children: React.ReactNode;
    delay?: number;
}) => (
    <motion.button
        onClick={onClick}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            delay,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
        }}
        whileHover={{
            scale: 1.1,
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2.5 bg-linear-to-b from-[#ff6b9d] to-[#e8467c] rounded-full text-white font-friendly font-medium text-lg shadow-lg shadow-pink-300/50 border-2 border-white/30 hover:shadow-xl hover:shadow-pink-400/50 transition-shadow"
    >
        {children}
    </motion.button>
);

export default NavButton;