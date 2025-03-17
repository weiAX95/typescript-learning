/**
 * TypeScript 类型体操 - 条件类型实现
 * 本模块包含条件类型的实现练习
 */

/**
 * 1. 类型推断 (Type Inference)
 * @description 从条件类型中推断类型
 * @example
 * ```ts
 * type T0 = GetReturnType<() => string>
 * // 结果: string
 * ```
 */
export type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never

/**
 * 2. 数组元素类型提取
 * @description 提取数组中元素的类型
 * @example
 * ```ts
 * type T0 = ElementType<number[]>
 * // 结果: number
 * ```
 */
export type ElementType<T> = T extends (infer E)[] ? E : never

/**
 * 3. Promise 类型提取
 * @description 提取 Promise 中包含的类型
 * @example
 * ```ts
 * type T0 = PromiseType<Promise<string>>
 * // 结果: string
 * ```
 */
export type PromiseType<T> = T extends Promise<infer P> ? P : T

/**
 * 4. 条件类型分发
 * @description 在联合类型上进行条件类型分发
 * @example
 * ```ts
 * type T0 = ToArray<string | number>
 * // 结果: string[] | number[]
 * ```
 */
export type ToArray<T> = T extends any ? T[] : never

// ========== 练习题 ==========

// 练习1: 提取函数参数类型
type GetFirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : never

// 使用示例：
type Fn1 = (name: string, age: number) => void
type FirstArg = GetFirstArg<Fn1> // string

// 练习2: 提取构造函数实例类型
type GetInstanceType<T> = T extends new (...args: any[]) => infer R ? R : never

// 使用示例：
class Example {
  constructor(public name: string) {}
}
type Instance = GetInstanceType<typeof Example> // Example

// 练习3: 条件类型过滤
type FilterString<T> = T extends string ? T : never

// 使用示例：
type Mixed = string | number | boolean
type StringOnly = FilterString<Mixed> // string

// ========== 高级练习 ==========

/**
 * 5. 递归条件类型
 * @description 递归处理嵌套类型
 */
export type DeepPromiseValueType<T> = T extends Promise<infer U>
  ? DeepPromiseValueType<U>
  : T

// 使用示例：
type NestedPromise = Promise<Promise<Promise<string>>>
type Value = DeepPromiseValueType<NestedPromise> // string

/**
 * 6. 联合类型转交叉类型
 * @description 将联合类型转换为交叉类型
 */
export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends 
  ((k: infer I) => void) ? I : never

// 使用示例：
type Union = { a: string } | { b: number }
type Intersection = UnionToIntersection<Union> // { a: string } & { b: number }

// ========== 实战应用 ==========

/**
 * 实际应用场景：API 类型处理
 */

// 1. API 响应类型提取
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

type GetResponseDataType<T> = T extends ApiResponse<infer D> ? D : never

// 使用示例：
interface UserData {
  id: number
  name: string
}

type UserResponse = ApiResponse<UserData>
type ExtractedUserData = GetResponseDataType<UserResponse> // UserData

// 2. 事件处理器类型提取
interface EventMap {
  click: MouseEvent
  keypress: KeyboardEvent
  load: Event
}

type GetEventType<K extends keyof EventMap> = EventMap[K]

// 使用示例：
type ClickEventType = GetEventType<'click'> // MouseEvent

// 3. 函数重载类型提取
export type GetOverloadedReturnType<T> = 
  T extends {
    (...args: any[]): infer R
    (...args: any[]): infer R
    (...args: any[]): infer R
  } ? R : never

// 使用示例：
interface OverloadedFn {
  (x: string): string
  (x: number): number
}
type OverloadedReturnType = GetOverloadedReturnType<OverloadedFn> // string | number

// 4. React Props 类型提取
type ReactComponent<P = any> = {
  (props: P): any
  // ... 其他 React 组件属性
}

type GetPropsType<C> = C extends ReactComponent<infer P> ? P : never

// 使用示例：
interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: ReactComponent<ButtonProps> = (props) => ({})
type ExtractedProps = GetPropsType<typeof Button> // ButtonProps

// 5. 高级类型处理
/**
 * 递归转换 Promise 为同步类型
 */
type AsyncFunction<T, U> = (input: T) => Promise<U>
type SyncFunction<T, U> = (input: T) => U

type PromiseToSync<T> = T extends AsyncFunction<infer A, infer B>
  ? SyncFunction<A, B>
  : T

// 使用示例：
type AsyncFn = AsyncFunction<string, number>
type SyncFn = PromiseToSync<AsyncFn> // (input: string) => number

/**
 * 类型验证助手
 */
type AssertEquals<T, U> = (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? true : false

// 使用示例：
type Assert1 = AssertEquals<string, string> // true
type Assert2 = AssertEquals<string, number> // false
