import { useEffect } from 'react';
import Prism from 'prismjs';

const Interfaces = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const interfacesExample = `// 基本接口定义
interface User {
    id: number;
    name: string;
    age: number;
    email?: string;          // 可选属性
    readonly createdAt: Date; // 只读属性
}

// 接口继承
interface Employee extends User {
    salary: number;
    department: string;
}

// 函数类型接口
interface MathOperation {
    (x: number, y: number): number;
}

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

// 索引类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];

// 类实现接口
interface Animal {
    name: string;
    makeSound(): void;
}

class Dog implements Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    makeSound() {
        console.log("Woof!");
    }
}`;

    return (
        <div className="space-y-8">
            <h1 className="ts-heading">TypeScript 接口</h1>

            <div className="space-y-6">
                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">接口概述</h2>
                    <p className="text-gray-300">
                        接口是 TypeScript 中最基本的类型定义方式之一，用于定义对象的形状和契约。
                        通过接口，我们可以定义类必须遵循的规则，实现更好的代码组织和类型安全。
                    </p>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">代码示例</h2>
                    <div className="ts-code-block">
                        <pre>
                            <code className="language-typescript">{interfacesExample}</code>
                        </pre>
                    </div>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">使用场景</h2>
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                        <li>定义对象的结构和类型</li>
                        <li>实现面向对象编程中的抽象</li>
                        <li>定义函数类型</li>
                        <li>定义可索引类型</li>
                        <li>通过继承扩展现有接口</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Interfaces;
