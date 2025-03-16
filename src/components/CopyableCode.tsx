import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

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
    const preRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (preRef.current) {
            const highlightedCode = Prism.highlight(
                code.trim(),
                Prism.languages.typescript,
                'typescript'
            );
            preRef.current.innerHTML = `<code class="language-${language}">${highlightedCode}</code>`;
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="relative">
            <pre
                ref={preRef}
                className={`code-editor rounded-lg p-4 overflow-x-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                    } border border-[var(--border)]`}
            />
            <div className="absolute top-2 right-2 flex items-center gap-2">
                {copied && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="px-2 py-1 rounded bg-green-600 text-white text-sm shadow-lg"
                    >
                        ✓ 已复制
                    </motion.div>
                )}
                <motion.button
                    className={`px-2 py-1 rounded text-sm font-medium ${theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {copied ? '已复制' : '复制'}
                </motion.button>
            </div>
        </div>
    );
};
