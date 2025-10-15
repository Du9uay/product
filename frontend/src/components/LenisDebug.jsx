import { useEffect } from 'react';

function LenisDebug() {
  useEffect(() => {
    // 延迟执行以确保Lenis已初始化
    const timer = setTimeout(() => {
      if (window.lenis) {
        console.log('✅ Lenis已初始化');
        console.log('Lenis实例:', window.lenis);

        // 监听滚动事件
        window.lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
          console.log('Lenis滚动数据:', {
            scroll: Math.round(scroll),
            limit: Math.round(limit),
            velocity: velocity.toFixed(2),
            direction,
            progress: (progress * 100).toFixed(1) + '%'
          });
        });

        // 测试滚动功能
        console.log('测试：3秒后自动滚动到500px');
        setTimeout(() => {
          window.lenis.scrollTo(500, { duration: 2 });
        }, 3000);
      } else {
        console.error('❌ Lenis未初始化');
        console.log('window对象:', window);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

export default LenisDebug;