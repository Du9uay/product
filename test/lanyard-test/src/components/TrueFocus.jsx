import React, { useState } from 'react';
import './TrueFocus.css';

const TrueFocus = ({ onChoice }) => {
  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setIsChoosing(true);

    // 触发动画后回调
    setTimeout(() => {
      onChoice(choice);
    }, 500);
  };

  return (
    <div className={`true-focus-container ${isChoosing ? 'choosing' : ''}`}>
      <div className="true-focus-wrapper">
        <div
          className={`choice-card ${selectedChoice === 'status' ? 'selected' : ''} ${selectedChoice === 'change' ? 'not-selected' : ''}`}
          onClick={() => handleChoice('status')}
        >
          <div className="choice-content">
            <span className="choice-text">保持现状</span>
          </div>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div
          className={`choice-card ${selectedChoice === 'change' ? 'selected' : ''} ${selectedChoice === 'status' ? 'not-selected' : ''}`}
          onClick={() => handleChoice('change')}
        >
          <div className="choice-content">
            <span className="choice-text">改变未来</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFocus;