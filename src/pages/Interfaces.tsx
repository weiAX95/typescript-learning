import { AnimatedTabs } from '../components/AnimatedTabs';
import { CopyableCode } from '../components/CopyableCode';

const tabs = [
    {
        id: 'interfaces',
        title: '接口',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">接口（Interface）</h2>
                <p>
                    接口是 TypeScript 中一个强大的特性，它可以定义对象的结构和约束。
                </p>
                <CopyableCode
                    code={`
interface Person {
    name: string;
    age: number;
    greet(): void;
}

class Student implements Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    greet() {
        console.log(\`Hello, I'm \${this.name}\`);
    }
}

// 接口继承
interface Employee extends Person {
    salary: number;
    department: string;
}

// 可选属性
interface Config {
    color?: string;
    width?: number;
}

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
`}
                />
            </div>
        )
    },
    {
        id: 'type-aliases',
        title: '类型别名',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">类型别名（Type Aliases）</h2>
                <p>
                    类型别名用于为类型创建一个新的名称。它可以为任何类型定义别名，包括原始类型、联合类型、交叉类型等。
                </p>
                <CopyableCode
                    code={`
// 基本类型别名
type Age = number;
type Point = { x: number; y: number };

// 联合类型
type Status = 'pending' | 'success' | 'error';

// 交叉类型
type Admin = Person & {
    privileges: string[];
};

// 泛型类型别名
type Container<T> = { value: T };

// 条件类型
type TypeName<T> = 
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    'object';
`}
                />
            </div>
        )
    },
    {
        id: 'interface-vs-type',
        title: '接口 vs 类型别名',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">接口 vs 类型别名的区别</h2>
                <p>
                    虽然接口和类型别名有很多相似之处，但它们也有一些重要的区别。
                </p>
                <CopyableCode
                    code={`
// 接口声明合并
interface Box {
    height: number;
}
interface Box {
    width: number;
}
// 相当于：
// interface Box {
//     height: number;
//     width: number;
// }

// 类型别名不能合并
type Box = {
    height: number;
}
// Error: Duplicate identifier 'Box'
type Box = {
    width: number;
}

// 接口只能描述对象类型
interface User {
    name: string;
}

// 类型别名可以描述任何类型
type StringOrNumber = string | number;
type Text = string;
type Callback = (data: string) => void;
`}
                />
            </div>
        )
    }
];

const Interfaces = () => {
    return (
        <div className="space-y-8">
            <h1 className="ts-heading">接口 & 类型别名</h1>
            <p className="text-lg">
                接口和类型别名是 TypeScript 中定义类型的两种主要方式。本章节将介绍它们的用法和区别。
            </p>
            <AnimatedTabs tabs={tabs} />
        </div>
    );
};

export default Interfaces;
