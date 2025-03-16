// 装饰器示例
export namespace Decorators {
    // 1. 类装饰器
    function Logger(logString: string) {
        return function(constructor: Function) {
            console.log(logString);
            console.log(constructor);
        };
    }

    // 2. 方法装饰器
    function Log(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        console.log("方法装饰器");
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    }

    // 3. 属性装饰器
    function LogProperty(target: any, propertyKey: string | symbol) {
        console.log("属性装饰器");
        console.log(target);
        console.log(propertyKey);
    }

    // 4. 访问器装饰器
    function LogAccessor(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        console.log("访问器装饰器");
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    }

    // 5. 参数装饰器
    function LogParameter(target: any, propertyKey: string | symbol, parameterIndex: number) {
        console.log("参数装饰器");
        console.log(target);
        console.log(propertyKey);
        console.log(parameterIndex);
    }

    // 6. 实用装饰器 - 自动绑定方法
    function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
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

    // 7. 验证装饰器
    interface ValidatorConfig {
        [property: string]: {
            [validatableProp: string]: string[];
        };
    }

    const registeredValidators: ValidatorConfig = {};

    function Required(target: any, propName: string) {
        registeredValidators[target.constructor.name] = {
            ...registeredValidators[target.constructor.name],
            [propName]: ['required']
        };
    }

    function PositiveNumber(target: any, propName: string) {
        registeredValidators[target.constructor.name] = {
            ...registeredValidators[target.constructor.name],
            [propName]: ['positive']
        };
    }

    function validate(obj: any) {
        const validatorConfig = registeredValidators[obj.constructor.name];
        if (!validatorConfig) {
            return true;
        }

        let isValid = true;
        for (const prop in validatorConfig) {
            for (const validator of validatorConfig[prop]) {
                switch (validator) {
                    case 'required':
                        isValid = isValid && !!obj[prop];
                        if (!isValid) console.log(`${prop} 是必需的!`);
                        break;
                    case 'positive':
                        isValid = isValid && obj[prop] > 0;
                        if (!isValid) console.log(`${prop} 必须是正数!`);
                        break;
                }
            }
        }
        return isValid;
    }

    // 使用示例
    @Logger("正在创建产品...")
    class Product {
        @LogProperty
        private _price: number;
        
        @LogProperty
        title: string;

        constructor(t: string, p: number) {
            this.title = t;
            this._price = p;
        }

        @Log
        getPriceWithTax(@LogParameter tax: number) {
            return this._price * (1 + tax);
        }

        @LogAccessor
        get price() {
            return this._price;
        }

        @Autobind
        showInfo() {
            console.log(`${this.title}: ¥${this._price}`);
        }
    }

    class Course {
        @Required
        title: string;

        @PositiveNumber
        @Required
        price: number;

        constructor(t: string, p: number) {
            this.title = t;
            this.price = p;
        }
    }

    // 导出演示函数
    export function demonstrateDecorators(): void {
        console.log("创建产品实例...");
        const prod1 = new Product("书籍", 100);
        const prod2 = new Product("课程", 200);

        console.log("测试自动绑定装饰器...");
        const showInfo = prod1.showInfo;
        showInfo(); // 这里this仍然指向prod1

        console.log("测试验证装饰器...");
        const course = new Course("TypeScript基础", 99);
        console.log("验证结果:", validate(course));

        const invalidCourse = new Course("", -10);
        console.log("验证结果:", validate(invalidCourse));
    }
}
