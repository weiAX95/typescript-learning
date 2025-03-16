// 基础类型示例
export namespace BasicTypes {
    // 1. 基本类型声明
    const numberType: number = 42; // 用于表示数字，如年龄、价格等
    const stringType: string = "TypeScript"; // 用于表示文本，如用户名、描述等
    const booleanType: boolean = true; // 用于表示真/假，如是否登录、是否激活等
    const nullType: null = null; // 表示空值，通常用于显式表示空
    const undefinedType: undefined = undefined; // 表示未定义，通常用于未初始化的变量

    // 1.1 类型转换示例
    const stringToNumber: number = Number("42"); // 字符串转数字
    const numberToString: string = String(42); // 数字转字符串
    const booleanToString: string = String(true); // 布尔值转字符串

    // 1.2 类型兼容性示例
    let num: number = 42;
    let anyVal: any = "string";
    num = anyVal; // 不安全的赋值，但 TypeScript 允许
    // num = "42"; // 会报错，因为 string 不能赋值给 number

    // 2. 数组
    const numberArray: number[] = [1, 2, 3]; // 数字数组，如价格列表
    const stringArray: Array<string> = ["TypeScript", "JavaScript"]; // 字符串数组，如标签列表

    // 2.1 数组方法示例
    const doubledNumbers = numberArray.map(n => n * 2); // 数组映射
    const filteredNumbers = numberArray.filter(n => n > 1); // 数组过滤
    const total = numberArray.reduce((sum, n) => sum + n, 0); // 数组归约

    // 2.2 只读数组
    const readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
    // readonlyNumbers.push(4); // 会报错，因为数组是只读的

    // 3. 元组
    const tuple: [string, number] = ["age", 25]; // 固定长度和类型的数组，如键值对
    const [key, val] = tuple; // 解构元组

    // 3.1 可选元组元素
    const optionalTuple: [string, number?] = ["name"];
    optionalTuple[1] = 25; // 可选元素

    // 3.2 剩余元素
    const restTuple: [string, ...number[]] = ["numbers", 1, 2, 3];

