import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    // 创建Lenis实例
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // 在requestAnimationFrame循环中更新lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 添加全局方法
    window.lenis = lenis;
    window.scrollToSection = (target, options = {}) => {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
      });
    };

    // 调试：监听滚动事件
    lenis.on('scroll', ({ scroll }) => {
      // console.log('Lenis scroll:', scroll);
    });

    // 清理函数
    return () => {
      lenis.destroy();
      delete window.lenis;
      delete window.scrollToSection;
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;