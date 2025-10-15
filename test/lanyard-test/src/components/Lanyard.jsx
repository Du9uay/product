import React, { useState, useEffect } from 'react';
import './Lanyard.css';

const Lanyard = ({ isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`lanyard-container ${isAnimating ? 'animate' : ''}`}>
      <div className="lanyard-rope">
        <div className="rope-line"></div>
        <div className="rope-clip"></div>
      </div>

      <div className="lanyard-card">
        <div className="card-header">
          <div className="card-logo">学生代理</div>
          <div className="card-badge">AGENT</div>
        </div>

        <div className="card-photo">
          <div className="photo-placeholder">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="35" r="18" fill="rgba(139, 92, 246, 0.3)" />
              <path d="M20 80 Q20 60 50 60 Q80 60 80 80" fill="rgba(139, 92, 246, 0.3)" />
            </svg>
          </div>
        </div>

        <div className="card-info">
          <h3 className="card-name">成为校园合伙人</h3>
          <p className="card-title">改变自己，帮助他人</p>
        </div>

        <div className="card-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <span className="benefit-text">丰厚佣金</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎓</span>
            <span className="benefit-text">职场经验</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🤝</span>
            <span className="benefit-text">人脉资源</span>
          </div>
        </div>

        <div className="card-footer">
          <button className="apply-button">立即申请</button>
        </div>

        <div className="card-barcode">
          <div className="barcode-lines">
            {[...Array(20)].map((_, i) => (
              <span key={i} style={{ width: `${Math.random() * 2 + 1}px` }}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lanyard;