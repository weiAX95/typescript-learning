import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { theme, toggleTheme } = useTheme();

    const bgColor = theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50';
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const borderColor = theme === 'dark' ? 'border-gray-800' : 'border-gray-200';

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-200`}>
            <motion.header
                className={`border-b ${borderColor} ${bgColor}/50 backdrop-blur-sm sticky top-0 z-10`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.h1
                            className="text-3xl font-bold bg-gradient-to-r from-ts-blue to-ts-blue-light bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            TypeScript 学习
                        </motion.h1>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${textColor}`}
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {theme === 'dark' ? '🌞' : '🌙'}
                            </motion.button>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Navigation />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.header>
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
            <motion.footer
                className={`border-t ${borderColor} py-4 mt-8`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>使用 TypeScript 构建更可靠的应用</p>
                </div>
            </motion.footer>
        </div>
    );
};

export default Layout;
