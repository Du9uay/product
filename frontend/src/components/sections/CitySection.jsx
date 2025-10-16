import React, { useState, useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import './ProductSection.css';

const CitySection = ({ id, type, onImageClick }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // 添加滚动动画观察器
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('fade-in')) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.style.animationPlayState = 'running';
          }
        }
      });
    }, observerOptions);

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (leftRef.current) {
      leftRef.current.style.animationPlayState = 'paused';
      observer.observe(leftRef.current);
    }
    if (rightRef.current) {
      rightRef.current.style.animationPlayState = 'paused';
      observer.observe(rightRef.current);
    }

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);

  const handleImageClick = (imageSrc) => {
    if (onImageClick) {
      onImageClick(imageSrc);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  if (type === 'careerPlanning') {
    return (
      <div id="city-career-planning" className="product-content product-content-vertical">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">免费就业规划</h3>
          <p className="product-description">
            每个城市站点的指导老师帮助学生分析大学所学专业的就业情况，并提供专业建议
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            根据SaaS系统为学生进行<span className="highlight-box">"专业点评"</span>：
          </p>
          <p className="product-subdesc" style={{marginTop: '15px'}}>
            专业的学习特性<span className="highlight-box">（学习难易程度）</span>
          </p>
          <p className="product-subdesc" style={{marginTop: '15px'}}>
            专业的就业特性<span className="highlight-box">（技能应用的广度范围/对口行业发展状况）</span>
          </p>
          <p className="product-subdesc" style={{marginTop: '15px'}}>
            指导老师根据学生所学专业、兴趣爱好等自身特点，为学生免费提供<span className="highlight-box">技能拓展、项目经验储备</span>的相关建议
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick("https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYaFAH.png")}>
              <img src="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYaFAH.png" alt="免费就业规划" />
            </div>
            <div className="product-image" onClick={() => handleImageClick("https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYLruF.png")}>
              <img src="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYLruF.png" alt="专业的就业特性" />
            </div>
            <div className="product-image" onClick={() => handleImageClick("https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYbMcy.png")}>
              <img src="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZH6FAYbMcy.png" alt="技能拓展建议" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'title') {
    return (
      <div ref={titleRef} className="city-title-content fade-in">
        <h2>城市站点</h2>
        <p>覆盖全国主要城市，就近享受优质服务<br />无论你在哪个城市，我们都能为你提供专业的就业指导</p>
      </div>
    );
  }

  if (type === 'teacher') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">指导老师</h3>
          <p className="pain-point-description">
            城市站点的指导老师给学生分析所学专业的<span className="highlight-box">未来的就业情况</span>
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>👨‍🏫</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>分析专业<br />就业情况<br />未来规划</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'review') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">老师点评</h3>
          <p className="pain-point-description">
            专业点评：
          </p>
          <p className="pain-point-subdesc">
            专业的学习特性（学习<span className="highlight-box">难易</span>程度）（2min）
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            专业的就业特性（技能应用的<span className="highlight-box">广度</span>范围/<span className="highlight-box">行业</span>发展状况）——3min
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
            SaaS系统"专业点评"
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div className="pain-point-images">
            <div className="pain-point-image" onClick={() => handleImageClick(getAssetPath('/images/专业点评.png'))}>
              <img src={getAssetPath("/images/专业点评.png")} alt="专业点评" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'selection') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">老师选班</h3>
          <p className="pain-point-description">
            学习建议：建议拓展技能，储备相关项目经验——1min
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            选班建议：<span className="highlight-box">推荐理由</span>（2min）
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
            SaaS系统"推荐理由"
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div className="pain-point-images">
            <div className="pain-point-image" onClick={() => handleImageClick(getAssetPath('/images/推荐理由.png'))}>
              <img src={getAssetPath("/images/推荐理由.png")} alt="推荐理由" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'demo') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">老师教务系统演示</h3>
          <p className="pain-point-description">
            演示：<span className="highlight-box">简历</span>/项目/<span className="highlight-box">作品</span>/面试/<span className="highlight-box">内推岗位</span>（5min）
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>🖥️</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>教务系统演示<br />简历/项目/作品<br />面试/内推岗位</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get city display name
  const getCityDisplayName = (cityKey) => {
    const cityNames = {
      beijing: '北京',
      tianjin: '天津',
      shanghai: '上海',
      nanjing: '南京',
      hangzhou: '杭州',
      guangzhou: '广州',
      shenzhen: '深圳',
      chengdu: '成都',
      xian: '西安'
    };
    return cityNames[cityKey] || cityKey;
  };

  return null;
};

export default CitySection;