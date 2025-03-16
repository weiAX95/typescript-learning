import { AnimatedTabs } from '../components/AnimatedTabs';
import { CopyableCode } from '../components/CopyableCode';

const tabs = [
    {
        id: 'class-decorators',
        title: '类装饰器',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">类装饰器（Class Decorators）</h2>
                <p>
                    类装饰器在类声明之前声明，用来监视、修改或替换类定义。
                </p>
                <CopyableCode
                    code={`
// 简单的类装饰器
function logged(target: Function) {
    console.log(\`Creating new instance of: \${target.name}\`);
}

@logged
class Person {
    constructor(public name: string) {}
}

// 装饰器工厂
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        reportingURL = "http://www.example.com";
    };
}

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}
`}
                />
            </div>
        )
    },
    {
        id: 'method-decorators',
        title: '方法装饰器',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">方法装饰器（Method Decorators）</h2>
                <p>
                    方法装饰器用于监视、修改或替换方法的定义。
                </p>
                <CopyableCode
                    code={`
// 方法装饰器
function log(target: any, key: string, descriptor: PropertyDescriptor) {
    // 保存原始的方法
    const originalMethod = descriptor.value;

    // 修改方法的行为
    descriptor.value = function(...args: any[]) {
        console.log(\`Calling: \${key} with args: \${JSON.stringify(args)}\`);
        const result = originalMethod.apply(this, args);
        console.log(\`Result: \${result}\`);
        return result;
    };

    return descriptor;
}

class Calculator {
    @log
    add(x: number, y: number) {
        return x + y;
    }
}

const calc = new Calculator();
calc.add(1, 2);
// 输出:
// Calling: add with args: [1,2]
// Result: 3
`}
                />
            </div>
        )
    },
    {
        id: 'property-decorators',
        title: '属性装饰器',
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ts-blue">属性装饰器（Property Decorators）</h2>
                <p>
                    属性装饰器用于类的属性声明。我们可以用它来监视属性的定义。
                </p>
                <CopyableCode
                    code={`
// 属性装饰器
function validate(target: any, key: string) {
    let value = target[key];

    const getter = () => value;
    const setter = (next: string) => {
        if (next.length <= 3) {
            throw new Error('Name is too short');
        }
        value = next;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}

class User {
    @validate
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User("John");
// user.name = "Jo"; // Error: Name is too short

// 参数装饰器
function required(target: Object, key: string, index: number) {
    const requiredParams: number[] = Reflect.getMetadata('required', target, key) || [];
    requiredParams.push(index);
    Reflect.defineMetadata('required', requiredParams, target, key);
}

class Greeter {
    greet(@required name: string) {
        return \`Hello \${name}!\`;
    }
}
`}
                />
            </div>
        )
    }
];

const Decorators = () => {
    return (
        <div className="space-y-8">
            <h1 className="ts-heading">装饰器</h1>
            <p className="text-lg">
                装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。装饰器使用 @expression 这种形式，
                expression 求值后必须为一个函数，它会在运行时被调用。
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
                <p className="text-yellow-700">
                    注意：装饰器是一个实验性的特性，在使用时需要在 tsconfig.json 中启用 experimentalDecorators 选项。
                </p>
            </div>
            <AnimatedTabs tabs={tabs} />
        </div>
    );
};

export default Decorators;
