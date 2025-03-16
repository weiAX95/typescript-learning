// 基础类型示例
export namespace BasicTypes {
    // 1. 基本类型声明
    const numberType: number = 42;
    const stringType: string = "TypeScript";
    const booleanType: boolean = true;
    const nullType: null = null;
    const undefinedType: undefined = undefined;

    // 2. 数组
    const numberArray: number[] = [1, 2, 3];
    const stringArray: Array<string> = ["TypeScript", "JavaScript"];

    // 3. 元组
    const tuple: [string, number] = ["age", 25];

    // 4. 枚举
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT"
    }
    const direction: Direction = Direction.Up;

    // 5. Any 和 Unknown
    let anyType: any = 4;
    anyType = "可以是任何类型";

    let unknownType: unknown = 4;
    // 需要类型检查才能使用
    if (typeof unknownType === "number") {
        const sum = unknownType + 1;
    }

    // 6. Union 类型
    type StringOrNumber = string | number;
    const unionType: StringOrNumber = "可以是字符串或数字";

    // 7. 字面量类型
    type Directions = "UP" | "DOWN" | "LEFT" | "RIGHT";
    const move: Directions = "UP";

    // 8. 函数类型
    function add(x: number, y: number): number {
        return x + y;
    }

    // 9. 可选参数
    function greet(name: string, greeting?: string): string {
        return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
    }

    // 10. 类型断言
    const someValue: unknown = "这是一个字符串";
    const strLength: number = (someValue as string).length;

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
    }
}
