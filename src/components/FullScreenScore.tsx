import React from 'react';
import './FullScreenScore.css';

interface FullScreenScoreProps {
  score: number;
  onClose: () => void;
}

const FullScreenScore: React.FC<FullScreenScoreProps> = ({ score, onClose }) => {
  const getScoreClass = (score: number): string => {
    if (score < 5) return 'low';
    if (score >= 9) return 'high';
    return 'medium';
  };

  return (
    <div className="fullscreen-score" onClick={onClose}>
      <div className={`score ${getScoreClass(score)}`}>
        {score.toFixed(1)}
      </div>
    </div>
  );
};

export default FullScreenScore;
