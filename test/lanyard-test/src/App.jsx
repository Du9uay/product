import React, { useState } from 'react';
import TrueFocus from './components/TrueFocus';
import Lanyard from './components/Lanyard';
import './App.css';

function App() {
  const [showLanyard, setShowLanyard] = useState(false);
  const [showTrueFocus, setShowTrueFocus] = useState(true);

  const handleChoice = (choice) => {
    if (choice === 'change') {
      // 延迟显示Lanyard，让淡出动画先执行
      setTimeout(() => {
        setShowTrueFocus(false);
      }, 800);
      
      setTimeout(() => {
        setShowLanyard(true);
      }, 1200);
    } else {
      // 保持现状的处理
      setTimeout(() => {
        setShowTrueFocus(false);
        // 可以显示其他内容或提示
      }, 800);
    }
  };

  return (
    <div className="app-container">
      {showTrueFocus && (
        <TrueFocus onChoice={handleChoice} />
      )}

      {showLanyard && (
        <div className="lanyard-section">
          <h1 className="section-title">加入我们，成为校园合伙人</h1>
          <p className="section-subtitle">
            每一个改变都从这里开始，让我们一起创造更好的未来
          </p>
          <Lanyard isVisible={showLanyard} />
        </div>
      )}
    </div>
  );
}

export default App;