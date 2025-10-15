/**
 * 获取正确的资源路径
 * 在 GitHub Pages 部署时会自动添加 base 路径前缀
 *
 * @param {string} path - 资源相对路径,如 '/images/pic.png'
 * @returns {string} - 完整的资源路径
 */
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  // 移除路径开头的 /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // 移除 base 结尾的 /
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}/${cleanPath}`;
};
