# 如何在网页中嵌入微信视频号视频

## 方法1：使用iframe嵌入（推荐）

### 步骤：

1. **获取微信视频号的分享链接**
   - 打开微信视频号
   - 找到你想要嵌入的视频
   - 点击"分享"按钮
   - 选择"复制链接"
   - 链接格式通常为：`https://channels.weixin.qq.com/...`

2. **替换代码中的URL**
   - 在 `ProductSection.jsx` 第87行
   - 将 `YOUR_VIDEO_URL_HERE` 替换为你复制的视频链接

### 示例代码已添加：
```jsx
<iframe
  src="YOUR_VIDEO_URL_HERE"  // 替换为你的视频链接
  style={{width: '100%', height: '100%', border: 'none'}}
  allowFullScreen
  frameBorder="0"
  scrolling="no"
  title="产品介绍视频"
/>
```

## 方法2：使用HTML5 video标签（本地视频）

如果你想使用本地视频文件：

1. **准备视频文件**
   - 将视频文件（如 `intro.mp4`）放到 `frontend/public/videos/` 目录

2. **修改代码**
   - 将iframe替换为：
   ```jsx
   <video
     controls
     autoPlay={false}
     style={{width: '100%', height: '100%', objectFit: 'cover'}}
     poster="/images/产品介绍.png"  // 视频封面
   >
     <source src="/videos/intro.mp4" type="video/mp4" />
     您的浏览器不支持视频播放
   </video>
   ```

## 方法3：使用视频封面+点击播放

创建一个点击图片后播放视频的交互：

```jsx
const [isPlaying, setIsPlaying] = useState(false);

{!isPlaying ? (
  <div
    className="product-image video-cover"
    onClick={() => setIsPlaying(true)}
    style={{cursor: 'pointer', position: 'relative'}}
  >
    <img src="/images/产品介绍.png" alt="产品介绍" />
    <div className="play-button">▶</div>
  </div>
) : (
  <iframe
    src="YOUR_VIDEO_URL"
    style={{width: '100%', height: '100%'}}
    allowFullScreen
  />
)}
```

## 注意事项

1. **跨域问题**
   - 微信视频号可能有跨域限制
   - 如果iframe无法加载，可能需要使用方法2或3

2. **移动端兼容**
   - 确保视频在移动设备上也能正常播放
   - 考虑添加自适应高度

3. **性能优化**
   - 使用懒加载（lazy loading）
   - 视频不要设置自动播放（autoplay）以节省流量

## 当前状态

✅ 已在 `ProductSection.jsx` 中添加视频嵌入代码
✅ 保留了原图片作为备用方案（已注释）
⚠️ 需要替换 `YOUR_VIDEO_URL_HERE` 为实际视频链接

## 下一步

请提供你的微信视频号链接，我可以帮你直接替换到代码中。
