import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/staggeredMenu.css';

const StaggeredMenu = ({
  sections = [],
  currentSection = 0,
  onSectionClick,
  position = 'right',
  colors = ['#1a1a2e', '#0f0f1e'],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  className,
  logoUrl,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#8b5cf6',
  changeMenuColorOnOpen = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // 导航组结构
  const navGroups = [
    {
      title: "首页",
      isMain: true,
      section: 0,
      items: []
    },
    {
      title: "迷茫",
      isMain: true,
      section: 1,
      items: [
        { label: "从迷茫开始", section: 2 },
        { label: "就业恐惧", section: 3 },
        { label: "学校学习", section: 4 },
        { label: "校招情况", section: 5 }
      ]
    },
    {
      title: "产品介绍",
      isMain: true,
      section: 6,
      items: [
        { label: "简介", section: 7 },
        { label: "企业资源多", section: 8 },
        { label: "岗位种类多", section: 9 },
        { label: "只学有用的", section: 10 },
        { label: "学习AI最新应用", section: 11 },
        { label: "入学即跨入职场", section: 12 },
        { label: "定制化服务", section: 13 }
      ]
    },
    {
      title: "大一推广",
      isMain: true,
      section: 14,
      items: [
        { label: "大专生尴尬处境", section: 15 },
        { label: "转本文凭也找不到好工作", section: 16 },
        { label: "学校课程难学", section: 17 },
        { label: "学校教学落后", section: 18 }
      ]
    },
    {
      title: "大二推广",
      isMain: true,
      section: 19,
      items: [
        { label: "家里有关系", section: 20 },
        { label: "大二换专业", section: 21 },
        { label: "大三实习", section: 22 },
        { label: "一起上班", section: 23 }
      ]
    },
    {
      title: "报名流程",
      isMain: true,
      section: 24,
      items: [
        { label: "名额规则介绍", section: 25 },
        { label: "代理连线销售客服", section: 26 },
        { label: "营销案例", section: 27 },
        { label: "名额锁定", section: 28 },
        { label: "付款", section: 29 }
      ]
    },
    {
      title: "城市站点",
      isMain: true,
      section: 30,
      items: [
        { label: "指导老师", section: 31 },
        { label: "老师点评", section: 32 },
        { label: "老师选班", section: 33 },
        { label: "老师教务系统演示", section: 34 }
      ]
    },
    {
      title: "加入我们",
      isMain: true,
      section: 35,
      items: []
    }
  ];

  // 将导航组转换为扁平列表以便于GSAP动画
  const menuItems = [];
  navGroups.forEach(group => {
    menuItems.push({
      label: group.title,
      section: group.section,
      isMain: true
    });
    group.items.forEach(item => {
      menuItems.push({
        label: item.label,
        section: item.section,
        isMain: false
      });
    });
  });

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        );
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });

        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  // 检测是否是移动设备
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* 桌面端导航 */}
      <div className="sm-scope hidden md:block">
        <div
          className={(className ? className + ' ' : '') + 'staggered-menu-wrapper fixed right-[30px] top-1/2 -translate-y-1/2 z-[1000] flex items-center'}
          style={accentColor ? { '--sm-accent': accentColor } : undefined}
          data-position={position}
          data-open={open || undefined}
        >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 w-[320px] h-[600px] pointer-events-none z-[5] rounded-[24px] overflow-hidden"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0 rounded-[24px]"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* 简化的汉堡菜单按钮 */}
        <button
          ref={toggleBtnRef}
          className="sm-toggle relative w-[56px] h-[56px] rounded-full bg-[rgba(15,15,25,0.95)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer transition-all duration-300 pointer-events-auto hover:scale-105"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
          style={{
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <span
            ref={iconRef}
            className="sm-icon relative w-[24px] h-[24px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
            aria-hidden="true"
          >
            <span
              ref={plusHRef}
              className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
            />
            <span
              ref={plusVRef}
              className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
            />
          </span>
        </button>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 w-[320px] h-[600px] bg-[rgba(15,15,25,0.98)] flex flex-col p-[80px_30px_30px_30px] overflow-y-auto z-10 backdrop-blur-[12px] rounded-[24px]"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {menuItems.map((item, idx) => (
                <li
                  className={`sm-panel-itemWrap relative overflow-hidden leading-none ${item.isMain ? 'mt-3 mb-1' : 'ml-4 mb-[2px]'}`}
                  key={item.label + idx}
                >
                  <a
                    className={`sm-panel-item relative cursor-pointer transition-all duration-200 ease-out inline-block no-underline hover:translate-x-1 ${
                      item.isMain
                        ? 'text-white font-bold text-[18px] tracking-[-0.5px]'
                        : 'text-[rgba(255,255,255,0.6)] font-normal text-[14px] tracking-normal hover:text-[rgba(255,255,255,0.9)]'
                    } ${currentSection === item.section ? '!text-[#8b5cf6]' : ''}`}
                    href="#"
                    aria-label={item.label}
                    data-index={idx + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      onSectionClick?.(item.section);
                      toggleMenu();
                    }}
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:0%_50%] will-change-transform">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#8b5cf6)]">Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>

    {/* 移动端浮动按钮 */}
    <button
      className="mobile-nav-btn md:hidden fixed right-[20px] bottom-[30px] w-[56px] h-[56px] bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all duration-300 z-[999] hover:scale-110 hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)]"
      onClick={() => setOpen(true)}
      aria-label="打开目录"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    {/* 移动端目录遮罩层 */}
    <div
      className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-[10px] z-[1000] transition-all duration-300 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-[rgba(15,15,25,0.98)] p-[30px_20px] transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
          <button
            className="absolute top-[20px] right-[20px] w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-[rgba(255,255,255,0.7)] transition-colors duration-200 hover:text-white"
            onClick={() => setOpen(false)}
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

          <h2 className="text-white text-[24px] mb-[30px] font-bold">目录</h2>

          <ul className="list-none m-0 p-0 flex flex-col gap-[2px]">
            {menuItems.map((item, idx) => (
              <li
                key={item.label + idx}
                className={`${item.isMain ? 'mt-3 mb-1' : 'ml-4 mb-[2px]'}`}
              >
                <a
                  className={`block p-[10px] cursor-pointer transition-colors duration-200 rounded-lg ${
                    item.isMain
                      ? 'text-white font-bold text-[18px]'
                      : 'text-[rgba(255,255,255,0.7)] font-normal text-[15px]'
                  } ${currentSection === item.section ? '!text-[#8b5cf6] bg-[rgba(139,92,246,0.1)]' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSectionClick?.(item.section);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
};

export default StaggeredMenu;