import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // 等待DOM和Lenis初始化
    const timer = setTimeout(() => {

      // 1. 标题淡入动画
      gsap.utils.toArray('.section h1, .section h2, .section h3').forEach((element) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              markers: false, // 调试时可设为true
            }
          }
        );
      });

      // 2. 段落文字动画
      gsap.utils.toArray('.section p').forEach((element) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });

      // 3. 痛点卡片动画
      gsap.utils.toArray('.pain-point-content').forEach((element, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          }
        });

        tl.fromTo(element.querySelector('.pain-point-left'),
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1 }
        )
        .fromTo(element.querySelector('.pain-point-right'),
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1 },
          '-=0.5'
        );
      });

      // 4. 视差背景效果
      gsap.utils.toArray('.section').forEach((section) => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
          gsap.to(bg, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });

      // 5. 导航高亮同步
      const sections = gsap.utils.toArray('.section');
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              // 触发导航更新
              const event = new CustomEvent('section-active', {
                detail: { index }
              });
              window.dispatchEvent(event);
            }
          }
        });
      });

      // 6. 进度指示器
      gsap.to('.progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

    }, 500); // 延迟确保Lenis已初始化

    return () => {
      clearTimeout(timer);
      // 清理所有ScrollTrigger实例
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

// 导出单独的动画函数
export const animateHero = () => {
  const tl = gsap.timeline();
  tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power3.out' })
    .from('.hero-subtitle', { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5')
    .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3');
  return tl;
};

export const animateOnScroll = (element, options = {}) => {
  const defaults = {
    opacity: 0,
    y: 50,
    duration: 1,
    start: 'top 80%',
    end: 'top 50%',
    scrub: 1,
  };

  const config = { ...defaults, ...options };
  const { start, end, scrub, ...animProps } = config;

  gsap.fromTo(element, animProps, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotation: 0,
    duration: config.duration,
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    }
  });
};

export default useScrollAnimations;