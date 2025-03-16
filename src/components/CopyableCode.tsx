import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface CopyableCodeProps {
    code: string;
    language?: string;
}

export const CopyableCode: React.FC<CopyableCodeProps> = ({
    code,
    language = 'typescript'
}) => {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="relative">
            <pre className={`language-${language} rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                } overflow-x-auto border border-[var(--border)]`}>
                <code>{code}</code>
            </pre>
            <motion.button
                className={`absolute top-2 right-2 px-3 py-1 rounded ${theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } text-sm`}
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={copied ? { backgroundColor: '#059669' } : {}}
            >
                {copied ? 'Copied!' : 'Copy'}
            </motion.button>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: copied ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-2 right-24 px-3 py-1 rounded bg-green-600 text-white text-sm shadow-lg"
            >
                ✓ Copied
            </motion.div>
        </div>
    );
};
