# 项目优化文档

## 1. 构建优化

### 1.1 使用 SWC 替代 Babel
- 使用 `@vitejs/plugin-react-swc` 替代默认的 React 插件
- 支持 TypeScript 装饰器语法
- 构建速度提升 2-3 倍

### 1.2 代码分割
- 将 React 相关库打包到单独的 vendor chunk
- 将 Prism.js 打包到单独的 prism chunk
- 减少主包体积，提升加载速度

## 2. 性能优化

### 2.1 CSS 优化
- 使用 `cssnano` 压缩 CSS
- 启用 CSS 代码分割
- 自动添加浏览器前缀

### 2.2 Tailwind 优化
- 添加 `@tailwindcss/forms` 和 `@tailwindcss/typography` 插件
- 启用实验性优化选项
- 配置未来兼容性选项

## 3. 开发体验优化

### 3.1 开发服务器配置
- 自动打开浏览器
- 端口设置为 3000
- 优化依赖预构建

### 3.2 错误处理
- 隐藏 ES 模块中的 undefined 错误
- 优化构建日志输出

## 4. 生产环境优化

### 4.1 代码压缩
- 使用 Terser 进行代码压缩
- 自动移除 console 和 debugger
- 生成 sourcemap 便于调试

### 4.2 缓存优化
- 配置浏览器兼容性
- 优化 Rollup 输出配置
- 启用 CSS 代码分割

## 5. 部署优化

### 5.1 基础路径配置
- 配置 `base` 路径为 `/typescript-learning/`
- 支持 GitHub Pages 部署
- 自动生成部署脚本

## 6. 未来优化方向

- 添加 PWA 支持
- 实现图片优化
- 添加性能监控
- 实现按需加载
