/**
 * TypeScript 类型体操 - 基础类型转换
 * 本模块包含基础的类型转换工具实现
 */

/**
 * 1. 字符串字面量转联合类型
 * @description 将字符串字面量类型转换为字符联合类型
 * @example
 * ```ts
 * type T0 = StringToUnion<"hello">
 * // 结果: "h" | "e" | "l" | "l" | "o"
 * ```
 */
export type StringToUnion<S extends string> = S extends `${infer C}${infer R}`
  ? C | StringToUnion<R>
  : never

/**
 * 2. 联合类型转交叉类型
 * @description 将联合类型转换为交叉类型
 * @example
 * ```ts
 * type T0 = UnionToIntersection<{ a: string } | { b: number }>
 * // 结果: { a: string } & { b: number }
 * ```
 */
export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends 
  ((k: infer I) => void) ? I : never

/**
 * 3. 字符串数组转联合类型
 * @description 将字符串数组类型转换为联合类型
 * @example
 * ```ts
 * type T0 = ArrayToUnion<['a', 'b', 'c']>
 * // 结果: "a" | "b" | "c"
 * ```
 */
export type ArrayToUnion<A extends readonly string[]> = A[number]

/**
 * 4. 联合类型转元组类型
 * @description 将联合类型转换为元组类型
 */
export type UnionToTuple<T> = 
  [T] extends [never] 
    ? [] 
    : [...UnionToTuple<Exclude<T, GetUnionLast<T>>>, GetUnionLast<T>]

type GetUnionLast<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R 
  ? R 
  : never

// ========== 练习题 ==========

// 练习1: 字符串转联合类型
type Colors = "red" | "blue" | "green"
type ColorChars = StringToUnion<"red"> 
// 结果: "r" | "e" | "d"

// 练习2: 对象联合转交叉
interface Circle {
  kind: "circle"
  radius: number
}

interface Square {
  kind: "square"
  size: number
}

type Shape = Circle | Square
type AllShape = UnionToIntersection<Shape>
// 结果: Circle & Square

// 练习3: 数组转联合
type Fruits = ArrayToUnion<['apple', 'banana', 'orange']>
// 结果: "apple" | "banana" | "orange"

// 练习4: 联合转元组
type Numbers = 1 | 2 | 3
type NumbersTuple = UnionToTuple<Numbers>
// 结果: [1, 2, 3]

// ========== 高级练习 ==========

/**
 * 5. 实现 CamelCase 转换
 * @description 将下划线命名转换为驼峰命名
 */
export type CamelCase<S extends string> = 
  S extends `${infer L}_${infer R}${infer Rest}`
    ? `${L}${Uppercase<R>}${CamelCase<Rest>}`
    : S

/**
 * 6. 实现 KebabCase 转换
 * @description 将驼峰命名转换为短横线命名
 */
export type KebabCase<S extends string> = 
  S extends `${infer C}${infer R}`
    ? R extends Uncapitalize<R>
      ? `${Lowercase<C>}${KebabCase<R>}`
      : `${Lowercase<C>}-${KebabCase<R>}`
    : S

// ========== 实战应用 ==========

/**
 * 实际应用场景：API响应处理
 */

// 1. API响应字段命名规范化
type ApiResponse = {
  user_id: number
  first_name: string
  last_name: string
  email_address: string
}

// 将所有属性转换为驼峰命名
type NormalizedResponse = {
  [K in keyof ApiResponse as CamelCase<K & string>]: ApiResponse[K]
}

// 2. 路由参数处理
type RouteParams = '/user/profile' | '/user/settings' | '/dashboard'
type RouteSegments = StringToUnion<RouteParams>

// 3. 组件属性合并
interface BaseProps {
  className?: string
  style?: object
}

interface SpecificProps {
  data: unknown
  onUpdate: () => void
}

// 合并所有属性
type CombinedProps = UnionToIntersection<BaseProps | SpecificProps>

// 使用示例：
const processApiResponse = (response: NormalizedResponse) => {
  // 处理规范化后的响应数据
}

const validateRoute = (segment: RouteSegments) => {
  // 验证路由片段
}

const createComponent = (props: CombinedProps) => {
  // 创建组件
}

// 类型测试
type UserName = CamelCase<"first_name"> // 结果: "firstName"
type ApiPath = KebabCase<"getUserProfile"> // 结果: "get-user-profile"
