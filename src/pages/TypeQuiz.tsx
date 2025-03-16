import { useState } from 'react';
import { AnimatedTabs } from '../components/AnimatedTabs';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const questions = [
    {
        id: 1,
        question: '以下哪个是 TypeScript 中的基础类型？',
        options: ['interface', 'any', 'Promise', 'Array'],
        answer: 1,
        explanation: 'any 是 TypeScript 的基础类型之一，它允许赋值为任意类型。interface 是接口，Promise 和 Array 是复杂类型。'
    },
    {
        id: 2,
        question: '在 TypeScript 中，接口和类型别名的区别是什么？',
        options: [
            '没有区别，它们完全相同',
            '接口只能描述对象类型，而类型别名可以描述所有类型',
            '类型别名不能被继承，接口可以',
            '接口不能用于描述函数类型'
        ],
        answer: 1,
        explanation: '类型别名可以为任何类型创建名称，包括基本类型、联合类型、元组等。而接口主要用于描述对象的结构。'
    },
    {
        id: 3,
        question: '下面哪个泛型约束是正确的语法？',
        options: [
            'T implements Interface',
            'T extends Interface',
            'T instanceof Interface',
            'T includes Interface'
        ],
        answer: 1,
        explanation: '在 TypeScript 中，使用 extends 关键字来约束泛型类型。例如：<T extends Interface>'
    },
    {
        id: 4,
        question: '以下哪个装饰器不是 TypeScript 支持的？',
        options: [
            '类装饰器',
            '方法装饰器',
            '构造函数装饰器',
            '属性装饰器'
        ],
        answer: 2,
        explanation: 'TypeScript 支持类装饰器、方法装饰器、访问器装饰器、属性装饰器和参数装饰器，但没有专门的构造函数装饰器。'
    },
    {
        id: 5,
        question: '关于映射类型，下面哪个说法是正确的？',
        options: [
            '映射类型只能用于接口',
            '映射类型可以创建新的属性名',
            '映射类型不能修改属性的类型',
            '映射类型必须使用 keyof'
        ],
        answer: 1,
        explanation: '映射类型可以基于一个类型的属性创建新的属性名，例如可以通过 Capitalize 等工具类型转换属性名。'
    }
];

const TypeQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const { theme } = useTheme();

    const handleAnswer = (answerIndex: number) => {
        setUserAnswers([...userAnswers, answerIndex]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleReset = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowResults(false);
    };

    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            return score + (answer === questions[index].answer ? 1 : 0);
        }, 0);
    };

    if (showResults) {
        const score = calculateScore();
        return (
            <div className="space-y-8">
                <h1 className="ts-heading">测验结果</h1>
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h2 className="text-2xl font-bold mb-4">
                        得分: {score} / {questions.length}
                    </h2>
                    <div className="space-y-4">
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className={`p-4 rounded-lg ${userAnswers[index] === q.answer
                                        ? 'bg-green-100 dark:bg-green-900'
                                        : 'bg-red-100 dark:bg-red-900'
                                    }`}
                            >
                                <p className="font-medium mb-2">{q.question}</p>
                                <p className="text-sm">
                                    你的答案: {q.options[userAnswers[index]]}
                                </p>
                                <p className="text-sm">
                                    正确答案: {q.options[q.answer]}
                                </p>
                                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                                    {q.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                    <motion.button
                        className="ts-button mt-6"
                        onClick={handleReset}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        重新开始
                    </motion.button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="space-y-8">
            <h1 className="ts-heading">TypeScript 测验</h1>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">问题 {currentQuestion + 1}</h2>
                        <span className="text-sm text-gray-500">
                            {currentQuestion + 1} / {questions.length}
                        </span>
                    </div>
                    <p className="text-lg mb-6">{question.question}</p>
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <motion.button
                                key={index}
                                className={`w-full p-3 text-left rounded-lg transition-colors ${theme === 'dark'
                                        ? 'hover:bg-gray-700 border border-gray-700'
                                        : 'hover:bg-gray-100 border border-gray-200'
                                    }`}
                                onClick={() => handleAnswer(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                        className="h-2 bg-ts-blue rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TypeQuiz;
