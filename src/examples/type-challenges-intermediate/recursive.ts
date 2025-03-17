/**
 * TypeScript 类型体操 - 递归类型实现
 * 本模块包含递归类型的实现练习
 */

/**
 * 1. 深度 Readonly 实现
 * @description 将对象的所有属性及其嵌套属性设为只读
 * @example
 * ```ts
 * type T0 = DeepReadonly<{ a: { b: string } }>
 * // 结果: { readonly a: { readonly b: string } }
 * ```
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends Function 
      ? T[P] 
      : DeepReadonly<T[P]>
    : T[P]
}

/**
 * 2. 深度 Partial 实现
 * @description 将对象的所有属性及其嵌套属性设为可选
 * @example
 * ```ts
 * type T0 = DeepPartial<{ a: { b: string } }>
 * // 结果: { a?: { b?: string } }
 * ```
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepPartial<T[P]>
    : T[P]
}

/**
 * 3. 深度 Required 实现
 * @description 将对象的所有属性及其嵌套属性设为必选
 * @example
 * ```ts
 * type T0 = DeepRequired<{ a?: { b?: string } }>
 * // 结果: { a: { b: string } }
 * ```
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepRequired<T[P]>
    : T[P]
}

/**
 * 4. 深度 Record 实现
 * @description 创建具有指定键和值类型的嵌套记录类型
 * @example
 * ```ts
 * type T0 = DeepRecord<'a' | 'b', { x: string }>
 * // 结果: { a: { x: string }, b: { x: string } }
 * ```
 */
export type DeepRecord<K extends keyof any, T> = {
  [P in K]: T extends object
    ? T extends Function
      ? T
      : DeepRecord<keyof T, T[keyof T]>
    : T
}

// ========== 练习题 ==========

// 练习1: 实现深度冻结类型
interface Config {
  api: {
    endpoint: string
    timeout: number
    retries: {
      count: number
      delay: number
    }
  }
  features: {
    auth: boolean
    cache: {
      enabled: boolean
      duration: number
    }
  }
}

type FrozenConfig = DeepReadonly<Config>
// 使用示例：
const config: FrozenConfig = {
  api: {
    endpoint: 'https://api.example.com',
    timeout: 5000,
    retries: {
      count: 3,
      delay: 1000
    }
  },
  features: {
    auth: true,
    cache: {
      enabled: true,
      duration: 3600
    }
  }
}
// config.api.endpoint = 'new-url' // Error: 无法修改只读属性

// 练习2: 实现深度可选配置
interface AppSettings {
  theme: {
    primary: string
    secondary: string
    fonts: {
      main: string
      fallback: string
    }
  }
  notifications: {
    email: boolean
    push: {
      enabled: boolean
      frequency: string
    }
  }
}

type OptionalSettings = DeepPartial<AppSettings>
// 使用示例：
const partialSettings: OptionalSettings = {
  theme: {
    primary: '#000'
    // 其他属性都是可选的
  }
}

// 练习3: 嵌套对象合并
export type DeepMerge<T, U> = {
  [P in keyof T | keyof U]: P extends keyof T
    ? P extends keyof U
      ? T[P] extends object
        ? U[P] extends object
          ? DeepMerge<T[P], U[P]>
          : U[P]
        : U[P]
      : T[P]
    : P extends keyof U
    ? U[P]
    : never
}

interface DefaultConfig {
  api: {
    url: string
    version: string
  }
  logging: {
    level: 'info' | 'warn' | 'error'
  }
}

interface UserConfig {
  api: {
    url: string
    timeout: number
  }
  logging: {
    path: string
  }
}

type MergedConfig = DeepMerge<DefaultConfig, UserConfig>
// 结果: {
//   api: {
//     url: string      // 来自 UserConfig
//     version: string  // 来自 DefaultConfig
//     timeout: number  // 来自 UserConfig
//   }
//   logging: {
//     level: 'info' | 'warn' | 'error'  // 来自 DefaultConfig
//     path: string     // 来自 UserConfig
//   }
// }

// ========== 实战应用 ==========

/**
 * 实际应用场景：状态管理
 */

// 1. 状态定义
interface AppState {
  user: {
    profile: {
      name: string
      email: string
      preferences: {
        theme: 'light' | 'dark'
        notifications: boolean
      }
    }
    settings: {
      language: string
      timezone: string
    }
  }
  ui: {
    sidebar: {
      collapsed: boolean
      width: number
    }
    modals: {
      [key: string]: {
        visible: boolean
        data?: unknown
      }
    }
  }
}

// 2. 只读状态
type ReadonlyState = DeepReadonly<AppState>

// 3. 部分状态更新
type PartialState = DeepPartial<AppState>

// 使用示例：
class Store {
  private state: ReadonlyState

  constructor() {
    this.state = {
      user: {
        profile: {
          name: '',
          email: '',
          preferences: {
            theme: 'light',
            notifications: false
          }
        },
        settings: {
          language: 'en',
          timezone: 'UTC'
        }
      },
      ui: {
        sidebar: {
          collapsed: false,
          width: 240
        },
        modals: {}
      }
    } as ReadonlyState
  }

  // 更新状态
  update(newState: PartialState) {
    // 实现状态更新逻辑
  }

  // 获取状态
  getState(): ReadonlyState {
    return this.state
  }
}

// 4. 配置合并
type BaseConfig = {
  api: {
    url: string
    timeout: number
  }
  features: {
    auth: boolean
  }
}

type EnvironmentConfig = DeepPartial<BaseConfig>

// 合并配置
function mergeConfigs<T extends object, U extends DeepPartial<T>>(
  base: T,
  override: U
): DeepMerge<T, U> {
  // 实现配置合并逻辑
  return {} as DeepMerge<T, U>
}
