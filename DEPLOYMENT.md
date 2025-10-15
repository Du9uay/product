# GitHub Pages 部署指南

本项目已配置自动部署到 GitHub Pages。

## 自动部署

当您推送代码到 `main` 分支时,GitHub Actions 会自动:
1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

## 手动启用 GitHub Pages

首次部署需要在 GitHub 仓库中启用 GitHub Pages:

### 步骤 1: 进入仓库设置
1. 访问 https://github.com/Du9uay/product
2. 点击 `Settings` (设置)
3. 在左侧菜单找到 `Pages`

### 步骤 2: 配置部署源
1. 在 "Build and deployment" 部分
2. **Source** (来源) 选择: `GitHub Actions`
3. 保存设置

### 步骤 3: 触发部署
推送代码后,GitHub Actions 会自动运行部署流程。

您也可以手动触发:
1. 进入仓库的 `Actions` 标签页
2. 选择 `Deploy to GitHub Pages` 工作流
3. 点击 `Run workflow` 按钮
4. 选择 `main` 分支
5. 点击绿色的 `Run workflow` 按钮

### 步骤 4: 查看部署状态
1. 在 `Actions` 标签页可以看到部署进度
2. 部署成功后,访问: https://du9uay.github.io/product/

## 访问地址

部署成功后,您的网站将在以下地址访问:
```
https://du9uay.github.io/product/
```

## 本地开发

```bash
# 进入 frontend 目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 注意事项

### 1. 基础路径配置
项目已在 `vite.config.js` 中配置了 `base: '/product/'`,这是 GitHub Pages 的子路径。

如果您的仓库名称不是 `product`,需要修改:
```javascript
// frontend/vite.config.js
export default defineConfig({
  base: '/你的仓库名/',  // 修改为实际仓库名
  // ...
})
```

### 2. 大文件处理
以下大文件已通过 `.gitignore` 排除,不会上传到 GitHub:
- 央视关注视频 (57MB)
- PPT 文件 (330MB)

这些文件保留在本地,不影响项目正常使用。

### 3. 自定义域名 (可选)
如果需要使用自定义域名:
1. 在 `frontend/public/` 目录创建 `CNAME` 文件
2. 文件内容为您的域名,如: `www.example.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `du9uay.github.io`

## 故障排查

### 部署失败
1. 查看 Actions 标签页的错误日志
2. 确认 `frontend/package.json` 中的构建脚本正确
3. 检查 Node.js 版本兼容性

### 页面空白
1. 确认 `vite.config.js` 中的 `base` 路径正确
2. 检查浏览器控制台的错误信息
3. 确认静态资源路径正确

### 样式丢失
确保所有资源路径使用相对路径或正确的绝对路径。

## 更新部署

每次推送到 main 分支都会自动触发部署:

```bash
git add .
git commit -m "更新内容"
git push github main
```

部署通常需要 2-5 分钟完成。
