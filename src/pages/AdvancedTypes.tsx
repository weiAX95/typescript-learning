import { AnimatedTabs } from '../components/AnimatedTabs';
import { CopyableCode } from '../components/CopyableCode';

const tabs = [
    {
        id: 'mapped-types',
        title: '映射类型',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">映射类型（Mapped Types）</h2>
                <p>
                    映射类型允许我们从一个旧的类型创建一个新的类型，通过遍历旧类型的所有属性来转换它们。
                </p>
                <CopyableCode
                    code={`
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Person = {
    name: string;
    age: number;
};

type ReadonlyPerson = Readonly<Person>;
// {
//     readonly name: string;
//     readonly age: number;
// }

type PartialPerson = Partial<Person>;
// {
//     name?: string;
//     age?: number;
// }
`}
                />
            </div>
        )
    },
    {
        id: 'conditional-types',
        title: '条件类型',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">条件类型（Conditional Types）</h2>
                <p>
                    条件类型帮助我们根据类型关系描述类型，类似于 JavaScript 中的条件语句。
                </p>
                <CopyableCode
                    code={`
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 实用的条件类型例子
type NonNullable<T> = T extends null | undefined ? never : T;

type C = NonNullable<string | null>;  // string
type D = NonNullable<undefined | number>;  // number
`}
                />
            </div>
        )
    },
    {
        id: 'utility-types',
        title: '实用类型',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">实用类型（Utility Types）</h2>
                <p>
                    TypeScript 内置了许多实用的类型工具，帮助我们进行常见的类型转换。
                </p>
                <CopyableCode
                    code={`
type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
};

// 选取部分属性
type UserBasicInfo = Pick<User, 'name' | 'avatar'>;
// { name: string; avatar: string; }

// 排除某些属性
type UserPublicInfo = Omit<User, 'email'>;
// { id: number; name: string; avatar: string; }

// 将所有属性设为可选
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; avatar?: string; }

// 将所有属性设为必选
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; avatar: string; }
`}
                />
            </div>
        )
    }
];

const AdvancedTypes = () => {
    return (
        <div className="space-y-8">
            <h1 className="ts-heading">高级类型</h1>
            <p className="text-lg">
                在这一章节中，我们将学习 TypeScript 中的高级类型特性，包括映射类型、条件类型和内置的实用类型工具。
            </p>
            <AnimatedTabs tabs={tabs} />
        </div>
    );
};

export default AdvancedTypes;
