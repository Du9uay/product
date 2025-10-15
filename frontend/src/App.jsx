import React, { useState } from 'react';
import Navigation from './components/Navigation';
import SmoothScroll from './components/SmoothScroll';
import SectionWrapper from './components/SectionWrapper';
import HeroSection from './components/sections/HeroSection';
import ConfusionSection from './components/sections/ConfusionSection';
import PainPointSection from './components/sections/PainPointSection';
import PathwaySection from './components/sections/PathwaySection';
import ProductSection from './components/sections/ProductSection';
import EnrollmentSection from './components/sections/EnrollmentSection';
import CitySection from './components/sections/CitySection';
import ImageModal from './components/ImageModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimations } from './components/ScrollAnimations';
import LenisDebug from './components/LenisDebug';
import './styles/App.css';

// 注册ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  // 启用滚动动画
  useScrollAnimations();
  const [modalImage, setModalImage] = useState(null);

  // 初始化历史管理和禁用自动滚动恢复
  React.useEffect(() => {
    // 检测是否为移动端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    // 移动端：禁用浏览器的自动滚动恢复
    if (isMobile && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      console.log('移动端检测：禁用浏览器自动滚动恢复');
    }

    // 页面首次加载时，添加一个初始历史状态
    if (!window.history.state) {
      window.history.replaceState({ page: 'initial' }, '');
    }

    // 监听浏览器返回/前进事件
    const handlePopState = (e) => {
      // 如果有图片预览打开，关闭它
      if (modalImage) {
        setModalImage(null);
        // 阻止默认行为，保持在当前页面
        window.history.pushState({ page: 'current' }, '');
      }
      // 如果没有图片预览，让浏览器自然处理（但不恢复滚动位置）
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // 恢复默认滚动恢复行为
      if (isMobile && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [modalImage]);

  // 滚动到指定section
  const scrollToSection = (sectionRef) => {
    if (sectionRef) {
      // 使用Lenis的scrollTo方法
      if (window.scrollToSection) {
        window.scrollToSection(sectionRef, {
          duration: 1.2,
          offset: 0
        });
      } else {
        // 降级方案
        sectionRef.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="App">
      <LenisDebug />
      <Navigation />

      <SmoothScroll>
        <div className="fullpage-container">
          {/* 首页英雄区 */}
          <section id="hero-section" className="section hero-section">
            <HeroSection />
          </section>

          {/* 迷茫板块 - 一级标题独立页面 */}
          <section id="confusion-title-section" className="section confusion-title-section">
            <ConfusionSection
              title="迷茫"
              subtitle="每一个专科生都曾经历过的困惑"
              description="我们理解你的迷茫，更知道如何破局"
            />
          </section>

          {/* 出路板块 - 独立页面 */}
          <section id="pathway-section" className="section pathway-section">
            <PathwaySection />
          </section>

          {/* 迷茫板块 - 二级内容 */}
          <SectionWrapper theme="transparent" className="confusion-content-wrapper">
            <PainPointSection
              id="pain-point-1"
              number="1"
              title="自己的专业其实有很多对口就业方向"
              mainText="只是学生不知道"
              description="大多数专科生在选择专业时，并不清楚这个专业未来的就业方向，即便知道，也是比较片面的。毕业后才发现，上了三年学却不知道毕业后能做什么工作。"
              solution="小程序中的「专业测评」能够帮你精准分析专业对口的岗位，让你不再迷茫"
              images={[ 'p_2.png', 'p_3.png']}
              onImageClick={setModalImage}
            />
            <PainPointSection
              id="pain-point-2"
              number="2"
              title="就业的恐惧"
              mainText="万一找不到工作怎么办？"
              description="普通专科生的就业现状往往是：
**「吉祥三宝」**：保安、保姆、保洁
**「铁人三项」**：外卖、快递、滴滴
**「新时代的三宝」**：主播、销售、服务员"
              solution="这不是你想要的未来，但似乎又别无选择我们要打破这个魔咒，让你有更多更好的选择"
              images={['吉祥三宝.PNG', '铁人三项.PNG', '新时代的三宝.PNG']}
              onImageClick={setModalImage}
            />
            <PainPointSection
              id="pain-point-3"
              number="3"
              title="学校学习的困境"
              mainText="学校的课程大多偏重理论"
              description="教材内容滞后于行业发展3-5年，有的教材、PPT甚至是10年以前的
              学校里的就业课老师，对你的专业不了解，更没有项目经历，他们不会帮你简历，帮你做作品。"
              solution="当你走出校门，才发现学校教的和企业要的完全是两回事。这种**脱节**让你在求职时处处碰壁。"
              emoji="📚"
              emojiText="理论 ≠ 实践\n学校 ≠ 企业\n教材 ≠ 技术"
              onImageClick={setModalImage}
            />
            <PainPointSection
              id="pain-point-4"
              number="4"
              title="校招的真相"
              mainText="校招是企业和学校做的生意！"
              description="学校的校招会上，来的企业质量参差不齐，大部分岗位都是**销售或客服**
              很多企业是学校花钱请来，在招聘会上坐一下，收收简历，招聘会结束大家的简历都会出现在垃圾桶"
              solution="真正的好企业、好岗位很少会出现在专科院校的校招会上。你可以搜一下华为、阿里、腾讯的校招进入哪些985的学校，只有一家优秀的企业——京东，会进入大专院校招聘，但它招聘的岗位是快递员。这是现实，但不是有上进心的同学的终点。"
              images={['校招.JPEG']}
              onImageClick={setModalImage}
            />
            <PainPointSection
              id="pain-point-5"
              number="5"
              title="专升本到底怎么样？"
              mainText="有很多学生还是想报名专升本，这个本科证到底有没有用，以及投入产出比到底合不合理"
              description="**学费对比**：专升本机构报名费9000-1万+，本科两年学费3-6万，学杂费1-2万，生活费等，总计约**10万**；我们订单班费用**8999元**

**学习周期**：订单班学习两年，大三即可实习工作拿工资；专升本需大三考试，考上后本科再学两年，才能开始工作

**考试数量**：订单班只需通过企业面试，全程有我们支持；专升本需先通过专升本考试（江苏通过率仅**10%**），考上后还有**60+门**考试和毕业答辩

**对口就业岗位**：专科/专升本只有3-5个对口岗位；我们学员有**40+个**对口岗位可选

**薪资**：我们学员毕业一年后**6-8k**；专科/专升本学生**4-5k**

**岗位晋升**：我们20%学员大三就进储备干部岗，毕业一年后**50%晋升管理岗**；专科/专升本学生需**3-5年**才可能晋升管理岗"
              images={['专升本到底怎么样？.png']}
              onImageClick={setModalImage}
            />
          </SectionWrapper>

          {/* 产品介绍板块 - 一级标题独立页面 */}
          <section id="product-title-section" className="section product-title-section">
            <ProductSection type="title" />
          </section>

          {/* 产品介绍板块 - 二级内容（保持原有结构） */}
          <section id="product-intro" className="section product-section">
            <ProductSection type="intro" onImageClick={setModalImage} />
          </section>
          <section id="product-enterprise" className="section product-section">
            <ProductSection type="enterprise" onImageClick={setModalImage} />
          </section>
          <section id="product-positions" className="section product-section">
            <ProductSection type="positions" onImageClick={setModalImage} />
          </section>
          <section id="product-useful" className="section product-section">
            <ProductSection type="useful" onImageClick={setModalImage} />
          </section>
          <section id="product-ai" className="section product-section">
            <ProductSection type="ai" onImageClick={setModalImage} />
          </section>
          <section id="product-career" className="section product-section">
            <ProductSection type="career" onImageClick={setModalImage} />
          </section>
          <section id="product-resume" className="section product-section">
            <ProductSection type="resume" onImageClick={setModalImage} />
          </section>
          <section id="product-aiPower" className="section product-section">
            <ProductSection type="aiPower" onImageClick={setModalImage} />
          </section>
          <section id="product-careerPlan" className="section product-section">
            <ProductSection type="careerPlan" onImageClick={setModalImage} />
          </section>
          <section id="product-interview" className="section product-section">
            <ProductSection type="interview" onImageClick={setModalImage} />
          </section>
          <section id="product-boss" className="section product-section">
            <ProductSection type="boss" onImageClick={setModalImage} />
          </section>
          <section id="product-jobChannel" className="section product-section">
            <ProductSection type="jobChannel" onImageClick={setModalImage} />
          </section>
          <section id="product-askBoss" className="section product-section">
            <ProductSection type="askBoss" onImageClick={setModalImage} />
          </section>

          {/* 城市站点板块 - 一级标题独立页面 */}
          <section id="city-title-section" className="section city-title-section">
            <CitySection type="title" />
          </section>

          {/* 城市站点板块 - 免费就业规划 */}
          <section id="city-career-planning" className="section city-section">
            <CitySection type="careerPlanning" onImageClick={setModalImage} />
          </section>

          {/* 报名板块 - 一级标题独立页面 */}
          <section id="enrollment-title-section" className="section enrollment-title-section">
            <EnrollmentSection type="title" />
          </section>

          {/* 报名板块 - 二级内容 */}
          <SectionWrapper theme="transparent" className="enrollment-content-wrapper">
            <EnrollmentSection id="enrollment-quota" type="quota" onImageClick={setModalImage} />
            <EnrollmentSection id="enrollment-process" type="process" onImageClick={setModalImage} />
          </SectionWrapper>
        </div>
      </SmoothScroll>

      {modalImage && (
        <ImageModal
          src={modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}

export default App;