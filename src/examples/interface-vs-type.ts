// Interface 和 Type 的区别及使用场景示例

// 1. 基本语法区别
// Interface 使用 interface 关键字
interface UserInterface {
    name: string;
    age: number;
}

// Type 使用 type 关键字
type UserType = {
    name: string;
    age: number;
}

// 2. 扩展方式的区别

// Interface 可以重复声明，会自动合并
interface Animal {
    name: string;
}
interface Animal {
    age: number;
}
// 最终 Animal 接口包含 name 和 age

// Type 不能重复声明
type Dog = {
    name: string;
}
// 错误：不能重复声明 type
// type Dog = {
//     age: number;
// }

// 3. 继承方式的区别

// Interface 使用 extends 继承
interface Employee extends UserInterface {
    salary: number;
}

// Type 使用交叉类型（&）继承
type Worker = UserType & {
    salary: number;
}

// 4. 实际应用场景

// 场景1：定义 API 接口响应格式
// 推荐使用 Interface，因为接口可能会扩展
interface ApiResponse<T> {
    code: number;
    data: T;
    message: string;
}

// 具体业务接口
interface UserResponse extends ApiResponse<UserInterface> {
    // 可以添加特定的字段
    timestamp: number;
}

// 场景2：定义函数类型
// 推荐使用 Type，因为更简洁
type HttpHandler = (req: Request, res: Response) => void;
type Calculator = (x: number, y: number) => number;

// 场景3：定义联合类型
// 只能使用 Type
type Status = "pending" | "success" | "failed";
type ID = number | string;

// 场景4：定义可重用的对象结构
// 推荐使用 Interface
interface Repository<T> {
    find(id: number): Promise<T>;
    save(item: T): Promise<T>;
    update(id: number, item: Partial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}

// 场景5：定义工具类型
// 推荐使用 Type
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// 使用示例
export namespace InterfaceVsType {
    // 1. API 接口示例
    interface UserData {
        id: number;
        name: string;
        email: string;
    }

    // 使用 interface 定义 API 响应格式
    interface GetUserResponse extends ApiResponse<UserData> {
        timestamp: number;
    }

    // 模拟 API 调用
    async function getUser(id: number): Promise<GetUserResponse> {
        return {
            code: 200,
            data: {
                id,
                name: "张三",
                email: "zhangsan@example.com"
            },
            message: "成功",
            timestamp: Date.now()
        };
    }

    // 2. 状态管理示例
    type UserState = {
        isLoading: boolean;
        data: Nullable<UserData>;
        error: Optional<string>;
    }

    // 3. 组件 Props 示例
    interface UserProfileProps {
        user: UserData;
        onUpdate: (user: UserData) => void;
        isEditable?: boolean;
    }

    // 4. 实体类示例
    interface UserEntity {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }

    // 使用 Repository 接口
    class UserRepository implements Repository<UserEntity> {
        async find(id: number): Promise<UserEntity> {
            // 实现查找逻辑
            return {} as UserEntity;
        }

        async save(user: UserEntity): Promise<UserEntity> {
            // 实现保存逻辑
            return user;
        }

        async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
            // 实现更新逻辑
            return {} as UserEntity;
        }

        async delete(id: number): Promise<void> {
            // 实现删除逻辑
        }
    }

    // 导出演示函数
    export async function demonstrate() {
        // 1. 使用 API 响应接口
        const response = await getUser(1);
        console.log("API响应:", response);

        // 2. 使用状态类型
        const initialState: UserState = {
            isLoading: false,
            data: null,
            error: undefined
        };
        console.log("初始状态:", initialState);

        // 3. 使用仓储接口
        const userRepo = new UserRepository();
        const user = await userRepo.find(1);
        console.log("查找用户:", user);

        // 4. 使用联合类型
        const status: Status = "pending";
        console.log("状态:", status);

        // 5. 使用工具类型
        const nullableUser: Nullable<UserData> = null;
        console.log("可空用户:", nullableUser);
    }
}
