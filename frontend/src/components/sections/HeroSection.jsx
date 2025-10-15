import React, { useEffect, useRef, useState } from 'react';
import LaserFlow from '../effects/LaserFlow';

const HeroSection = () => {
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 添加入场动画
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      {/* 光束效果 - 响应式调整位置 */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          right: '10%',  // PC端向左移动一些，不要太靠边
          top: 0,
          width: '35%',  // 缩小宽度，更集中
          height: '100%',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 90%)'
        }}>
          <LaserFlow
            color="#8B5CF6"
            horizontalBeamOffset={0.0}  // 居中显示
            verticalBeamOffset={-0.2}   // 稍微上移
            horizontalSizing={0.6}       // 减小水平尺寸
            verticalSizing={2.5}         // 减小垂直尺寸
            wispDensity={1.2}
            wispSpeed={15.0}
            wispIntensity={6.0}
            flowSpeed={0.3}
            flowStrength={0.3}
            fogIntensity={0.5}
            fogScale={0.3}
            fogFallSpeed={0.5}
            decay={1.2}
            falloffStart={1.3}
          />
        </div>
      )}
      {/* 移动端光束效果 - 垂直光束 */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 0,
          width: '100%',
          height: '80%',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 85%)'
        }}>
          <LaserFlow
            color="#8B5CF6"
            horizontalBeamOffset={0.0}
            verticalBeamOffset={0.0}
            horizontalSizing={0.5}
            verticalSizing={2.5}
            wispDensity={1.2}
            wispSpeed={15.0}
            wispIntensity={6.0}
            flowSpeed={0.35}
            flowStrength={0.35}
            fogIntensity={0.5}
            fogScale={0.3}
            fogFallSpeed={0.5}
            decay={1.3}
            falloffStart={1.5}
          />
        </div>
      )}
      <div className="hero-content fade-in" ref={contentRef}>
        <h1 className="hero-title">多多畅职</h1>
        <p className="hero-subtitle">找工作，谁发工资，谁说了算</p>
        <div className="hero-tags">
          <div className="tag">📺 央视报道</div>
          <div className="tag">🤝 2700+企业合作</div>
          <div className="tag">⚡ 就业快人一步</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;