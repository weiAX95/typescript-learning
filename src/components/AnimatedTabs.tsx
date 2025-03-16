import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Tab {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AnimatedTabsProps {
    tabs: Tab[];
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);
    const { theme } = useTheme();

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        className={`px-4 py-2 rounded-lg ${selectedTab === tab.id
                            ? 'bg-ts-blue text-white'
                            : theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                        onClick={() => setSelectedTab(tab.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tab.title}
                    </motion.button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {tabs.find((tab) => tab.id === selectedTab)?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
