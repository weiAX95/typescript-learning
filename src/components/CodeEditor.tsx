import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';
import prettier from 'prettier/standalone';
import parserTypeScript from 'prettier/parser-typescript';

interface CodeEditorProps {
    value: string;
    onChange: (code: string) => void;
    language?: string;
    onRun?: (code: string) => Promise<string>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    language = 'typescript',
    onRun
}) => {
    const { theme } = useTheme();
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isFormatting, setIsFormatting] = useState(false);
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            const highlight = () => {
                const code = editorRef.current?.value || '';
                const grammar = Prism.languages[language];
                const highlightedCode = Prism.highlight(code, grammar, language);
                const preElement = preRef.current;
                if (preElement) {
                    preElement.innerHTML = highlightedCode;
                }
            };

            highlight();
        }
    }, [value, language]);

    const handleFormat = async () => {
        setIsFormatting(true);
        try {
            const formatted = await prettier.format(value, {
                parser: 'typescript',
                plugins: [parserTypeScript],
                semi: true,
                singleQuote: true,
                tabWidth: 2,
                printWidth: 80,
                trailingComma: 'es5',
                bracketSpacing: true,
                arrowParens: 'always',
                endOfLine: 'lf'
            });
            onChange(formatted);
            setOutput('代码格式化成功！');
        } catch (error) {
            setOutput(`格式化错误: ${error instanceof Error ? error.message : '未知错误'}`);
            console.error('Format error:', error);
        } finally {
            setIsFormatting(false);
        }
    };

    const handleRun = async (): Promise<void> => {
        if (!onRun) return;

        setIsRunning(true);
        try {
            const result = await onRun(value);
            setOutput(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setOutput(`运行错误: ${error.message}`);
            } else {
                setOutput('发生未知错误');
            }
        } finally {
            setIsRunning(false);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        if (preRef.current) {
            preRef.current.scrollTop = e.currentTarget.scrollTop;
            preRef.current.scrollLeft = e.currentTarget.scrollLeft;
        }
    };

    const isLoading = isRunning || isFormatting;

    return (
        <motion.div
            className={`rounded-lg overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } relative border border-[var(--border)]`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {isLoading && (
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'
                    } backdrop-blur-sm z-10 flex items-center justify-center`}>
                    <LoadingSpinner />
                </div>
            )}
            <div className="p-4 space-y-4">
                <div className="relative rounded-lg border border-[var(--border)]">
                    <div className="absolute inset-0 overflow-hidden">
                        <pre
                            ref={preRef}
                            className={`w-full h-full p-4 m-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                                } code-editor pointer-events-none whitespace-pre overflow-auto`}
                            aria-hidden="true"
                        >
                            <code className={`language-${language} ${theme === 'dark' ? 'dark' : 'light'}`} />
                        </pre>
                    </div>
                    <textarea
                        ref={editorRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={handleScroll}
                        className={`w-full h-48 p-4 code-editor ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                            } resize-none focus:outline-none focus:ring-2 focus:ring-ts-blue relative z-[1] overflow-auto`}
                        style={{
                            background: 'transparent',
                            color: 'transparent',
                            caretColor: theme === 'dark' ? '#fff' : '#000'
                        }}
                        spellCheck="false"
                        disabled={isLoading}
                    />
                </div>
                <div className="flex space-x-4">
                    <motion.button
                        className="ts-button flex-1"
                        onClick={handleFormat}
                        disabled={isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isFormatting ? '格式化中...' : '格式化代码'}
                    </motion.button>
                    {onRun && (
                        <motion.button
                            className="ts-button flex-1"
                            onClick={handleRun}
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isRunning ? '运行中...' : '运行代码'}
                        </motion.button>
                    )}
                </div>
            </div>
            {output && (
                <motion.div
                    className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        } border-t border-[var(--border)]`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        } mb-2`}>输出:</h3>
                    <pre className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        } font-mono whitespace-pre-wrap break-all`}>{output}</pre>
                </motion.div>
            )}
        </motion.div>
    );
};
