import React, { useState } from 'react';

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    major: '',
    city: '',
    intention: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // 清空表单
      setFormData({
        name: '',
        phone: '',
        major: '',
        city: '',
        intention: ''
      });
    }, 2000);
  };

  const isFormValid = formData.name && formData.phone && formData.major;

  return (
    <div className="cta-content fade-in">
      <div className="cta-main">
        <div className="cta-header">
          <h1 className="cta-title">开始你的职业新征程</h1>
          <p className="cta-subtitle">不要让迷茫成为前进的阻力，现在就行动起来！</p>
        </div>

        <div className="cta-benefits">
          <h2>选择多多畅职，你将获得：</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>明确的职业方向</h3>
              <p>专业测评 + 个性化规划，找到最适合你的职业道路</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛠️</div>
              <h3>实用的技能提升</h3>
              <p>行业前沿技能 + 实战项目经验，让你更有竞争力</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>优质的工作机会</h3>
              <p>2700+企业合作 + 内推机会，高薪工作不再是梦想</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3>终身的成长伙伴</h3>
              <p>学习社区 + 持续服务，与志同道合的人一起成长</p>
            </div>
          </div>
        </div>

        <div className="cta-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>立即报名咨询</h2>
              <p>填写信息，获取专属职业规划方案</p>
            </div>

            {showSuccess ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>提交成功！</h3>
                <p>我们的专业顾问将在24小时内与你联系，为你提供专属的职业规划方案。</p>
                <button
                  className="retry-button"
                  onClick={() => setShowSuccess(false)}
                >
                  继续咨询
                </button>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">姓名 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="请输入你的姓名"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">手机号 *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="请输入手机号"
                      pattern="[0-9]{11}"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="major">专业 *</label>
                    <select
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">请选择你的专业</option>
                      <option value="computer">计算机相关专业</option>
                      <option value="marketing">市场营销</option>
                      <option value="ecommerce">电子商务</option>
                      <option value="design">设计相关专业</option>
                      <option value="management">工商管理</option>
                      <option value="other">其他专业</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">所在城市</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    >
                      <option value="">请选择城市</option>
                      <option value="beijing">北京</option>
                      <option value="shanghai">上海</option>
                      <option value="guangzhou">广州</option>
                      <option value="shenzhen">深圳</option>
                      <option value="hangzhou">杭州</option>
                      <option value="nanjing">南京</option>
                      <option value="chengdu">成都</option>
                      <option value="xian">西安</option>
                      <option value="other">其他城市</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="intention">求职意向</label>
                  <textarea
                    id="intention"
                    name="intention"
                    value={formData.intention}
                    onChange={handleInputChange}
                    placeholder="简单描述你的求职期望（选填）"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      提交中...
                    </>
                  ) : (
                    '立即获取专属方案'
                  )}
                </button>

                <div className="form-footer">
                  <p className="privacy-notice">
                    <span className="privacy-icon">🔒</span>
                    我们承诺保护你的隐私，信息仅用于为你提供更好的服务
                  </p>
                </div>
              </form>
            )}
          </div>

          <div className="cta-sidebar">
            <div className="contact-info">
              <h3>联系我们</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-text">
                  <span className="contact-label">咨询热线</span>
                  <span className="contact-value">400-123-4567</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <div className="contact-text">
                  <span className="contact-label">微信客服</span>
                  <span className="contact-value">扫码添加顾问微信</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div className="contact-text">
                  <span className="contact-label">服务时间</span>
                  <span className="contact-value">9:00-21:00</span>
                </div>
              </div>
            </div>

            <div className="urgency-reminder">
              <h3>⚡ 限时优惠提醒</h3>
              <div className="urgency-content">
                <p>早鸟价仅限前100名</p>
                <p>优惠截止：本月底</p>
                <p>剩余名额：153个</p>
              </div>
              <div className="urgency-action">
                立即咨询，锁定优惠价格
              </div>
            </div>

            <div className="trust-indicators">
              <h3>信任保障</h3>
              <div className="trust-list">
                <div className="trust-item">
                  <span className="trust-icon">✅</span>
                  <span>央视报道推荐</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">✅</span>
                  <span>2700+企业合作</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">✅</span>
                  <span>95%就业成功率</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">✅</span>
                  <span>就业保障协议</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-footer">
          <div className="final-message">
            <h2>不要让机会溜走</h2>
            <p>
              每一个成功的人都曾经迷茫过，但他们选择了行动。<br />
              你的未来不应该被学历限制，而应该被你的努力和选择定义。
            </p>
            <p className="highlight">
              多多畅职，让专科生也能拥有精彩的职业人生！
            </p>
          </div>

          <div className="social-proof">
            <div className="proof-item">
              <span className="proof-number">10,000+</span>
              <span className="proof-label">成功就业学员</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">2,700+</span>
              <span className="proof-label">合作企业</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">95%</span>
              <span className="proof-label">就业成功率</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">8.5K</span>
              <span className="proof-label">平均起薪</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;