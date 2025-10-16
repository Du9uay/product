import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImagePreview from '../ImagePreview';
import './PainPointSection.css';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 图片URL映射表
const imageUrlMap = {
  'p_2.png': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjrzTxE.png',
  'p_3.png': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjrNSWN.png',
  '吉祥三宝.PNG': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjr1nCq.PNG',
  '铁人三项.PNG': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjrChTT.PNG',
  '新时代的三宝.PNG': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjrIctv.PNG',
  '校招.JPEG': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjrgOw1.JPEG',
  '专升本到底怎么样？.png': 'https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/img/product-introduce/recuZHbOjroDJL.png'
};

function PainPointSection({ id, number, title, mainText, description, solution, emoji, emojiText, images, onImageClick }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 处理图片点击
  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
    setIsPreviewOpen(true);
  };

  // 关闭预览
  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    // 检测是否为移动端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    let ctx = gsap.context(() => {
      // 移动端：禁用ScrollTrigger动画，直接显示内容
      if (isMobile) {
        if (leftRef.current) {
          gsap.set(leftRef.current, { x: 0, opacity: 1 });
        }
        if (rightRef.current) {
          gsap.set(rightRef.current, { x: 0, opacity: 1 });
        }
      } else {
        // PC端：启用ScrollTrigger动画
        // 左侧内容动画
        if (leftRef.current) {
          gsap.fromTo(leftRef.current,
            {
              x: -50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: leftRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // 右侧内容动画
        if (rightRef.current) {
          gsap.fromTo(rightRef.current,
            {
              x: 50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rightRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }

      // 如果有图片，并且不是使用三图布局的section，添加拖拽功能
      if (images && images.length > 0 && rightRef.current && number !== '1' && number !== '2') {
        const imagesContainer = rightRef.current.querySelector('.pain-point-images');

        if (imagesContainer) {
          let isMouseDown = false;
          let startX;
          let scrollLeft;

          // 鼠标按下
          imagesContainer.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            imagesContainer.style.cursor = 'grabbing';
            startX = e.pageX - imagesContainer.offsetLeft;
            scrollLeft = imagesContainer.scrollLeft;
          });

          // 鼠标离开
          imagesContainer.addEventListener('mouseleave', () => {
            isMouseDown = false;
            imagesContainer.style.cursor = 'grab';
          });

          // 鼠标松开
          imagesContainer.addEventListener('mouseup', () => {
            isMouseDown = false;
            imagesContainer.style.cursor = 'grab';
          });

          // 鼠标移动
          imagesContainer.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - imagesContainer.offsetLeft;
            const walk = (x - startX) * 2; // 调整滚动速度
            imagesContainer.scrollLeft = scrollLeft - walk;
          });

          // 设置初始光标
          imagesContainer.style.cursor = 'grab';
        }
      }
    });

    // 清理函数 - 只清理当前组件的动画
    return () => ctx.revert();
  }, [images]);

  // 处理mainText中的highlight-box
  const renderMainText = () => {
    if (typeof mainText === 'string') {
      return <span className="highlight-box">{mainText}</span>;
    }
    return mainText;
  };

  // 处理description中的strong标签和换行
  const renderDescription = () => {
    if (typeof description === 'string') {
      // 先按换行符分割
      const lines = description.split('\n');
      return lines.map((line, lineIndex) => {
        // 对每一行处理强调文本
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const lineContent = parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        // 添加换行符（除了最后一行）
        return (
          <React.Fragment key={lineIndex}>
            {lineContent}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      });
    }
    return description;
  };

  // 处理solution中的markdown粗体
  const renderSolution = () => {
    if (typeof solution === 'string') {
      // 查找并替换强调文本
      const parts = solution.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    }
    return solution;
  };

  // 如果有emoji，显示emoji装饰
  const renderRightContent = () => {
    if (emoji && emojiText) {
      return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', padding: '40px'}}>
          <div style={{textAlign: 'center'}}>
            <p style={{fontSize: '4rem', marginBottom: '20px'}}>{emoji}</p>
            <p style={{fontSize: '1.5rem', color: 'var(--text-muted)'}}>
              {emojiText.split('\\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < emojiText.split('\\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      );
    } else if (images && images.length > 0) {
      // 判断是否使用三图并排布局（第一个和第二个section）
      const useThreeGrid = number === '1' || number === '2';
      const imagesClassName = useThreeGrid ? 'pain-point-images three-grid' : 'pain-point-images';

      return (
        <div className="pain-point-images-wrapper">
          <div className={imagesClassName}>
            {images.map((img, index) => (
              <div
                key={index}
                className="pain-point-image"
                onClick={(e) => {
                  // 对于三图布局，直接点击即可；对于拖拽布局，需要检查是否在拖拽中
                  if (useThreeGrid || !e.target.closest('.pain-point-images').classList.contains('grabbing')) {
                    handleImageClick(imageUrlMap[img] || img);
                  }
                }}
              >
                <img src={imageUrlMap[img] || img} alt={`${title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div id={id} className="pain-point-content">
        <div className="pain-point-left" ref={leftRef}>
          <div className="pain-point-number">{number}</div>
          <h3 className="pain-point-title">{title}</h3>
          <p className="pain-point-description">
            {renderMainText()}
          </p>
          <p className="pain-point-subdesc">
            {renderDescription()}
          </p>
          {solution && (
            <p className="pain-point-subdesc" style={{marginTop: '8px'}}>
              {renderSolution()}
            </p>
          )}
        </div>
        <div className="pain-point-right" ref={rightRef}>
          {renderRightContent()}
        </div>
      </div>

      {/* 图片预览组件 */}
      <ImagePreview
        src={previewImage}
        alt={title}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </>
  );
}

export default PainPointSection;