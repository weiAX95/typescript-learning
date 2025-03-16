import { motion } from 'framer-motion';
import { useState } from 'react';

interface Question {
    id: number;
    text: string;
    code: string;
    options: string[];
    correctAnswer: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "以下代码的类型推断结果是什么?",
        code: `const value = 42 + "1";`,
        options: ["number", "string", "any", "never"],
        correctAnswer: "string"
    },
    {
        id: 2,
        text: "这个类型定义是否正确?",
        code: `type User = {
    name: string;
    age?: number;
    readonly id: string;
};`,
        options: ["正确", "错误 - age 不能为可选", "错误 - readonly 不存在", "错误 - 缺少分号"],
        correctAnswer: "正确"
    },
    {
        id: 3,
        text: "联合类型中的类型守卫是否必需?",
        code: `function process(value: string | number) {
    console.log(value.toUpperCase());
}`,
        options: [
            "是的，必需使用类型守卫",
            "不需要，TypeScript 会自动处理",
            "只在严格模式下需要",
            "只在使用 any 时需要"
        ],
        correctAnswer: "是的，必需使用类型守卫"
    },
    {
        id: 4,
        text: "以下代码的输出是什么?",
        code: `const arr = [1, 2, 3];
const result = arr.map(n => n * 2);
console.log(result);`,
        options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "[2, 3, 4]"],
        correctAnswer: "[2, 4, 6]"
    },
    {
        id: 5,
        text: "以下代码的类型推断结果是什么?",
        code: `const value = "TypeScript" as unknown;
if (typeof value === "string") {
    console.log(value.toUpperCase());
}`,
        options: ["string", "unknown", "any", "never"],
        correctAnswer: "string"
    }
];

export const TypeQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const handleAnswer = (answer: string) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = answer;
        setSelectedAnswers(newSelectedAnswers);

        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 500);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswers([]);
    };

    const question = questions[currentQuestion];

    const QuestionCard = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-ts-blue">
                    问题 {currentQuestion + 1} / {questions.length}
                </h2>
                <span className="text-gray-400">得分: {score}</span>
            </div>

            <motion.div
                key={question.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="ts-card space-y-4"
            >
                <h3 className="text-lg text-gray-200">{question.text}</h3>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-gray-300">{question.code}</code>
                </pre>
                <div className="grid grid-cols-1 gap-3 mt-4">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            className={`p-3 rounded-lg text-left ${selectedAnswers[currentQuestion] === option
                                ? option === question.correctAnswer
                                    ? 'bg-green-500/20 text-green-300'
                                    : 'bg-red-500/20 text-red-300'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedAnswers[currentQuestion]}
                            whileHover={!selectedAnswers[currentQuestion] ? { scale: 1.02 } : {}}
                            whileTap={!selectedAnswers[currentQuestion] ? { scale: 0.98 } : {}}
                        >
                            {option}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );

    const ResultCard = () => (
        <motion.div
            className="ts-card text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <h2 className="text-2xl font-bold text-ts-blue mb-4">
                测验完成!
            </h2>
            <p className="text-xl text-gray-300 mb-6">
                您的得分: {score} / {questions.length}
            </p>
            <motion.button
                className="ts-button"
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                重新开始
            </motion.button>
        </motion.div>
    );

    return (
        <motion.div
            className="max-w-2xl mx-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {showResult ? <ResultCard /> : <QuestionCard />}
        </motion.div>
    );
};

export default TypeQuiz;
