import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const LoadingSpinner = () => {
    const { theme } = useTheme();
    return (
        <motion.div
            className="flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={`w-8 h-8 border-4 ${theme === 'dark'
                        ? 'border-ts-blue border-t-transparent'
                        : 'border-ts-blue-dark border-t-transparent'
                    } rounded-full`}
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <span className="ml-3 text-ts-blue">Running...</span>
        </motion.div>
    );
};
