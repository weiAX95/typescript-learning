/**
 * TypeScript 类型体操 - 基础提取类型
 * 本模块包含基础的类型提取工具实现
 */

/** 
 * 1. 实现 Pick 类型工具
 * @description 从类型T中选择一组属性K来构造新类型
 * @template T 源类型
 * @template K 要选择的属性集合
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 * 
 * type TodoPreview = MyPick<Todo, 'title' | 'completed'>
 * // 结果: { title: string; completed: boolean; }
 * ```
 */
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * 2. 实现 Omit 类型工具
 * @description 从类型T中移除一组属性K来构造新类型
 * @template T 源类型
 * @template K 要移除的属性集合
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 * 
 * type TodoWithoutDescription = MyOmit<Todo, 'description'>
 * // 结果: { title: string; completed: boolean; }
 * ```
 */
export type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

/**
 * 3. 实现 Exclude 类型工具
 * @description 从类型T中排除可分配给类型U的属性
 * @template T 源类型
 * @template U 要排除的类型
 * @example
 * ```ts
 * type T0 = MyExclude<"a" | "b" | "c", "a">
 * // 结果: "b" | "c"
 * ```
 */
export type MyExclude<T, U> = T extends U ? never : T

/**
 * 4. 实现 Extract 类型工具
 * @description 从类型T中提取可分配给类型U的属性
 * @template T 源类型
 * @template U 要提取的类型
 * @example
 * ```ts
 * type T0 = MyExtract<"a" | "b" | "c", "a" | "f">
 * // 结果: "a"
 * ```
 */
export type MyExtract<T, U> = T extends U ? T : never

// ========== 练习题 ==========

// 练习1: 实现部分属性选择
interface User {
  id: number
  name: string
  email: string
  age: number
  address: string
}

// 目标：仅选择用户标识信息
type UserIdentity = MyPick<User, 'id' | 'name'>

// 练习2: 实现属性过滤
interface ApiResponse {
  data: unknown
  status: number
  message: string
  timestamp: number
  debug: boolean
}

// 目标：移除内部使用的属性
type ClientResponse = MyOmit<ApiResponse, 'debug' | 'timestamp'>

// 练习3: 联合类型过滤
type Status = 'draft' | 'published' | 'archived' | 'deleted'

// 目标：获取活跃状态
type ActiveStatus = MyExclude<Status, 'deleted' | 'archived'>

// 练习4: 联合类型提取
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

// 目标：提取修改类方法
type ModifyMethods = MyExtract<HttpMethod, 'POST' | 'PUT' | 'PATCH'>

// ========== 高级练习 ==========

/**
 * 5. 实现条件属性选择
 * @description 根据属性值类型选择属性
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

interface Mixed {
  name: string
  count: number
  isActive: boolean
  data: object
}

// 目标：选择所有字符串类型的属性
type StringProps = PickByType<Mixed, string>
// 结果: { name: string }

// ========== 实战应用 ==========

/**
 * 实际应用场景：表单数据处理
 */
interface FormData {
  username: string
  password: string
  email: string
  age: number
  newsletter: boolean
  preferences: {
    theme: string
    notifications: boolean
  }
}

// 1. 提取必填字段
type RequiredFields = MyPick<FormData, 'username' | 'password' | 'email'>

// 2. 移除敏感信息
type SafeFormData = MyOmit<FormData, 'password'>

// 3. 提取特定类型的字段
type BooleanFields = PickByType<FormData, boolean>

// 使用示例：
const processForm = (form: RequiredFields) => {
  // 处理必填字段
}

const displayData = (data: SafeFormData) => {
  // 显示非敏感信息
}

const toggleSettings = (settings: BooleanFields) => {
  // 处理布尔值设置
}
