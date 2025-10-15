/**
 * 获取正确的资源路径
 * 在 GitHub Pages 部署时会自动添加 base 路径前缀
 *
 * 注意: Vite 会在构建时将 import.meta.env.BASE_URL 替换为实际的 base 值
 *
 * @param {string} path - 资源相对路径,如 '/images/pic.png'
 * @returns {string} - 完整的资源路径
 */
export const getAssetPath = (path) => {
  // Vite 在构建时会将 import.meta.env.BASE_URL 替换为配置的 base 值
  const base = import.meta.env.BASE_URL;

  // 移除路径开头的 /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // 如果 base 已经是 '/',直接返回原路径
  if (base === '/') {
    return '/' + cleanPath;
  }

  // 否则拼接 base 和路径
  return base + cleanPath;
};
