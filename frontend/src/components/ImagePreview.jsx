import React, { useEffect } from 'react';
import './ImagePreview.css';

function ImagePreview({ src, alt, isOpen, onClose }) {
  // 处理ESC键关闭
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div className="image-preview-container">
        <button className="image-preview-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img
          src={src}
          alt={alt}
          className="image-preview-img"
          onClick={(e) => e.stopPropagation()} // 防止点击图片时关闭
        />
      </div>
    </div>
  );
}

export default ImagePreview;