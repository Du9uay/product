import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import './ProductSection.css';

const FreshmanSection = ({ id, type, onImageClick }) => {
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

  if (type === 'title') {
    return (
      <div ref={titleRef} className="freshman-title-content fade-in">
        <h2>给大一推广介绍</h2>
      </div>
    );
  }

  if (type === 'situation') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">大专生尴尬处境</h3>
          <p className="pain-point-description">
            比技能吧，比不过技校
          </p>
          <p className="pain-point-subdesc">
            他们早就开始实操学技术了，我们还在学语数外
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            比学历吧，比不过985/211一流本科，他们可以去考公考编考研等，未来路径也比大专多
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            而大专生能走的路只有一条，那就是再考本科，那万一考不上呢？苏州每年<span className="highlight-box">专升本的录取率只有15％</span>
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>大专生能走的路只有一条：<br />考本科<br /><br />万一考不上呢？</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'degree') {
    return (
      <div id={id} className="product-content">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">转本文凭也找不到好工作</h3>
          <p className="product-description">
            <span className="highlight-box">专升本的学历没有任何含金量</span>
          </p>
          <p className="product-subdesc">
            社会上承认的具有含金量的学历是985/211的本科学历
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            大多数考上的本科都是民办本科，而且本科毕业证上会注明（专科起点/专转本/二年制）等字样
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            虽说转本后可以考公考编，但是<span className="highlight-box">考公考编的难度</span>比你高考考个一本都要难，录取率在1-2％左右
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick(getAssetPath('/images/三维柱状图.png'))}>
              <img src={getAssetPath("/images/三维柱状图.png")} alt="专升本对比图" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'difficult') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">学校课程难学</h3>
          <p className="pain-point-description">
            高中三年学三门语数外都学不好
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            大专两年要学十几二十门课，而且都是基础理论课，很难学的精
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>大专两年要学<br />十几二十门课<br /><br />很难学得精</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'outdated') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">学校教学落后</h3>
          <p className="pain-point-description">
            只要你找工作的时候就会发现
          </p>
          <p className="pain-point-subdesc">
            大学里老师教的知识都是远远落后于企业的新技术
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            因为<span className="highlight-box">老师自己都没有进过企业</span>工作过，怎么知道现在企业最新应用的设备，新技术等等
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>老师自己都<br />没有进过企业<br /><br />怎么知道新技术？</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FreshmanSection;