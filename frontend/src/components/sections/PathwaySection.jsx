import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PathwaySection.css';

gsap.registerPlugin(ScrollTrigger);

function PathwaySection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    // 检测是否为移动端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    let ctx = gsap.context(() => {
      // 移动端：禁用ScrollTrigger动画，直接显示内容
      if (isMobile) {
        if (leftRef.current) {
          gsap.set(leftRef.current, { x: 0, opacity: 1 });
        }
        if (rightRef.current) {
          gsap.set(rightRef.current, { x: 0, opacity: 1 });
        }
        if (centerRef.current) {
          gsap.set(centerRef.current, { y: 0, opacity: 1 });
        }
      } else {
        // PC端：启用ScrollTrigger动画
        // 左侧动画
        if (leftRef.current) {
          gsap.fromTo(leftRef.current,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: leftRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // 右侧动画
        if (rightRef.current) {
          gsap.fromTo(rightRef.current,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rightRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // 中间内容动画
        if (centerRef.current) {
          gsap.fromTo(centerRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: centerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pathway-section">
      <div className="pathway-content">
        {/* 左侧 - 升本 */}
        <div className="pathway-side pathway-left" ref={leftRef}>
          <div className="pathway-label">升本</div>
          <div className="pathway-icon">📚</div>
        </div>

        {/* 中间内容 */}
        <div className="pathway-center" ref={centerRef}>
          <h2 className="pathway-title">出路</h2>
          <div className="pathway-divider">
            <span className="vs-text"></span>
          </div>
          <div className="pathway-description">
            <p className="pathway-main-text">
              大专生的出路就两条——<span className="highlight-text">升本</span>和<span className="highlight-text">就业</span>
            </p>
            <p className="pathway-sub-text">
              专科生的出路只有拿到更高的学历（至少公办本科，民办本科社会不承认），或者具备就业的能力，才能在毕业的时候不被社会抛弃。
            </p>
          </div>
        </div>

        {/* 右侧 - 就业 */}
        <div className="pathway-side pathway-right" ref={rightRef}>
          <div className="pathway-label">就业</div>
          <div className="pathway-icon">💼</div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="pathway-separator"></div>
    </div>
  );
}

export default PathwaySection;
