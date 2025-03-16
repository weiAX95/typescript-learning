// 泛型示例
export namespace Generics {
    // 1. 基础泛型函数
    function identity<T>(arg: T): T {
        return arg;
    }

    // 2. 泛型接口
    interface GenericResponse<T> {
        data: T;
        status: number;
        message: string;
    }

    // 3. 泛型类
    class GenericBox<T> {
        private content: T;

        constructor(value: T) {
            this.content = value;
        }

        getValue(): T {
            return this.content;
        }

        setValue(value: T): void {
            this.content = value;
        }
    }

    // 4. 泛型约束
    interface Lengthwise {
        length: number;
    }

    function logLength<T extends Lengthwise>(arg: T): number {
        return arg.length;
    }

    // 5. 多类型参数
    class KeyValuePair<TKey, TValue> {
        constructor(
            private key: TKey,
            private value: TValue
        ) {}

        getKey(): TKey {
            return this.key;
        }

        getValue(): TValue {
            return this.value;
        }
    }

    // 6. 泛型工具类型
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    // Partial 示例
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
        return { ...todo, ...fieldsToUpdate };
    }

    // 7. 泛型方法链
    class QueryBuilder<T> {
        private filters: Array<(item: T) => boolean> = [];

        where(predicate: (item: T) => boolean): QueryBuilder<T> {
            this.filters.push(predicate);
            return this;
        }

        execute(items: T[]): T[] {
            return items.filter(item => 
                this.filters.every(filter => filter(item))
            );
        }
    }

    // 8. 泛型工厂
    interface Constructable<T> {
        new (...args: any[]): T;
    }

    function createInstance<T>(Constructor: Constructable<T>): T {
        return new Constructor();
    }

    // 使用示例
    export function demonstrateGenerics(): void {
        // 基础泛型函数
        console.log("泛型函数:", identity<string>("Hello TypeScript"));
        console.log("泛型函数（类型推断）:", identity(42));

        // 泛型响应
        const response: GenericResponse<string[]> = {
            data: ["item1", "item2"],
            status: 200,
            message: "成功"
        };
        console.log("泛型响应:", response);

        // 泛型类
        const box = new GenericBox<string>("TypeScript示例");
        console.log("泛型类:", box.getValue());

        // 泛型约束
        console.log("字符串长度:", logLength("TypeScript"));
        console.log("数组长度:", logLength([1, 2, 3]));

        // 键值对
        const pair = new KeyValuePair<string, number>("age", 25);
        console.log("键值对:", pair.getKey(), pair.getValue());

        // Partial 更新
        const todo: Todo = {
            title: "学习 TypeScript",
            description: "学习泛型编程",
            completed: false
        };
        const updatedTodo = updateTodo(todo, { completed: true });
        console.log("更新后的 Todo:", updatedTodo);

        // 查询构建器
        const users = [
            { id: 1, name: "张三", age: 25 },
            { id: 2, name: "李四", age: 30 },
            { id: 3, name: "王五", age: 25 }
        ];

        const result = new QueryBuilder<typeof users[0]>()
            .where(user => user.age === 25)
            .where(user => user.id > 0)
            .execute(users);

        console.log("查询结果:", result);
    }
}
