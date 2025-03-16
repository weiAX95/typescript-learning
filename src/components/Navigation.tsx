import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
    { path: '/', label: '基础类型' },
    { path: '/quiz', label: '类型测验' }
];

export const Navigation = () => {
    const location = useLocation();
    const { theme } = useTheme();

    return (
        <nav className="mb-8">
            <ul className="flex space-x-4">
                {navItems.map((item) => (
                    <motion.li key={item.path}>
                        <Link
                            to={item.path}
                            className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-ts-blue text-white'
                                : theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            {item.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
};
