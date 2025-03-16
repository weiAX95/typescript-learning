# 部署指南

## 在 GitHub Pages 上部署

1. 访问仓库设置：
   - 打开 https://github.com/weiAX95/typescript-learning/settings
   - 点击左侧菜单中的 "Pages"

2. 配置 GitHub Pages：
   - 在 "Source" 部分
   - 选择 "Deploy from a branch"
   - Branch: 选择 "main"
   - Folder: 选择 "/docs"
   - 点击 "Save"

3. 等待部署：
   - GitHub 会自动开始部署过程
   - 几分钟后，您的网站将在以下地址可用：
     https://weiax95.github.io/typescript-learning/

## 如何更新内容

1. 所有更改都应该在 `docs` 目录中进行
2. 提交并推送更改到 main 分支：
```bash
git add docs
git commit -m "更新网站内容"
git push origin main
```
3. GitHub Pages 会自动重新部署更新后的内容

## 本地预览

您仍然可以使用本地服务器预览更改：
```bash
npm start
```

访问 http://localhost:3000 查看效果。
