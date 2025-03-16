# TypeScript 学习指南

这个仓库包含了一系列 TypeScript 学习示例和最佳实践，帮助你快速掌握 TypeScript。

## 项目结构

```
src/
├── examples/
│   ├── 1-basic-types.ts     # 基础类型示例
│   ├── 2-interfaces-types.ts # 接口和类型示例
│   ├── 3-generics.ts        # 泛型示例
│   ├── 4-decorators.ts      # 装饰器示例
│   └── interface-vs-type.ts  # Interface和Type的区别及使用场景
└── index.ts                  # 入口文件
```

## 包含的主题

1. 基础类型
   - 数字、字符串、布尔值
   - 数组和元组
   - 枚举
   - Any 和 Unknown
   - 联合类型
   - 类型断言

2. 接口和类型
   - 接口定义和实现
   - 类型别名
   - 可选属性
   - 只读属性
   - 函数类型

3. 泛型
   - 泛型函数
   - 泛型类
   - 泛型约束
   - 泛型工具类型

4. 装饰器
   - 类装饰器
   - 方法装饰器
   - 属性装饰器
   - 参数装饰器

5. Interface vs Type 详解
   - 区别对比
   - 使用场景
   - 最佳实践

## 如何使用

1. 克隆仓库：
```bash
git clone https://github.com/weiAX95/typescript-learning.git
cd typescript-learning
```

2. 安装依赖：
```bash
npm install
```

3. 运行示例：
```bash
npm start
```

## 学习建议

1. 按顺序学习示例代码，从基础类型开始
2. 每个文件都包含详细的注释说明
3. 尝试修改示例代码，观察类型检查的结果
4. 实践每个概念，加深理解

## 特别说明

- 重点关注 `interface-vs-type.ts`，这里详细介绍了 Interface 和 Type 的区别及使用场景
- 示例代码都是实用性的，贴近实际开发场景
- 包含了 TypeScript 的核心概念和最佳实践

## 贡献

欢迎提交 Issue 和 Pull Request 来完善示例代码和文档。
