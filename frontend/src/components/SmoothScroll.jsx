import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    // 检测是否为移动端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    // 如果是移动端，不启用Lenis平滑滚动
    if (isMobile) {
      console.log('移动端检测：禁用Lenis平滑滚动，使用原生滚动');

      // 为移动端提供简单的滚动方法
      window.lenis = null;
      window.scrollToSection = (target, options = {}) => {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      };

      return () => {
        delete window.lenis;
        delete window.scrollToSection;
      };
    }

    // PC端：创建Lenis实例
    console.log('PC端检测：启用Lenis平滑滚动');
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