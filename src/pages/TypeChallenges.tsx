import React from 'react';
import { CodeEditor } from '../components/CodeEditor';

interface Challenge {
    title: string;
    description: string;
    code: string;
    solution: string;
}

const typeChallenges: Challenge[] = [
    {
        title: '联合转交叉',
        description: '实现联合类型到交叉类型的转换。这是一个高级的类型操作，常用于合并多个类型。',
        code: `type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends 
    (k: infer I) => void ? I : never

// 完成下面的练习
type Union = { a: string } | { b: number } | { c: boolean }
type Result = UnionToIntersection<Union>
// 目标结果: { a: string } & { b: number } & { c: boolean }`,
        solution: `type Result = { a: string } & { b: number } & { c: boolean }

// 测试用例
type Case1 = UnionToIntersection<string | number> // never
type Case2 = UnionToIntersection<{ id: number } | { name: string }> // { id: number } & { name: string }
type Case3 = UnionToIntersection<{ a: string } | never> // { a: string }`
    },
    {
        title: '对象Pick/Omit',
        description: '实现高级版本的Pick和Omit类型，支持深层属性路径。',
        code: `type DeepPick<T, P extends string> = {
    [K in P as K extends keyof T ? K : never]: T[K]
} & {
    [K in P as K extends \`\${infer F}.\${infer R}\` 
        ? F extends keyof T 
            ? F 
            : never 
        : never]: DeepPick<T[K], R>
}

// 完成下面的练习
interface Nested {
    a: string
    b: { c: number; d: boolean }
    e: { f: { g: string } }
}

type Result = DeepPick<Nested, 'a' | 'b.c' | 'e.f.g'>`,
        solution: `type Result = {
    a: string
    b: { c: number }
    e: { f: { g: string } }
}

// 测试用例
type Case1 = DeepPick<Nested, 'a'> // { a: string }
type Case2 = DeepPick<Nested, 'b.c'> // { b: { c: number } }
type Case3 = DeepPick<Nested, 'e.f.g'> // { e: { f: { g: string } } }`
    },
    {
        title: '条件类型分发',
        description: '理解并实现条件类型的分发特性，这在处理联合类型时非常有用。',
        code: `type Distribute<T, U> = T extends U ? T : never

type DistributeTypes<T, U> = T extends any 
    ? U extends any 
        ? [T, U] 
        : never 
    : never

// 完成下面的练习
type A = 'a' | 'b'
type B = 1 | 2
type Result = DistributeTypes<A, B>
// 目标结果: ['a', 1] | ['a', 2] | ['b', 1] | ['b', 2]`,
        solution: `type Result = ['a', 1] | ['a', 2] | ['b', 1] | ['b', 2]

// 测试用例
type Case1 = Distribute<'a' | 'b' | 'c', 'a' | 'b'> // 'a' | 'b'
type Case2 = DistributeTypes<string | number, boolean> // [string, true] | [string, false] | [number, true] | [number, false]`
    },
    {
        title: '字符串操作',
        description: '使用递归和模板字符串类型实现字符串拼接。',
        code: `type Join<T extends string[], D extends string> = 
    T extends [infer F extends string, ...infer R extends string[]]
        ? R extends []
            ? F
            : \`\${F}\${D}\${Join<R, D>}\`
        : ''

// 完成下面的练习
type Words = ['hello', 'world', 'typescript']
type Result = Join<Words, '-'>
// 目标结果: 'hello-world-typescript'`,
        solution: `type Result = 'hello-world-typescript'

// 测试用例
type Case1 = Join<['a', 'b', 'c'], '.'> // 'a.b.c'
type Case2 = Join<['x'], '-'> // 'x'
type Case3 = Join<[], ','> // ''`
    }
];

const TypeChallenges: React.FC = () => {
    return (
        <div className="container max-w-6xl px-4 py-8 mx-auto">
            <h1 className="ts-heading">TypeScript 类型体操</h1>
            <p className="mb-8 text-gray-400">
                通过这些挑战来掌握 TypeScript 的高级类型操作。每个练习都包含详细的解答供参考！
            </p>
            <div className="space-y-8">
                {typeChallenges.map((challenge, index) => (
                    <div key={index} className="ts-card">
                        <h2 className="mb-3 text-xl font-semibold text-ts-blue">{challenge.title}</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">{challenge.description}</p>
                        <div className="mb-4">
                            <h3 className="mb-2 font-medium dark:text-gray-300">练习代码：</h3>
                            <CodeEditor
                                value={challenge.code}
                                onChange={() => { }}
                                language="typescript"
                            />
                        </div>
                        <div className="mb-4">
                            <h3 className="mb-2 font-medium dark:text-gray-300">参考答案：</h3>
                            <CodeEditor
                                value={challenge.solution}
                                onChange={() => { }}
                                language="typescript"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TypeChallenges;
