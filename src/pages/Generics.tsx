import { AnimatedTabs } from '../components/AnimatedTabs';
import { CopyableCode } from '../components/CopyableCode';

const tabs = [
    {
        id: 'basic-generics',
        title: '基础泛型',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">基础泛型（Basic Generics）</h2>
                <p>
                    泛型允许我们在定义函数、接口或类时，不预先指定具体的类型，而在使用时再指定类型的一种特性。
                </p>
                <CopyableCode
                    code={`
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let output = identity<string>("myString");
let output2 = identity(123);  // 类型推断

// 泛型接口
interface Container<T> {
    value: T;
    getValue(): T;
}

// 实现泛型接口
class NumberContainer implements Container<number> {
    constructor(public value: number) {}
    
    getValue(): number {
        return this.value;
    }
}
`}
                />
            </div>
        )
    },
    {
        id: 'generic-constraints',
        title: '泛型约束',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">泛型约束（Generic Constraints）</h2>
                <p>
                    有时我们希望限制泛型可以代表的类型范围，这时可以使用泛型约束。
                </p>
                <CopyableCode
                    code={`
// 定义一个约束接口
interface Lengthwise {
    length: number;
}

// 使用约束
function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

logLength("Hello");     // OK
logLength([1, 2, 3]);  // OK
logLength({ length: 10 }); // OK
// logLength(3);  // Error: number doesn't have a length property

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // OK
// getProperty(x, "d"); // Error: "d" is not in "a" | "b" | "c"
`}
                />
            </div>
        )
    },
    {
        id: 'generic-classes',
        title: '泛型类',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">泛型类（Generic Classes）</h2>
                <p>
                    泛型类使得类可以支持多种数据类型，增加了代码的复用性。
                </p>
                <CopyableCode
                    code={`
// 泛型类
class Queue<T> {
    private data: T[] = [];
    
    push(item: T) {
        this.data.push(item);
    }
    
    pop(): T | undefined {
        return this.data.shift();
    }

    peek(): T | undefined {
        return this.data[0];
    }
}

// 使用泛型类
const numberQueue = new Queue<number>();
numberQueue.push(1);
numberQueue.push(2);
console.log(numberQueue.pop()); // 1

const stringQueue = new Queue<string>();
stringQueue.push("Hello");
stringQueue.push("TypeScript");
console.log(stringQueue.peek()); // "Hello"

// 带约束的泛型类
class KeyValuePair<K extends string | number, V> {
    constructor(public key: K, public value: V) {}
    
    toString() {
        return \`\${this.key}: \${this.value}\`;
    }
}

const pair1 = new KeyValuePair("name", "TypeScript");
const pair2 = new KeyValuePair(1, true);
`}
                />
            </div>
        )
    }
];

const Generics = () => {
    return (
        <div className="space-y-8">
            <h1 className="ts-heading">泛型</h1>
            <p className="text-lg">
                泛型是 TypeScript 中最强大的特性之一，它可以让我们的代码支持多种数据类型，同时保持类型安全。
            </p>
            <AnimatedTabs tabs={tabs} />
        </div>
    );
};

export default Generics;
