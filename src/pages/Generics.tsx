import { useEffect } from 'react';
import Prism from 'prismjs';

const Generics = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const genericsExample = `// 基础泛型函数
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let inferredOutput = identity(42); // 类型推断为 number

// 泛型接口
interface GenericResponse<T> {
    data: T;
    status: number;
    message: string;
}

// 使用泛型接口
interface User {
    id: number;
    name: string;
}

const response: GenericResponse<User> = {
    data: { id: 1, name: "张三" },
    status: 200,
    message: "成功"
};

// 泛型类
class GenericBox<T> {
    private content: T;

    constructor(value: T) {
        this.content = value;
    }

    getValue(): T {
        return this.content;
    }
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
    return arg.length;
}

// 正确：字符串有 length 属性
logLength("Hello");
// 正确：数组有 length 属性
logLength([1, 2, 3]);
// 错误：数字没有 length 属性
// logLength(123);

// 泛型工具类型
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// Partial - 使所有属性可选
type PartialTodo = Partial<Todo>;

// Pick - 选择特定属性
type TodoPreview = Pick<Todo, "title" | "completed">;

// Record - 创建键值对类型
type TodoRecord = Record<string, Todo>;`;

    return (
        <div className="space-y-8">
            <h1 className="ts-heading">TypeScript 泛型</h1>

            <div className="space-y-6">
                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">泛型概述</h2>
                    <p className="text-gray-300">
                        泛型是 TypeScript 中最强大的特性之一，它允许我们编写可重用的、类型安全的代码。
                        通过泛型，我们可以创建适用于多种类型的组件，同时保持类型检查的优势。
                    </p>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">代码示例</h2>
                    <div className="ts-code-block">
                        <pre>
                            <code className="language-typescript">{genericsExample}</code>
                        </pre>
                    </div>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">泛型的优势</h2>
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                        <li>代码重用：一次编写，适用于多种类型</li>
                        <li>类型安全：在编译时进行类型检查</li>
                        <li>灵活性：可以适应不同的数据类型和结构</li>
                        <li>可读性：通过类型参数清晰地表达意图</li>
                        <li>维护性：泛型约束帮助限制类型范围</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Generics;
