import React from 'react';
import './SectionWrapper.css';

const SectionWrapper = ({
  title,           // 一级标题
  subtitle,        // 副标题（可选）
  theme = 'dark',  // 主题：dark/light/gradient
  className = '',  // 额外的类名
  children
}) => {
  return (
    <section className={`section-wrapper theme-${theme} ${className}`}>
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section-body">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;