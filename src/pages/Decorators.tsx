import { useEffect } from 'react';
import Prism from 'prismjs';

const Decorators = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const decoratorsExample = `// 类装饰器
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// 方法装饰器
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log("方法装饰器");
    console.log(target);
    console.log(propertyName);
    console.log(descriptor);
}

// 属性装饰器
function LogProperty(target: any, propertyName: string | Symbol) {
    console.log("属性装饰器");
    console.log(target);
    console.log(propertyName);
}

// 实用装饰器示例
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

// 验证装饰器
function Required(target: any, propName: string) {
    const className = target.constructor.name;
    const validationRules = {
        ...target.constructor._validationRules,
        [propName]: { required: true }
    };
    target.constructor._validationRules = validationRules;
}

function MinLength(min: number) {
    return function(target: any, propName: string) {
        const className = target.constructor.name;
        const validationRules = {
            ...target.constructor._validationRules,
            [propName]: { minLength: min }
        };
        target.constructor._validationRules = validationRules;
    };
}

// 使用装饰器
@Logger("创建商品...")
class Product {
    @Required
    title: string;

    @MinLength(5)
    description: string;

    @LogProperty
    private _price: number;

    constructor(t: string, d: string, p: number) {
        this.title = t;
        this.description = d;
        this._price = p;
    }

    @Log
    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }

    @Autobind
    getInfo() {
        return \`\${this.title}: \${this._price}\`;
    }
}`;

    return (
        <div className="space-y-8">
            <h1 className="ts-heading">TypeScript 装饰器</h1>

            <div className="space-y-6">
                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">装饰器概述</h2>
                    <p className="text-gray-300">
                        装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。
                        装饰器使用 @expression 这种形式，expression求值后必须为一个函数，它会在运行时被调用。
                    </p>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">代码示例</h2>
                    <div className="ts-code-block">
                        <pre>
                            <code className="language-typescript">{decoratorsExample}</code>
                        </pre>
                    </div>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">装饰器类型</h2>
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                        <li>类装饰器: 在类声明之前声明，应用于类构造函数</li>
                        <li>方法装饰器: 声明在方法之前，应用于方法的属性描述符</li>
                        <li>访问器装饰器: 应用于访问器的属性描述符</li>
                        <li>属性装饰器: 声明在属性之前</li>
                        <li>参数装饰器: 声明在参数之前</li>
                    </ul>
                </section>

                <section className="ts-card">
                    <h2 className="mb-4 text-2xl font-bold text-ts-blue">使用场景</h2>
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                        <li>日志记录：记录方法调用和参数</li>
                        <li>方法拦截：在方法执行前后添加逻辑</li>
                        <li>参数验证：验证方法参数</li>
                        <li>属性验证：验证类属性</li>
                        <li>依赖注入：实现控制反转</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Decorators;
