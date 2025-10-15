import React, { useState, useEffect, useRef } from 'react';
import '../styles/navigation.css';

const Navigation = ({ onSectionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero-section');
  const [activeMainSection, setActiveMainSection] = useState('hero-section');
  const expandTimeoutRef = useRef(null);
  const collapseTimeoutRef = useRef(null);
  const collapseStageRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Mobile check:', mobile, 'Width:', window.innerWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 初始动画延迟
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 监听滚动位置来更新当前激活的导航项
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 偏移量，提前触发
      
      // 收集所有的section ID
      const allSections = [];
      navGroups.forEach(group => {
        allSections.push({ id: group.sectionId, isMain: true, parentId: null });
        group.items.forEach(item => {
          allSections.push({ id: item.sectionId, isMain: false, parentId: group.sectionId });
        });
      });

      // 找出当前所在的section
      let currentSectionId = 'hero-section';
      let currentMainSectionId = 'hero-section';
      
      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = allSections[i];
        const element = document.getElementById(section.id) || document.querySelector(`.${section.id}`);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          
          if (scrollPosition >= top) {
            currentSectionId = section.id;
            currentMainSectionId = section.isMain ? section.id : section.parentId;
            break;
          }
        }
      }
      
      setCurrentSection(currentSectionId);
      setActiveMainSection(currentMainSectionId);
    };

    // 使用防抖优化性能
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
    handleScroll(); // 初始调用
    
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const navGroups = [
    {
      title: "首页",
      isMain: true,
      sectionId: 'hero-section',
      items: []
    },
    {
      title: "迷茫",
      isMain: true,
      sectionId: 'confusion-title-section',
      items: [
        { label: "从迷茫开始", sectionId: 'pain-point-1' },
        { label: "就业恐惧", sectionId: 'pain-point-2' },
        { label: "学校学习", sectionId: 'pain-point-3' },
        { label: "校招情况", sectionId: 'pain-point-4' }
      ]
    },
    {
      title: "产品介绍",
      isMain: true,
      sectionId: 'product-title-section',
      items: [
        { label: "简介", sectionId: 'product-intro' },
        { label: "企业资源多", sectionId: 'product-enterprise' },
        { label: "岗位种类多", sectionId: 'product-positions' },
        { label: "只学有用的", sectionId: 'product-useful' },
        { label: "学习AI最新应用", sectionId: 'product-ai' },
        { label: "工作门道", sectionId: 'product-career' },
        { label: "写好简历", sectionId: 'product-resume' },
        { label: "利用AI能力", sectionId: 'product-aiPower' },
        { label: "就业规划", sectionId: 'product-careerPlan' },
        { label: "参加面试", sectionId: 'product-interview' },
        { label: "跟着老板", sectionId: 'product-boss' },
        { label: "求职渠道", sectionId: 'product-jobChannel' },
        { label: "问BOSS", sectionId: 'product-askBoss' }
      ]
    },
    {
      title: "城市站点",
      isMain: true,
      sectionId: 'city-title-section',
      items: [
        { label: "免费就业规划", sectionId: 'city-career-planning' }
      ]
    },
    {
      title: "报名",
      isMain: true,
      sectionId: 'enrollment-title-section',
      items: [
        { label: "名额规则介绍", sectionId: 'enrollment-quota' },
        { label: "报名流程", sectionId: 'enrollment-process' }
      ]
    }
  ];

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (element) {
      // 使用全局的scrollToSection方法（PC端用Lenis，移动端用原生）
      if (window.scrollToSection) {
        window.scrollToSection(element, {
          duration: 1.2,
          offset: 0
        });
      } else {
        // 降级方案
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    if (isMobile) {
      setTimeout(() => setIsMobileMenuOpen(false), 300);
    }
  };

  const handleSidebarClick = (e) => {
    if (isMobile && !isExpanded && e.currentTarget === e.target) {
      setIsExpanded(true);
    }
  };

  // 处理鼠标进入，带延迟
  const handleMouseEnter = () => {
    if (!isMobile) {
      // 清除所有收起的定时器
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }
      if (collapseStageRef.current) {
        clearTimeout(collapseStageRef.current);
        collapseStageRef.current = null;
      }
      setIsCollapsing(false);

      // 设置展开延迟
      expandTimeoutRef.current = setTimeout(() => {
        setIsExpanded(true);
      }, 150); // 150ms 延迟展开，更快响应
    }
  };

  // 处理鼠标离开，带延迟
  const handleMouseLeave = () => {
    if (!isMobile) {
      // 清除展开的定时器
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
        expandTimeoutRef.current = null;
      }
      // 清除之前的收起定时器
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
      if (collapseStageRef.current) {
        clearTimeout(collapseStageRef.current);
      }

      // 第一阶段：设置正在收起状态，让子项先消失
      collapseTimeoutRef.current = setTimeout(() => {
        setIsCollapsing(true);

        // 第二阶段：等待子项完全消失后再收起边框
        collapseStageRef.current = setTimeout(() => {
          setIsExpanded(false);
          setIsCollapsing(false);
        }, 600); // 等待子项完全消失（0.6s动画时间）
      }, 300); // 初始延迟
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isExpanded && !e.target.closest('.nav-sidebar')) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // 清理定时器
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, [isMobile, isExpanded]);

  // 计算每个项目的动画延迟索引
  let globalIndex = 0;
  const getItemIndex = () => {
    return globalIndex++;
  };

  return (
    <>
      {/* 桌面端侧边栏 */}
      <div
        className={`nav-sidebar ${isExpanded ? 'expanded' : ''} ${isVisible ? 'visible' : ''} ${isCollapsing ? 'collapsing' : ''}`}
        onClick={handleSidebarClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <div className="nav-toggle-btn">
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </div>

      <div className="nav-menu">
        {navGroups.map((group, groupIndex) => {
          const mainItemIndex = getItemIndex();
          return (
            <div key={groupIndex} className="nav-group">
              <div
                className={`nav-item nav-main ${activeMainSection === group.sectionId ? 'active' : ''}`}
                onClick={() => handleNavClick(group.sectionId)}
                data-section={group.sectionId}
                style={{
                  '--stagger-index': mainItemIndex,
                }}
              >
                <span className="nav-label">{group.title}</span>
                <div className="nav-hover-bg"></div>
              </div>

              {group.items.length > 0 && (
                <div className={`nav-sub-container ${isCollapsing ? 'collapsing' : ''}`}>
                  {isExpanded && group.items.map((item, itemIndex) => {
                    const subItemIndex = getItemIndex();
                    return (
                      <div
                        key={itemIndex}
                        className={`nav-item nav-sub ${currentSection === item.sectionId ? 'active' : ''} ${isExpanded && !isCollapsing ? 'show' : ''} ${isCollapsing ? 'hiding' : ''}`}
                        onClick={() => handleNavClick(item.sectionId)}
                        data-section={item.sectionId}
                        style={{
                          '--stagger-index': subItemIndex,
                        }}
                      >
                        <span className="nav-label">{item.label}</span>
                        <div className="nav-hover-bg"></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    {/* 移动端浮动按钮 */}
    {isMobile && (
      <button
        className="mobile-nav-btn"
        onClick={() => {
          console.log('Mobile menu button clicked');
          setIsMobileMenuOpen(true);
        }}
        aria-label="打开目录"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    )}

    {/* 移动端目录遮罩层 */}
    <div
      className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target.classList.contains('mobile-nav-overlay')) {
          setIsMobileMenuOpen(false);
        }
      }}
    >
      <div className="mobile-nav-container">
        <button
          className="mobile-nav-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="关闭目录"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 style={{color: '#fff', fontSize: '24px', marginBottom: '30px', fontWeight: '700'}}>目录</h2>

        <div className="nav-menu">
          {navGroups.map((group, groupIndex) => {
            const mainItemIndex = getItemIndex();
            return (
              <div key={groupIndex} className="nav-group">
                <div
                  className={`nav-item nav-main ${activeMainSection === group.sectionId ? 'active' : ''} show`}
                  onClick={() => handleNavClick(group.sectionId)}
                  data-section={group.sectionId}
                  style={{
                    '--stagger-index': mainItemIndex,
                  }}
                >
                  <span className="nav-label">{group.title}</span>
                </div>

                {group.items.map((item, itemIndex) => {
                  const subItemIndex = getItemIndex();
                  return (
                    <div
                      key={itemIndex}
                      className={`nav-item nav-sub ${currentSection === item.sectionId ? 'active' : ''} show`}
                      onClick={() => handleNavClick(item.sectionId)}
                      data-section={item.sectionId}
                      style={{
                        '--stagger-index': subItemIndex,
                      }}
                    >
                      <span className="nav-label">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default Navigation;