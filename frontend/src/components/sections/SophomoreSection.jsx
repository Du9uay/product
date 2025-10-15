import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';

const SophomoreSection = ({ id, type, onImageClick }) => {
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
      <div ref={titleRef} className="sophomore-title-content fade-in">
        <h2>给大二推广介绍</h2>
      </div>
    );
  }

  if (type === 'connections') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">家里有关系</h3>
          <p className="pain-point-description">
            家里有关系的，能够介绍工作固然好
          </p>
          <p className="pain-point-subdesc">
            但也得自己有本事，不然<span className="highlight-box">很难在企业留得住</span>
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            我们身边有一些同学是靠家里关系找到工作的，但因为个人能力不行，进了企业要么干不了几个月被轰出来，要么只能去一些边缘岗位，薪资少得可怜
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>🌐</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>有关系走遍天下<br />没关系寸步难行</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'change') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">大二换专业</h3>
          <p className="pain-point-description">
            很多大二的同学面对自己的专业根本学不进去
          </p>
          <p className="pain-point-subdesc">
            问题就出在通过一年的大学学习，他发现不喜欢自己所学的专业
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            但是学校又不能随便换专业，而我们的"订单班"给了同学<span className="highlight-box">重新选择专业</span>的机会
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>🔄</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>重新选择<br />新的机会<br />新的开始</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'internship') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">大三实习</h3>
          <p className="pain-point-description">
            大三的时候，如果专业学习不精的话
          </p>
          <p className="pain-point-subdesc">
            根本<span className="highlight-box">找不到像样的实习工作</span>
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            与其去端盘子或打螺丝，不如花点时间好好学习"订单班"的知识，同样干一个月能拿七八千，何必累死累活拿两三千
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>💼</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold'}}>学习技能<br />七八千收入<br />拒绝低薪实习</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'together') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">一起上班</h3>
          <p className="pain-point-description">
            考虑到同学毕业第一次工作的时候有"孤单感"
          </p>
          <p className="pain-point-subdesc">
            我们的"订单班"内推岗位会为同校同班的同学优先推送相同岗位
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            这样好友就可以一起去<span className="highlight-box">同一家企业上班</span>，相互有个伴
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>👥</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>同窗变同事<br />一起奋斗<br />共同进步</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SophomoreSection;