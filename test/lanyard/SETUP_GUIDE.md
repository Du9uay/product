# Lanyard React 组件设置指南

## 🚀 快速开始

项目已经配置完成，运行以下命令启动：

```bash
npm run dev
```

然后打开浏览器访问 http://localhost:3001

## 📦 当前功能

应用包含三个场景，可通过左上角按钮切换：

1. **测试场景** - 基础3D场景，验证Three.js是否正常工作
2. **简单挂绳** - 简化版的挂绳效果，使用基础几何体
3. **完整版本** - 需要真实的GLB文件（当前已禁用）

## 🎯 查看效果

打开浏览器后，你应该能看到：
- 左上角的场景切换按钮
- 右下角的诊断信息面板（显示WebGL支持情况）
- 3D场景（可交互的卡片或立方体）

## ⚠️ 注意事项

### 如果页面空白

1. **检查浏览器控制台** - 按F12查看是否有错误
2. **确认WebGL支持** - 右下角诊断面板会显示WebGL状态
3. **尝试其他浏览器** - Chrome/Edge通常支持最好

### 启用完整版本

完整版本需要真实的3D资源文件：

1. 获取 `card.glb` 文件（3D卡片模型）
2. 获取 `lanyard.png` 文件（挂绳纹理）
3. 将文件放入 `src/assets/` 目录
4. 修改 `src/App.jsx`，取消注释完整版本的代码

## 🛠 故障排除

### 端口被占用
如果3001端口被占用，Vite会自动使用下一个可用端口。

### 依赖问题
如果遇到依赖错误，运行：
```bash
npm install
```

### 清除缓存
如果更改没有生效：
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 文件结构

```
src/
├── components/
│   ├── Lanyard.jsx          # 完整版组件（需要GLB）
│   ├── SimpleLanyard.jsx    # 简化版组件
│   ├── TestScene.jsx        # 测试场景
│   └── DiagnosticComponent.jsx # 诊断工具
├── assets/
│   ├── card.glb            # 需要替换
│   └── lanyard.png         # 纹理文件
└── App.jsx                  # 主应用

## 📚 技术栈

- React 19
- Three.js
- React Three Fiber
- React Three Drei
- Vite

## 🔧 自定义

### 修改卡片颜色
编辑 `SimpleLanyard.jsx`：
```jsx
color={hovered ? 'hotpink' : '#764ba2'}  // 修改这里
```

### 调整相机位置
编辑 `SimpleLanyard.jsx`：
```jsx
camera={{ position: [0, 0, 5], fov: 45 }}  // 修改position值
```

### 改变背景
编辑 `SimpleLanyard.jsx` 或 `App.css` 中的渐变色。

## 💡 提示

- 点击3D卡片可以缩放
- 鼠标悬停会改变颜色
- 可以使用鼠标拖动旋转视角（OrbitControls）

---

如需更多帮助，请查看 README.md 文件。