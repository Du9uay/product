import React, { useEffect, useRef, useState } from 'react';
import ImagePreview from '../ImagePreview';
import './ProductSection.css';

const ProductSection = ({ type, onImageClick }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const titleRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
    setPreviewImage(imageSrc);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  if (type === 'title') {
    return (
      <div ref={titleRef} className="product-title-content fade-in">
        <h2>产品介绍</h2>
      </div>
    );
  }

  if (type === 'intro') {
    return (
      <>
      <div className="product-content">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">简介</h3>
          <p className="product-description">
            我们的<span className="highlight-box">"企业订单班"</span>可以让你在找工作的时候<span className="highlight-box">快人一步</span>
          </p>
          <p className="product-subdesc">
            这是<span className="highlight-box">央视报道</span>的新型就业服务平台
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            我们的"企业订单班"与2700家企业合作、与企业共同教学，共同管理，共同就业
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          {/* 本地视频播放 */}
          <div className="product-video" style={{width: '100%', height: '400px', position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#000'}}>
            <video
              src="/央视关注苏州高校搭建_20251015093112.mp4"
              controls
              style={{width: '100%', height: '100%', objectFit: 'contain'}}
              title="产品介绍视频"
            >
              您的浏览器不支持视频播放
            </video>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  if (type === 'enterprise') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-enterprise">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">企业资源</h3>
          <p className="product-description">
          国内外合作企业超2700+
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/国内企业.png')}>
              <img src="/images/国内企业.png" alt="国内企业" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/海外企业.png')}>
              <img src="/images/海外企业.png" alt="海外企业" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  if (type === 'positions') {
    return (
      <>
      <div className="product-content">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">岗位资源</h3>
          <p className="product-description">
            <span className="highlight-box">企业的很多好岗位是不对社会公开招聘的</span>
          </p>
          <p className="product-subdesc">
            我们合作的企业前50％岗位只从我们的学员里挑选
          </p>
          {/* 插入岗位资源图片 */}
          <div className="product-inline-image" style={{marginTop: '20px', marginBottom: '20px'}} onClick={() => handleImageClick('/images/岗位资源.png')}>
            <img src="/images/岗位资源.png" alt="岗位资源" style={{width: '100%', maxWidth: '500px', cursor: 'pointer', borderRadius: '8px'}} />
          </div>
          <p className="product-subdesc">
            每个"企业订单班"都是<span className="highlight-box">对标40多个岗位</span>，有很多都是学生所学专业去不了的岗位，右侧为我们“订单班”往届学员的就业榜单
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/智能开发-就业榜.png')}>
              <img src="/images/智能开发-就业榜.png" alt="智能开发就业榜" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/视觉设计-就业榜.png')}>
              <img src="/images/视觉设计-就业榜.png" alt="视觉设计就业榜" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/智能制造-就业榜.png')}>
              <img src="/images/智能制造-就业榜.png" alt="智能制造就业榜" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/财经商贸-就业榜.png')}>
              <img src="/images/财经商贸-就业榜.png" alt="财经商贸就业榜" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  if (type === 'useful') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-teaching">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">大专生学什么知识才能找到好工作？</h3>

          {/* 企业生产流程部分 - 左右并排 */}
          <div style={{marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '30px'}}>
            {/* 左侧文字 */}
            <div style={{flex: '1'}}>
              <h4 className="highlight-box" style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px', display: 'inline-block'}}>
                企业生产流程
              </h4>
              <p className="product-subdesc">
                学生是不知道现在企业是怎样运作的、部门之间怎么协作的；
              </p>
              <p className="product-subdesc" style={{marginTop: '10px'}}>
              进入“订单班”即跨入职场，专家团队会给学员教授企业中各个部门的工作流程，只给学员教授未来工作中需要的实际技能。
              </p>
            </div>
            {/* 右侧图片 */}
            <div className="product-inline-image" style={{flex: '0 0 45%'}} onClick={() => handleImageClick('/images/企业生产流程.png')}>
              <img src="/images/企业生产流程.png" alt="企业生产流程" style={{width: '100%', cursor: 'pointer', borderRadius: '8px'}} />
            </div>
          </div>

          {/* 重点技术及概念部分 - 左右并排 */}
          <div style={{clear: 'both', marginTop: '40px', display: 'flex', alignItems: 'center', gap: '30px'}}>
            {/* 左侧图片 */}
            <div className="product-inline-image" style={{flex: '0 0 45%'}} onClick={() => handleImageClick('/images/重点技术及概念.png')}>
              <img src="/images/重点技术及概念.png" alt="重点技术及概念" style={{width: '100%', cursor: 'pointer', borderRadius: '8px'}} />
            </div>
            {/* 右侧文字 */}
            <div style={{flex: '1'}}>
              <h4 className="highlight-box" style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px', display: 'inline-block'}}>
                重点技术及概念
              </h4>
              <p className="product-subdesc">
              学生在校内学不到企业正在应用的最新技术
              </p>
              <p className="product-subdesc" style={{marginTop: '10px'}}>
              我们的企业技术专家会为学员详细讲解每个工作环节中的实际应用的重点知识，只教实际工作中用得到的，不教用不到的
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  if (type === 'ai') {
    return (
      <>
      <div className="product-content" id="product-ai">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">掌握AI</h3>
          <p className="product-description">
            学生在校期间，只有一些文本类的作业会使用豆包、deepseek等AI工具，如何将AI运用到自己未来的工作中，学生是不了解的。
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
          - 我们的专家团队会把工作中的AI工作流程教给学员，很多具体的工作，让Agent（智能体）干，学员只需要审核AI提交的答卷即可。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/agent_2.png')}>
              <img src="/images/agent_2.png" alt="AI工作流程" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  if (type === 'career') {
    return (
      <>
      <div className="product-content" id="product-career">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">工作门道</h3>
          <p className="product-description">
            学校老师没有进过企业，当然就无法给学生讲解企业中的各种隐晦门道以及捷径。
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            "订单班"的专家有着大量的工作案例，可以帮助学员深入了解企业中的关键技术、晋升捷径、工作窍门等。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/工作门道.png')}>
              <img src="/images/工作门道.png" alt="工作门道" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块1: 学生有能力写好简历吗？
  if (type === 'resume') {
    return (
      <>
      <div className="product-content">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">学生有能力写好简历吗？</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            写简历不是件容易的事，因为<span className="highlight-box">必须得按照企业的招聘需求来写</span>学生从来没接触过企业，很难知道企业的需求，当然也就没有写好简历的能力，而我们的专家会针对每个"订单班"撰写<span className="highlight-box">40多份不同岗位的定制简历</span>
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
           <span className="highlight-box">简历中没有项目经历——就是张废纸</span>。而我们的专家团队为学员提供<span className="highlight-box">20+个重要项目案例</span>，这些项目可以直接写入简历，成为简历中出彩的一笔。
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            普通大专毕业生找工作时，几乎都没有作品集，而<span className="highlight-box">作品是企业验证你能力的重要证明</span>。我们的专家团队会为学员提供精美的作品集模板，学员可以制作独属自己的作品集。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/学生有能力写好简历吗？1.png')}>
              <img src="/images/学生有能力写好简历吗？1.png" alt="定制简历" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/学生有能力写好简历吗？2.png')}>
              <img src="/images/学生有能力写好简历吗？2.png" alt="项目案例" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/学生有能力写好简历吗？3.png')}>
              <img src="/images/学生有能力写好简历吗？3.png" alt="作品集模板" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/学生有能力写好简历吗？4.png')}>
              <img src="/images/学生有能力写好简历吗？4.png" alt="作品展示" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块2: 大专生唯一逆风翻盘的本领就是利用AI的能力
  if (type === 'aiPower') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-aiPower">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">大专生唯一逆风翻盘的本领就是利用AI的能力</h3>
          <p className="product-description">
            学校里都是重理论教学，老师不知道AI工具在企业工作中的最新应用
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            我们的专家会在课后给学员提供<span className="highlight-box">Agent（智能体）的提示词工程文件</span>，Agent就是数字员工，而学员是"BOSS"，学员可以根据自己的想法微调提示词，然后一键生成自己想要的内容。
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            学员通过AI完成项目，<span className="highlight-box">学起来轻松，用起来方便，更能培养个人的"项目思维"</span>。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/学校里会教怎么用AI做项目吗？1.png')}>
              <img src="/images/学校里会教怎么用AI做项目吗？1.png" alt="AI工具应用" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/学校里会教怎么用AI做项目吗？2.png')}>
              <img src="/images/学校里会教怎么用AI做项目吗？2.png" alt="Agent智能体" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块3: 学生能有清晰的就业规划吗？
  if (type === 'careerPlan') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-careerPlan">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">学生能有清晰的就业规划吗？</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            很多学生在毕业时发现自己的专业知识掌握的不扎实，<span className="highlight-box">找不到工作怎么办</span>？或者学了一两年专业课程，突然发现自己不喜欢所学的专业，<span className="highlight-box">想换专业又不知道学什么，怎么办</span>？
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            我们的专家团队中有企业的HR，会专门帮助学员定制自己的<span className="highlight-box">「求职策略」</span>，让学员知道自己能去哪些企业，能干哪些工作，以及几年后的工作晋升路径。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/学生能有清晰的就业规划吗？.png')}>
              <img src="/images/学生能有清晰的就业规划吗？.png" alt="就业规划" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/学生能有清晰的就业规划吗？2.png')}>
              <img src="/images/学生能有清晰的就业规划吗？2.png" alt="求职策略" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块4: 现在的大多数学生都不知道如何参加面试
  if (type === 'interview') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-interview">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">现在的大多数学生都不知道如何参加面试</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            企业的面试，和<span className="highlight-box">学校里社团招新的面试根本不是一个level</span>；
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            学校教给在校生的面试技巧没啥用，因为<span className="highlight-box">校园里的老师压根没在企业里干过人事工作</span>，不了解企业的招聘与面试流程；
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            我们的指导老师有着丰富的人事经验，会在学员临近毕业时，<span className="highlight-box">在线下对学员进行面试演练</span>；
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/现在的大多数学生都不知道如何参加面试.png')}>
              <img src="/images/现在的大多数学生都不知道如何参加面试.png" alt="面试演练" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块5: 跟着"老板"提前进入社会
  if (type === 'boss') {
    return (
      <>
      <div className="product-content" id="product-boss">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">跟着"老板"提前进入社会</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            "订单班"定期会有<span className="highlight-box">线下企业董事长、企业高管的交流会</span>，多见见<span className="highlight-box">"未来的老板"</span>，多听听<span className="highlight-box">"工作门道"</span>，这种经验不是普通渠道能够获取到的。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/跟着\u201c老板\u201d提前进入社会.png')}>
              <img src="/images/跟着老板提前进入社会.png" alt="企业高管交流会" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块6: 求职渠道千万种，你知道哪儿的资源多吗？
  if (type === 'jobChannel') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-jobChannel">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">求职渠道千万种，你知道哪儿的资源多吗？</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            毕业季来临，学生在BOSS、智联招聘、猎聘等主流招聘平台上投简历，<span className="highlight-box">竞争非常激烈</span>，应届大专生往往会和<span className="highlight-box">985/211的本科生，与研究生，与有工作经验的人同台竞争</span>，压力之大可想而知；
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            我们的"订单班"会为学员提供相关合作企业的岗位，<span className="highlight-box">这些岗位不对外公开，竞争压力非常低</span>。
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            因为"订单班"教学内容涵盖企业生产全流程，能极大提高学员的复合能力，所以合作企业也会为我们的学员开放<span className="highlight-box">"储备干部"、"管培生"等优质管理岗位</span>。
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/专属大专生的优质岗位资源，竞争性不激烈1.png')}>
              <img src="/images/专属大专生的优质岗位资源，竞争性不激烈1.png" alt="优质岗位资源1" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/专属大专生的优质岗位资源，竞争性不激烈2.png')}>
              <img src="/images/专属大专生的优质岗位资源，竞争性不激烈2.png" alt="优质岗位资源2" />
            </div>
            <div className="product-image" onClick={() => handleImageClick('/images/专属大专生的优质岗位资源，竞争性不激烈3.png')}>
              <img src="/images/专属大专生的优质岗位资源，竞争性不激烈3.png" alt="优质岗位资源3" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  // 板块7: 在学校也可以向"BOSS"问问题
  if (type === 'askBoss') {
    return (
      <>
      <div className="product-content product-content-vertical" id="product-askBoss">
        <div className="product-left slide-in-left" ref={leftRef}>
          <h3 className="product-title">在学校也可以向"BOSS"问问题</h3>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            学校老师没有企业一线的工作经验，对于企业的实际生产流程了解较少，很难对学生提供一线的建议；
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
            在我们的"订单班"教务系统中有<span className="highlight-box">「专家支持中心」</span>
          </p>
          <p className="product-subdesc" style={{marginTop: '20px'}}>
          学员可以<span className="highlight-box">直面专家，获得当下学习以及未来工作上的专业建议</span>
          </p>
        </div>
        <div className="product-right slide-in-right" ref={rightRef}>
          <div className="product-images">
            <div className="product-image" onClick={() => handleImageClick('/images/现在很多学生出现问题都不知道问谁.png')}>
              <img src="/images/现在很多学生出现问题都不知道问谁.png" alt="专家支持中心" />
            </div>
          </div>
        </div>
      </div>
      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt="Product Image"
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
      </>
    );
  }

  return null;
};

export default ProductSection;