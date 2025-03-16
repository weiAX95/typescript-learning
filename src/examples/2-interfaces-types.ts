// 接口和类型别名示例
export namespace InterfacesAndTypes {
    // 1. 基本接口定义
    interface User {
        id: number;
        name: string;
        age: number;
        email?: string; // 可选属性
        readonly createdAt: Date; // 只读属性
    }

    // 2. 接口继承
    interface Employee extends User {
        salary: number;
        department: string;
    }

    // 3. 函数接口
    interface MathOperation {
        (x: number, y: number): number;
    }

    // 函数接口实现
    const add: MathOperation = (x, y) => x + y;
    const multiply: MathOperation = (x, y) => x * y;

    // 4. 类型别名
    type Point = {
        x: number;
        y: number;
    };

    // 5. 联合类型
    type Status = "pending" | "approved" | "rejected";

    // 6. 交叉类型
    type Admin = User & {
        privileges: string[];
        role: "admin";
    };

    // 7. 实现接口的类
    class UserImpl implements User {
        id: number;
        name: string;
        age: number;
        readonly createdAt: Date;

        constructor(id: number, name: string, age: number) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.createdAt = new Date();
        }
    }

    // 8. 索引签名
    interface StringMap {
        [key: string]: string;
    }

    // 9. 泛型接口
    interface Repository<T> {
        get(id: number): T;
        save(item: T): void;
        delete(id: number): void;
    }

    // 使用示例
    export function demonstrateInterfacesAndTypes(): void {
        // 创建用户
        const user: User = {
            id: 1,
            name: "张三",
            age: 30,
            createdAt: new Date()
        };

        // 创建员工
        const employee: Employee = {
            id: 2,
            name: "李四",
            age: 25,
            salary: 10000,
            department: "IT",
            createdAt: new Date()
        };

        // 使用函数接口
        console.log("加法结果:", add(5, 3));
        console.log("乘法结果:", multiply(4, 2));

        // 使用点类型
        const point: Point = { x: 10, y: 20 };
        console.log("点坐标:", point);

        // 使用状态类型
        const status: Status = "approved";
        console.log("状态:", status);

        // 使用管理员类型
        const admin: Admin = {
            id: 3,
            name: "王五",
            age: 35,
            privileges: ["manage_users", "manage_content"],
            role: "admin",
            createdAt: new Date()
        };

        // 使用字符串映射
        const config: StringMap = {
            apiUrl: "https://api.example.com",
            apiKey: "abc123"
        };

        // 使用类实现
        const userObject = new UserImpl(4, "赵六", 28);
        console.log("用户对象:", userObject);

        // 输出示例
        console.log("用户:", user);
        console.log("员工:", employee);
        console.log("管理员:", admin);
        console.log("配置:", config);
    }
}
