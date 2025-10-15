import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import './ConfusionSection.css';

const ConfusionSection = ({ title, subtitle, description }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    // 添加滚动动画
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    if (contentRef.current) {
      contentRef.current.style.animationPlayState = 'paused';
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div className="confusion-title-content fade-in" ref={contentRef}>
      <h2>{title}</h2>
      <div className="confusion-description-box">
        <p className="confusion-main-text">
          几乎每一个临近毕业的专科生都不知道就业的出路在哪里
        </p>
        <p className="confusion-support-text">
          我们理解你的迷茫，更知道如何提前帮在校学生破局。
        </p>
        <p className="confusion-warning-text">
          毕业后孤孤单单的被抛向市场，父母责怪、朋友嫌弃，<br/>
          不要在没法挽回的时候尝遍个中滋味。
        </p>
      </div>
    </div>
  );
};

export default ConfusionSection;