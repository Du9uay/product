# Lanyard React Component

一个基于React Three Fiber的3D交互式挂绳组件。

## 特性

- 🎮 可拖拽的3D卡片
- 🎨 逼真的物理效果
- 📱 响应式设计
- ⚡ 性能优化

## 安装

```bash
npm install
```

## 运行

```bash
npm run dev
```

然后在浏览器中打开 http://localhost:3000

## 使用方法

```jsx
import Lanyard from './components/Lanyard'

function App() {
  return (
    <Lanyard
      position={[0, 0, 20]}     // 相机位置
      gravity={[0, -40, 0]}     // 重力设置
      fov={20}                  // 视野角度
      transparent={true}        // 背景透明
    />
  )
}
```

## 重要提示

### 资源文件

请确保在 `src/assets/` 目录下有以下文件：

1. **card.glb** - 卡片的3D模型文件
   - 可以从原始仓库下载
   - 或使用 https://modelviewer.dev/editor/ 创建自己的模型

2. **lanyard.png** - 挂绳的纹理图片
   - 任何PNG图片都可以作为纹理
   - 推荐尺寸：512x512 或 1024x1024

### 当前占位文件

项目中包含了占位文件，但要看到完整效果，需要替换为真实的3D模型和纹理文件。

## 项目结构

```
lanyard-react/
├── src/
│   ├── components/
│   │   └── Lanyard.jsx      # 主要组件
│   ├── assets/
│   │   ├── card.glb         # 3D模型（需替换）
│   │   └── lanyard.png      # 纹理图片
│   ├── App.jsx              # 应用入口
│   ├── App.css              # 应用样式
│   ├── main.jsx             # React入口
│   └── index.css            # 全局样式
├── index.html               # HTML入口
├── vite.config.js           # Vite配置
└── package.json             # 项目配置
```

## 技术栈

- React
- Three.js
- React Three Fiber
- React Three Drei
- React Three Rapier (物理引擎)
- Vite

## 许可

MIT