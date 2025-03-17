import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
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
        const highlightCode = () => {
            if (editorRef.current && preRef.current) {
                try {
                    const code = editorRef.current.value;
                    const highlightedCode = Prism.highlight(
                        code,
                        Prism.languages.typescript,
                        'typescript'
                    );
                    preRef.current.innerHTML = `<code class="language-${language}">${highlightedCode}</code>`;
                } catch (error) {
                    console.error('Highlighting error:', error);
                }
            }
        };

        highlightCode();
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
            console.error('Format error:', error);
            setOutput(`格式化错误: ${error instanceof Error ? error.message : '未知错误'}`);
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
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm dark:bg-gray-900/50">
                    <LoadingSpinner />
                </div>
            )}
            <div className="space-y-4">
                <div className={`relative h-48 overflow-hidden rounded-lg border border-[var(--border)] code-editor ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50'
                    }`}>
                    <div className="relative h-full">
                        <textarea
                            ref={editorRef}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onScroll={handleScroll}
                            className={`absolute inset-0 w-full h-full p-4 resize-none focus:outline-none code-editor caret-current text-transparent`}
                            spellCheck="false"
                            disabled={isLoading}
                        />
                        <pre
                            ref={preRef}
                            className="absolute inset-0 p-4 m-0 whitespace-pre pointer-events-none code-editor"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex-1 ts-button"
                        onClick={handleFormat}
                        disabled={isLoading}
                    >
                        {isFormatting ? '格式化中...' : '格式化代码'}
                    </button>
                    {onRun && (
                        <button
                            className="flex-1 ts-button"
                            onClick={handleRun}
                            disabled={isLoading}
                        >
                            {isRunning ? '运行中...' : '运行代码'}
                        </button>
                    )}
                </div>
            </div>
            {output && (
                <div className={`mt-4 p-4 rounded-lg code-editor ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50'} border border-[var(--border)]`}>
                    <div className="mb-2 text-sm font-medium text-gray-400">输出:</div>
                    <pre className={`font-mono text-sm break-all whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                        }`}>{output}</pre>
                </div>
            )}
        </div>
    );
};
