import React, { useState, useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import './ProductSection.css';

const EnrollmentSection = ({ id, type, onImageClick }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
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

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
  };

  if (type === 'title') {
    return (
      <div ref={titleRef} className="enrollment-title-content fade-in">
        <h2>报名</h2>
      </div>
    );
  }

  if (type === 'quota') {
    return (
      <div id={id} className="product-content product-content-vertical">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">名额规则介绍</h3>
          <p className="product-description">
            因为企业<span className="highlight-box">专家资源有限</span>
          </p>
          <p className="product-subdesc">
            12个"企业订单班"，一届只能在全省招2400人，平均每班只能招生200人
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            苏州12个"企业订单班"的总名额为319人，平均每班只成20多人
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            具体名额需要学生小程序查看每校的<span className="highlight-box">名额分配</span>
          </p>
          <p className="product-description">
            特殊情况处理：
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
          若名额用完，可连线销售/客服看能否从<span className="highlight-box">其它城市</span>调剂名额，无法调剂则只能表示歉意
          </p>
          <p className="product-description">
            重要提示：
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
          大一新生在没有名额的情况下，不能锁定<span className="highlight-box">下一年度的名额</span>
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick(getAssetPath('/images/报名_3.png'))}>
              <img src={getAssetPath("/images/报名_3.png")} alt="报名系统" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'service') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">代理连线销售客服</h3>
          <p className="pain-point-description">
            特殊情况处理
          </p>
          <p className="pain-point-subdesc">
            若名额用完，可连线销售客服能否从其它城市调剂名额，无法调剂请为学生表示歉意
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            <span className="highlight-box">重要</span>：大一新生在没有名额的情况下，不能锁定下一年度的名额
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            联系方式：电话连线
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>📡</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>电话连线<br />客服支持<br />名额调剂</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'service_old') {
    return (
      <div className="enrollment-content fade-in">
        <h2 className="enrollment-title">专属服务，全程陪伴</h2>
        <div className="service-content">
          <div className="service-overview">
            <h3>我们为你提供什么？</h3>
            <p>不只是培训，更是全方位的职业成长陪伴</p>
          </div>

          <div className="service-timeline">
            <div className="timeline-item">
              <div className="timeline-dot">1</div>
              <div className="timeline-content">
                <h4>入学评估</h4>
                <p>专业测评，了解你的优势和不足</p>
                <ul>
                  <li>个人能力测试</li>
                  <li>职业倾向分析</li>
                  <li>定制化学习计划</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot">2</div>
              <div className="timeline-content">
                <h4>技能培训</h4>
                <p>系统性技能提升，紧跟行业需求</p>
                <ul>
                  <li>专业技能课程</li>
                  <li>软技能培养</li>
                  <li>实战项目练习</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot">3</div>
              <div className="timeline-content">
                <h4>就业指导</h4>
                <p>专业的求职指导，提升面试成功率</p>
                <ul>
                  <li>简历优化服务</li>
                  <li>面试技巧培训</li>
                  <li>模拟面试练习</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot">4</div>
              <div className="timeline-content">
                <h4>工作推荐</h4>
                <p>精准匹配，推荐合适的工作机会</p>
                <ul>
                  <li>岗位精准匹配</li>
                  <li>内推机会优先</li>
                  <li>薪资谈判指导</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot">5</div>
              <div className="timeline-content">
                <h4>入职跟踪</h4>
                <p>工作后的持续支持，助力职业发展</p>
                <ul>
                  <li>入职适应指导</li>
                  <li>职业发展咨询</li>
                  <li>终身学习支持</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="service-guarantee">
            <h3>🛡️ 服务保障</h3>
            <div className="guarantee-grid">
              <div className="guarantee-item">
                <h4>就业保障</h4>
                <p>签约保障就业，不成功可退费</p>
              </div>
              <div className="guarantee-item">
                <h4>薪资保障</h4>
                <p>保障起薪不低于当地平均水平</p>
              </div>
              <div className="guarantee-item">
                <h4>持续服务</h4>
                <p>提供3年职业发展跟踪服务</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cases') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">营销案例</h3>
          <p className="pain-point-description">
            真实的成功故事
          </p>
          <p className="pain-point-subdesc">
            很多同学都是父母带过来报名的
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            产品非常实用，代理自己也买了
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>👨‍👩‍👦</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>父母陪同<br />共同选择<br />放心托付</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cases_old') {
    return (
      <div className="enrollment-content fade-in">
        <h2 className="enrollment-title">成功案例，见证成长</h2>
        <div className="cases-content">
          <div className="cases-intro">
            <h3>他们的成功，就是你的希望</h3>
            <p>每一个成功案例都是真实的，每一份成长都值得被见证</p>
          </div>

          <div className="cases-grid">
            <div className="case-item" onClick={() => handleImageClick(getAssetPath('/images/专业点评.png'))}>
              <div className="case-image">
                <img src={getAssetPath("/images/专业点评.png")} alt="成功案例1" loading="lazy" />
              </div>
              <div className="case-info">
                <h4>小王 · 计算机应用专业</h4>
                <div className="case-stats">
                  <span className="stat">入学前：无工作经验</span>
                  <span className="stat">培训周期：4个月</span>
                  <span className="stat">就业结果：前端开发工程师</span>
                  <span className="stat salary">月薪：12K</span>
                </div>
                <p className="case-desc">"通过系统学习，从零基础到成功就业，感谢多多畅职的帮助！"</p>
              </div>
            </div>

            <div className="case-item" onClick={() => handleImageClick(getAssetPath('/images/推荐理由.png'))}>
              <div className="case-image">
                <img src={getAssetPath("/images/推荐理由.png")} alt="成功案例2" loading="lazy" />
              </div>
              <div className="case-info">
                <h4>小李 · 市场营销专业</h4>
                <div className="case-stats">
                  <span className="stat">入学前：销售员</span>
                  <span className="stat">培训周期：3个月</span>
                  <span className="stat">就业结果：新媒体运营</span>
                  <span className="stat salary">月薪：9K</span>
                </div>
                <p className="case-desc">"成功转型新媒体运营，工作环境好，发展前景广阔！"</p>
              </div>
            </div>

            <div className="case-item" onClick={() => handleImageClick(getAssetPath('/images/作品集.png'))}>
              <div className="case-image">
                <img src={getAssetPath("/images/作品集.png")} alt="成功案例3" loading="lazy" />
              </div>
              <div className="case-info">
                <h4>小张 · 电子商务专业</h4>
                <div className="case-stats">
                  <span className="stat">入学前：待业</span>
                  <span className="stat">培训周期：5个月</span>
                  <span className="stat">就业结果：产品助理</span>
                  <span className="stat salary">月薪：10K</span>
                </div>
                <p className="case-desc">"从待业到产品助理，找到了真正适合自己的职业方向！"</p>
              </div>
            </div>
          </div>

          <div className="cases-stats">
            <h3>整体成果展示</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">就业成功率</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8.5K</div>
                <div className="stat-label">平均起薪</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">30天</div>
                <div className="stat-label">平均求职周期</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">学员满意度</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'lock') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">名额锁定</h3>
          <p className="pain-point-description">
            预付定金
          </p>
          <p className="pain-point-subdesc">
            <span className="highlight-box">重要：定金不退</span>
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            开学日期说明
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            电子版协议签约
          </p>
          
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>💰</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>名额有限<br />先到先得</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'lock_old') {
    return (
      <div className="enrollment-content fade-in">
        <h2 className="enrollment-title">锁定名额，专享优惠</h2>
        <div className="lock-content">
          <div className="lock-urgency">
            <h3>⚡ 限时优惠，抢占先机</h3>
            <div className="urgency-info">
              <div className="urgency-item">
                <span className="urgency-icon">🔥</span>
                <span className="urgency-text">早鸟价：仅限前100名</span>
              </div>
              <div className="urgency-item">
                <span className="urgency-icon">⏰</span>
                <span className="urgency-text">优惠截止：本月底</span>
              </div>
              <div className="urgency-item">
                <span className="urgency-icon">🎯</span>
                <span className="urgency-text">名额有限：仅剩153个</span>
              </div>
            </div>
          </div>

          <div className="lock-pricing">
            <h3>价格对比</h3>
            <div className="pricing-table">
              <div className="pricing-item original">
                <h4>原价</h4>
                <div className="price">
                  <span className="currency">¥</span>
                  <span className="amount">9,980</span>
                </div>
                <p className="price-desc">常规报名价格</p>
              </div>

              <div className="pricing-arrow">→</div>

              <div className="pricing-item discount">
                <h4>早鸟价</h4>
                <div className="price">
                  <span className="currency">¥</span>
                  <span className="amount">6,980</span>
                </div>
                <p className="price-desc">名额有限</p>
                <div className="discount-badge">先到先得</div>
              </div>
            </div>

            <div className="pricing-benefits">
              <h4>早鸟专享权益</h4>
              <ul className="benefit-list">
                <li>✅ 专属学习资料包</li>
                <li>✅ VIP学员群终身制</li>
                <li>✅ 优先推荐工作机会</li>
                <li>✅ 免费参加行业分享会</li>
                <li>✅ 一对一职业规划咨询</li>
              </ul>
            </div>
          </div>

          <div className="lock-action">
            <h3>现在锁定名额</h3>
            <p>只需支付299元定金，即可锁定早鸟价格和专享权益</p>

            <div className="lock-steps">
              <div className="lock-step">
                <span className="step-number">1</span>
                <span className="step-text">支付299元定金</span>
              </div>
              <div className="lock-step">
                <span className="step-number">2</span>
                <span className="step-text">锁定早鸟价格</span>
              </div>
              <div className="lock-step">
                <span className="step-number">3</span>
                <span className="step-text">开班前补齐余款</span>
              </div>
            </div>

            <div className="lock-guarantee">
              <h4>🛡️ 无风险承诺</h4>
              <p>如果最终决定不参加，定金可全额退还，无任何手续费</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'process') {
    return (
      <div id={id} className="pain-point-content" style={{justifyContent: 'center'}}>
        <div className="pain-point-left slide-in-left" ref={leftRef} style={{flex: 'none', maxWidth: '800px', paddingRight: '0'}}>
          <h3 className="pain-point-title" style={{textAlign: 'center'}}>报名流程</h3>
          <p className="pain-point-description" style={{marginBottom: '40px', textAlign: 'center'}}>
            简单五步，开启你的职业新征程
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
              <div style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>1</div>
              <div>
                <p className="pain-point-subdesc" style={{color: 'var(--text)', fontWeight: '600', marginBottom: '8px', fontSize: '1.3rem'}}>选班</p>
                <p className="pain-point-subdesc">根据学生意愿进行选班</p>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
              <div style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>2</div>
              <div>
                <p className="pain-point-subdesc" style={{color: 'var(--text)', fontWeight: '600', marginBottom: '8px', fontSize: '1.3rem'}}>锁定名额</p>
                <p className="pain-point-subdesc">支付定金进行名额锁定</p>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
              <div style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>3</div>
              <div>
                <p className="pain-point-subdesc" style={{color: 'var(--text)', fontWeight: '600', marginBottom: '8px', fontSize: '1.3rem'}}>付款</p>
                <p className="pain-point-subdesc">一周内交付全款</p>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
              <div style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>4</div>
              <div>
                <p className="pain-point-subdesc" style={{color: 'var(--text)', fontWeight: '600', marginBottom: '8px', fontSize: '1.3rem'}}>获取资源</p>
                <p className="pain-point-subdesc">多多畅职平台交付给学生通知书、教务系统账号、简历、作品等内容</p>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
              <div style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>5</div>
              <div>
                <p className="pain-point-subdesc" style={{color: 'var(--text)', fontWeight: '600', marginBottom: '8px', fontSize: '1.3rem'}}>开始学习</p>
                <p className="pain-point-subdesc">根据账号登陆教务系统，根据教学大纲安排的时间上课</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'payment') {
    return (
      <div id={id} className="pain-point-content">
        <div className="pain-point-left slide-in-left" ref={leftRef}>
          <h3 className="pain-point-title">付款</h3>
          <p className="pain-point-description">
            交付定金后，再扫小程序代理的"报名"二维码
          </p>
          <p className="pain-point-subdesc">
            <span className="highlight-box">20min内</span>录入CRM系统
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            <span className="highlight-box">重要</span>：7日内付清尾款，否则名额转让给其他同学，且不退定金
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            交付报名通知书
          </p>
          <p className="pain-point-subdesc" style={{marginTop: '20px'}}>
            帮助学员教务系统下载及安装
          </p>
        </div>
        <div className="pain-point-right slide-in-right" ref={rightRef}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '4rem', marginBottom: '20px'}}>💳</p>
              <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>快速支付<br />CRM录入<br />系统安装</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'payment_old') {
    return (
      <div className="enrollment-content fade-in">
        <h2 className="enrollment-title">灵活支付，减轻负担</h2>
        <div className="payment-content">
          <div className="payment-intro">
            <h3>多种支付方式，总有一种适合你</h3>
            <p>我们理解学生的经济压力，提供灵活的支付方案</p>
          </div>

          <div className="payment-options">
            <div
              className={`payment-option ${selectedPayment === 'full' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('full')}
            >
              <div className="option-header">
                <h4>一次性支付</h4>
                <div className="option-badge popular">推荐</div>
              </div>
              <div className="option-price">
                <span className="currency">¥</span>
                <span className="amount">6,980</span>
              </div>
              <div className="option-benefits">
                <h5>专享优惠</h5>
                <ul>
                  <li>✅ 早鸟价直接享受</li>
                  <li>✅ 赠送价值1000元资料包</li>
                  <li>✅ 优先安排实习机会</li>
                </ul>
              </div>
            </div>

            <div
              className={`payment-option ${selectedPayment === 'installment' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('installment')}
            >
              <div className="option-header">
                <h4>分期支付</h4>
                <div className="option-badge">0利息</div>
              </div>
              <div className="option-price">
                <span className="currency">¥</span>
                <span className="amount">2,493</span>
                <span className="period">/月</span>
              </div>
              <div className="option-benefits">
                <h5>分期详情</h5>
                <ul>
                  <li>✅ 3期免息分期</li>
                  <li>✅ 月供压力小</li>
                  <li>✅ 相同服务质量</li>
                </ul>
              </div>
            </div>

            <div
              className={`payment-option ${selectedPayment === 'isa' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('isa')}
            >
              <div className="option-header">
                <h4>就业后付款</h4>
                <div className="option-badge innovative">创新</div>
              </div>
              <div className="option-price">
                <span className="currency">¥</span>
                <span className="amount">0</span>
                <span className="period">入学费用</span>
              </div>
              <div className="option-benefits">
                <h5>ISA模式</h5>
                <ul>
                  <li>✅ 0元入学</li>
                  <li>✅ 就业后按月薪比例支付</li>
                  <li>✅ 未就业不收费</li>
                </ul>
              </div>
            </div>
          </div>

          {selectedPayment && (
            <div className="payment-details">
              {selectedPayment === 'full' && (
                <div className="payment-detail">
                  <h4>一次性支付详情</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">课程费用</span>
                      <span className="detail-value">¥6,980</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">优惠金额</span>
                      <span className="detail-value discount">-¥3,000</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">赠送资料</span>
                      <span className="detail-value">价值¥1,000</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'installment' && (
                <div className="payment-detail">
                  <h4>分期支付详情</h4>
                  <div className="installment-schedule">
                    <div className="installment-item">
                      <span className="installment-period">第1期</span>
                      <span className="installment-amount">¥2,493</span>
                      <span className="installment-date">报名时</span>
                    </div>
                    <div className="installment-item">
                      <span className="installment-period">第2期</span>
                      <span className="installment-amount">¥2,493</span>
                      <span className="installment-date">第2个月</span>
                    </div>
                    <div className="installment-item">
                      <span className="installment-period">第3期</span>
                      <span className="installment-amount">¥2,494</span>
                      <span className="installment-date">第3个月</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'isa' && (
                <div className="payment-detail">
                  <h4>ISA模式详情</h4>
                  <div className="isa-terms">
                    <div className="isa-item">
                      <h5>入学阶段</h5>
                      <p>0元入学，先学习后付费</p>
                    </div>
                    <div className="isa-item">
                      <h5>就业后</h5>
                      <p>按月薪的15%支付，最长24个月</p>
                    </div>
                    <div className="isa-item">
                      <h5>保障条件</h5>
                      <p>月薪低于6000元免费，超过才开始付费</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="payment-security">
            <h3>🔒 支付安全保障</h3>
            <div className="security-features">
              <div className="security-item">
                <span className="security-icon">🛡️</span>
                <span className="security-text">银行级安全加密</span>
              </div>
              <div className="security-item">
                <span className="security-icon">✅</span>
                <span className="security-text">支持主流支付平台</span>
              </div>
              <div className="security-item">
                <span className="security-icon">📞</span>
                <span className="security-text">24小时客服支持</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EnrollmentSection;