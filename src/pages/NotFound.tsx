import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFound = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-6xl font-bold text-ts-blue mb-4">404</h1>
            <p className="text-xl text-gray-300 mb-8">页面未找到</p>
            <Link
                to="/"
                className="ts-button"
            >
                返回首页
            </Link>
        </motion.div>
    );
};
