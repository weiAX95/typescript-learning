import { motion } from 'framer-motion';
import { CodeEditor } from '../components/CodeEditor';
import { AnimatedTabs } from '../components/AnimatedTabs';
import { CopyableCode } from '../components/CopyableCode';

const BasicTypes = () => {
    const examples = [
        {
            title: "基本类型",
            description: "尝试使用 TypeScript 的基本类型",
            code: `// 尝试修改这些值
const name: string = "TypeScript";
const age: number = 25;
const isActive: boolean = true;

console.log(\`Name: \${name}, Age: \${age}, Active: \${isActive}\`);`
        },
        {
            title: "数组和元组",
            description: "数组和元组类型的示例",
            code: `// 数组示例
const numbers: number[] = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// 元组示例
const user: [string, number] = ["Alice", 25];
const [username, userAge] = user;

console.log(\`Doubled numbers: \${doubled}\`);
console.log(\`User: \${username} is \${userAge} years old\`);`
        },
        {
            title: "联合类型和类型守卫",
            description: "使用联合类型和类型守卫进行类型检查",
            code: `// 联合类型
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}

processValue("hello");
processValue(42.123);`
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="space-y-8 pb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <h1 className="ts-heading">TypeScript 基础类型</h1>
                <p className="text-gray-400 mb-8">
                    通过这些交互式示例学习 TypeScript 的基础类型。可以直接编辑代码并运行查看结果！
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <AnimatedTabs
                    tabs={[
                        {
                            id: 'playground',
                            title: '交互练习',
                            content: (
                                <div className="space-y-8">
                                    {examples.map((example, index) => (
                                        <div
                                            key={index}
                                            className="ts-card space-y-4"
                                        >
                                            <h2 className="text-2xl font-bold text-ts-blue">{example.title}</h2>
                                            <p className="text-gray-400">{example.description}</p>
                                            <CodeEditor
                                                value={example.code}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        },
                        {
                            id: 'reference',
                            title: '参考手册',
                            content: (
                                <div className="ts-card space-y极6">
                                    <section>
                                        <h3 className="text-xl font-bold text-ts-blue mb-4">基本类型速查表</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <CopyableCode
                                                code={`// 基本类型
const str: string = "Hello";
const num: number = 42;
const bool: boolean = true;
const n: null = null;
const u: undefined = undefined;
const sym: symbol = Symbol();
const big: big极int = 42n;`}
                                            />
                                            <CopyableCode
                                                code={`// 数组类型
const arr1: number[] = [1, 2, 3];
const arr2: Array<string> = ["a", "b"];
const tuple: [string, number] = ["age", 25];`}
                                            />
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="text-xl font-bold text-ts-blue mb-4">类型断言和守卫</h3>
                                        <CopyableCode
                                            code={`// 类型断言
const value: any = "Hello TypeScript";
const length: number = (value as string).length;
const length2: number = (<string>value).length;

// 类型守卫
function isString(value: unknown): value is string {
    return typeof value === "string";
}

if (isString(value)) {
    console.log(value.toUpperCase());
}`}
                                        />
                                    </section>
                                </div>
                            )
                        }
                    ]}
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
                <div className="ts-card">
                    <h2 className="text-2xl font-bold text-ts-blue mb-4">学习要点</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>TypeScript 提供了丰富的类型系统，帮助你写出更可靠的代码</li>
                        <li>基本类型包括 string、number、boolean、null、undefined 等</li>
                        <li>数组类型可以使用 Type[] 语法
                        </li>
                        <li>元组是固定长度的数组，每个位置都有特定的类型</li>
                        <li>联合类型允许一个值是多种类型之一</li>
                        <li>类型守卫帮助你在运行时安全地处理不同类型</li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BasicTypes;