    // 4. 枚举
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT"
    }
    const direction: Direction = Direction.Up; // 使用枚举值

    // 4.1 常量枚举
    const enum HttpStatus {
        OK = 200,
        NotFound = 404,
        ServerError = 500
    }
    const status: HttpStatus = HttpStatus.OK;

    // 4.2 计算枚举值
    enum FileAccess {
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write
    }
    const access: FileAccess = FileAccess.ReadWrite;

    // 5. Any 和 Unknown
    let anyType: any = 4; // 可以赋值为任何类型
    anyType = "可以是任何类型";
    anyType = true; // 可以继续改变类型

    let unknownType: unknown = 4; // 需要类型检查才能使用
    if (typeof unknownType === "number") {
        const sum = unknownType + 1;
    }

    // 5.1 使用 any 的风险
    const riskyValue: any = "42";
    const result: number = riskyValue * 2; // 运行时可能出错

    // 5.2 使用 unknown 的安全方式
    const safeValue: unknown = "42";
    if (typeof safeValue === "string") {
        const length: number = safeValue.length; // 安全使用
    }

    // 6. Union 类型
    type StringOrNumber = string | number; // 可以是字符串或数字
    const unionType: StringOrNumber = "可以是字符串或数字";

    // 6.1 联合类型的方法
    function printId(id: StringOrNumber) {
        if (typeof id === "string") {
            console.log(id.toUpperCase());
        } else {
            console.log(id.toFixed(2));
        }
    }

    // 6.2 联合类型与数组
    const mixedArray: (string | number)[] = ["one", 2, "three", 4];

    // 7. 字面量类型
    type Directions = "UP" | "DOWN" | "LEFT" | "RIGHT"; // 只能是特定字符串
    const move: Directions = "UP";

    // 7.1 字面量类型与函数重载
    function moveDirection(direction: Directions): void {
        switch (direction) {
            case "UP":
                console.log("Moving up");
                break;
            case "DOWN":
                console.log("Moving down");
                break;
            case "LEFT":
                console.log("Moving left");
                break;
            case "RIGHT":
                console.log("Moving right");
                break;
        }
    }

    // 7.2 字面量类型与对象
    type Config = {
        theme: "light" | "dark";
        fontSize: 12 | 14 | 16;
    };
    const config: Config = {
        theme: "dark",
        fontSize: 14
    };

    // 8. 函数类型
    function add(x: number, y: number): number {
        return x + y;
    }

    // 8.1 函数重载
    function combine(input1: string, input2: string): string;
    function combine(input1: number, input2: number): number;
    function combine(input1: any, input2: any) {
        if (typeof input1 === "string" && typeof input2 === "string") {
            return input1 + input2;
        } else if (typeof input1 === "number" && typeof input2 === "number") {
            return input1 + input2;
        }
    }

    // 8.2 回调函数类型
    type Callback = (result: number) => void;
    function fetchData(callback: Callback): void {
        setTimeout(() => callback(42), 1000);
    }

    // 9. 可选参数
    function greet(name: string, greeting?: string): string {
        return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
    }

    // 9.1 默认参数
    function createUser(name: string, isAdmin: boolean = false): void {
        console.log(`User ${name} created, admin: ${isAdmin}`);
    }

    // 9.2 剩余参数
    function sum(...numbers: number[]): number {
        return numbers.reduce((acc, num) => acc + num, 0);
    }

    // 10. 类型断言
    const someValue: unknown = "这是一个字符串";
    const strLength: number = (someValue as string).length;

    // 10.1 非空断言
    type UserProfile = {
        name: string;
        age?: number;
    };
    const profile: UserProfile = { name: "Alice" };
    const profileAge: number = profile.age!; // 非空断言，可能不安全

    // 10.2 双重断言
    const anyValForAssert: any = "hello";
    const strLen: number = (anyValForAssert as unknown as string).length;

    // 11. 类型推断示例
    const inferredNumber = 42; // TypeScript 会自动推断为 number 类型
    const inferredString = "TypeScript"; // 自动推断为 string 类型

    // 11.1 上下文类型推断
    window.onmousedown = function(mouseEvent) {
        console.log(mouseEvent.button); // 自动推断 mouseEvent 为 MouseEvent 类型
    };

    // 11.2 最佳通用类型推断
    const mixedValues = [0, 1, null]; // 推断为 (number | null)[]

    // 12. 类型守卫示例
    function isString(value: unknown): value is string {
        return typeof value === "string";
    }

    // 12.1 自定义类型守卫
    interface Cat {
        meow(): void;
    }
    interface Dog {
        bark(): void;
    }
    function isCat(pet: Cat | Dog): pet is Cat {
        return (pet as Cat).meow !== undefined;
    }

    // 12.2 in 操作符类型守卫
    function makeSound(pet: Cat | Dog) {
        if ("meow" in pet) {
            pet.meow();
        } else {
            pet.bark();
        }
    }

    // 13. 实际应用示例
    interface AppUser {
        name: string;
        age: number;
        isAdmin: boolean;
        address?: {
            street: string;
            city: string;
        };
    }

    const appUser: AppUser = {
        name: "Alice",
        age: 25,
        isAdmin: false,
        address: {
            street: "Main St",
            city: "New York"
        }
    };

    // 13.1 可选链操作符
    const city = appUser.address?.city; // 安全访问嵌套属性

    // 13.2 空值合并运算符
    const defaultCity = appUser.address?.city ?? "Unknown"; // 提供默认值

    // 14. 错误示例与正确示例对比
    // 错误示例：类型不匹配
    // const wrongNumber: number = "42"; // 会报错

    // 正确示例
    const correctNumber: number = 42;

    // 14.1 类型不兼容
    // const incompatible: string = 42; // 会报错

    // 14.2 类型兼容性
    let compatible: number | string = 42; // 允许
    compatible = "42"; // 也允许

    // 15. 高级类型示例
    // 15.1 条件类型
    type IsString<T> = T extends string ? true : false;
    const isStringResult: IsString<string> = true;
    const isNumberResult: IsString<number> = false;

    // 15.2 映射类型
    type ReadonlyAppUser = Readonly<AppUser>;
    type PartialAppUser = Partial<AppUser>;

    // 15.3 实用类型
    type AppUserKeys = keyof AppUser; // "name" | "age" | "isAdmin" | "address"
    type AppUserNameType = AppUser["name"]; // string

    // 使用示例
    export function demonstrateBasicTypes(): void {
        console.log("数字类型:", numberType);
        console.log("字符串类型:", stringType);
        console.log("布尔类型:", booleanType);
        console.log("数组示例:", numberArray);
        console.log("元组示例:", tuple);
        console.log("枚举示例:", direction);
        console.log("联合类型示例:", unionType);
        console.log("函数调用示例:", add(5, 3));
        console.log("可选参数函数:", greet("TypeScript", "Welcome"));
        console.log("类型推断示例:", inferredNumber, inferredString);
        console.log("用户对象示例:", appUser);
        console.log("高级类型示例:", {
            isString: {
                string: isStringResult,
                number: isNumberResult
            },
            readonlyUser: {} as ReadonlyAppUser,
            partialUser: {} as PartialAppUser
        });
    }
}
