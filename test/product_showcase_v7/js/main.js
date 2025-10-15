/* 多多畅职 V7 - 主JavaScript文件 */

// ============================================
// 导航功能
// ============================================

// 导航点击事件
document.addEventListener('DOMContentLoaded', function() {
    const navDots = document.querySelectorAll('.nav-dot');

    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionIndex = parseInt(this.dataset.section);
            const sections = document.querySelectorAll('.section');

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
    const navDots = document.querySelectorAll('.nav-dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);

                // 移除所有active类
                navDots.forEach(dot => dot.classList.remove('active'));

                // 添加active类到对应的导航点
                const targetDot = document.querySelector(`[data-section="${index}"]`);
                if (targetDot) {
                    targetDot.classList.add('active');
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
// 滚动动画
// ============================================

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // 动画完成后不再观察该元素
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        animateObserver.observe(el);
    });
}

// ============================================
// 图片预览功能
// ============================================

function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal.querySelector('.close');

    // 全局函数，供onclick使用
    window.openModal = function(src) {
        modal.classList.add('active');
        modalImg.src = src;
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 关闭按钮
    closeBtn.onclick = function() {
        closeModal();
    }

    // 点击模态框背景关闭
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    }
}

// ============================================
// 平滑滚动优化
// ============================================

function initSmoothScroll() {
    let isScrolling = false;

    window.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: true });
}

// ============================================
// 动态背景效果
// ============================================

function initBackgroundEffects() {
    // 鼠标跟随效果（可选）
    const hero = document.querySelector('.hero-section');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            hero.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                var(--dark)
            `;
        });
    }
}

// ============================================
// 性能优化：延迟加载图片
// ============================================

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 工具函数
// ============================================

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ============================================
// 初始化所有功能
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航观察器
    initNavigationObserver();

    // 初始化滚动动画
    initScrollAnimations();

    // 初始化图片模态框
    initImageModal();

    // 初始化平滑滚动
    initSmoothScroll();

    // 初始化背景效果
    initBackgroundEffects();

    // 初始化延迟加载（如果有需要）
    initLazyLoad();

    // 添加加载完成标记
    document.body.classList.add('loaded');

    console.log('多多畅职 V7 - 系统初始化完成');
});

// ============================================
// 导出全局函数
// ============================================

window.DDChangZhi = {
    openModal: window.openModal,
    debounce,
    throttle
};