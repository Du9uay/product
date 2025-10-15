/* 更新的导航功能 */

// ============================================
// 导航点击事件 - 支持整个导航项点击
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航项（整个可点击区域）
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionIndex = parseInt(this.dataset.section);

            if (sections[sectionIndex]) {
                sections[sectionIndex].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// 滚动监听和导航状态更新
// ============================================

function initNavigationObserver() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);

                // 移除所有active类
                navItems.forEach(item => item.classList.remove('active'));

                // 添加active类到对应的导航项
                const targetItem = document.querySelector(`.nav-item[data-section="${index}"]`);
                if (targetItem) {
                    targetItem.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// 导航栏自动隐藏/显示优化
// ============================================

function initNavbarAutoHide() {
    const navbar = document.querySelector('.nav-sidebar');
    let isHovering = false;
    let scrollTimeout;

    // 只在桌面端启用hover效果
    if (window.innerWidth > 768) {
        // 鼠标进入/离开事件
        navbar.addEventListener('mouseenter', () => {
            isHovering = true;
            navbar.classList.add('expanded');
        });

        navbar.addEventListener('mouseleave', () => {
            isHovering = false;
            navbar.classList.remove('expanded');
        });

        // 滚动时临时显示
        window.addEventListener('scroll', () => {
            if (!isHovering) {
                navbar.style.opacity = '0.8';

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (!isHovering) {
                        navbar.style.opacity = '';
                    }
                }, 1500);
            }
        });
    }

    // 窗口大小改变时重新初始化
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // 移除所有事件监听器并重新初始化
            const newNavbar = navbar.cloneNode(true);
            navbar.parentNode.replaceChild(newNavbar, navbar);
            initNavbarAutoHide();
        }, 250);
    });
}

// ============================================
// 移动端触摸优化
// ============================================

function initMobileTouch() {
    const navbar = document.querySelector('.nav-sidebar');
    let touchStartX = 0;
    let touchStartY = 0;
    let isExpanded = false;

    // 添加点击切换功能（移动端汉堡菜单）
    navbar.addEventListener('click', function(e) {
        // 只在移动端且点击汉堡菜单区域时触发
        if (window.innerWidth <= 768 && !isExpanded) {
            e.stopPropagation();
            this.classList.add('expanded');
            isExpanded = true;
        }
    });

    // 点击外部关闭导航
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && isExpanded && !navbar.contains(e.target)) {
            navbar.classList.remove('expanded');
            isExpanded = false;
        }
    });

    // 触摸事件处理
    navbar.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    navbar.addEventListener('touchmove', (e) => {
        if (!isExpanded) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // 如果水平滑动大于垂直滑动，处理展开/收缩
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
            if (diffX > 0 && isExpanded) {
                // 向左滑动 - 收缩
                navbar.classList.remove('expanded');
                isExpanded = false;
            }
        }
    });

    // 导航项点击后自动收起（移动端）
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768 && isExpanded) {
                setTimeout(() => {
                    navbar.classList.remove('expanded');
                    isExpanded = false;
                }, 300);
            }
        });
    });

    // 窗口大小变化时重置状态
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove('expanded');
            isExpanded = false;
        }
    });
}

// ============================================
// 键盘导航支持
// ============================================

function initKeyboardNavigation() {
    let currentIndex = 0;
    const sections = document.querySelectorAll('.section');

    document.addEventListener('keydown', (e) => {
        // 使用方向键导航
        if (e.key === 'ArrowDown' || e.key === 'j') {
            e.preventDefault();
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'k') {
            e.preventDefault();
            currentIndex = Math.max(currentIndex - 1, 0);
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// 初始化所有导航功能
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigationObserver();
    initNavbarAutoHide();

    // 检测是否为移动设备
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        initMobileTouch();
    }

    // 添加键盘导航
    initKeyboardNavigation();

    console.log('新导航系统初始化完成');
});