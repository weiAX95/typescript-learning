interface AppUser {
    name: string;
    age: number;
    isAdmin: boolean;
    address?: {
        street: string;
        city: string;
    };
}

export namespace AdvancedTypes {
    // 条件类型示例
    type IsString<T> = T extends string ? true : false;

    type A = IsString<'hello'>; // true
    type B = IsString<42>; // false

    // 映射类型示例
    type ReadonlyAppUser = Readonly<AppUser>;
    type PartialAppUser = Partial<AppUser>;

    // 实用类型示例
    type AppUserKeys = keyof AppUser; // "name" | "age" | "isAdmin" | "address"
    type AppUserNameType = AppUser["name"]; // string

    // 使用示例
    export function demonstrateAdvancedTypes(): void {
        console.log("条件类型示例:", {
            isString: {
                string: true,
                number: false
            }
        });
        console.log("映射类型示例:", {
            readonlyUser: {} as ReadonlyAppUser,
            partialUser: {} as PartialAppUser
        });
        console.log("实用类型示例:", {
            appUserKeys: ["name", "age", "isAdmin", "address"],
            appUserNameType: "string"
        });
    }
}
