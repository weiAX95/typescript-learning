import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { routes } from '../routes';

export const Navigation = () => {
    const location = useLocation();
    const { theme } = useTheme();

    return (
        <nav className="flex flex-wrap gap-2">
            {routes.map((route) => (
                <motion.div
                    key={route.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to={route.path}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === route.path
                                ? 'bg-ts-blue text-white'
                                : theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                    >
                        {route.label}
                    </Link>
                </motion.div>
            ))}
        </nav>
    );
};
