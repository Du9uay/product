# UI设计指令配置

## 设计工作流程
1. **布局设计**: ASCII线框图格式展示UI布局
2. **主题设计**: 使用generateTheme工具生成颜色、字体、间距等
3. **动画设计**: 定义过渡效果和微交互
4. **HTML生成**: 创建单页HTML文件

## 设计规范
### 样式要求
- 默认使用flowbite库
- 避免使用靛蓝或蓝色（除非用户明确要求）
- 必须生成响应式设计
- 使用Google字体
- CSS属性添加!important防止被覆盖

### 支持的主题风格
1. **Neo-brutalism风格**: 90年代网页设计风格
2. **Modern dark mode风格**: 类似Vercel、Linear的现代暗色主题

### 文件命名规范
- 设计文件保存在: .superdesign/design_iterations/
- 命名格式: {design_name}_{n}.html
- 迭代命名: {current_file_name}_{n}.html

### 图标和图片
- 图片使用unsplash或placehold.co等公共源
- 图标使用lucide icons或其他公共图标库

### 脚本导入
- Tailwind: `<script src="https://cdn.tailwindcss.com"></script>`
- Flowbite: `<script src="https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.js"></script>`

## 重要规则
1. 必须使用工具调用，不能只输出文本
2. 按步骤确认：布局→主题→动画→生成
3. 文件必须保存在.superdesign/design_iterations/文件夹