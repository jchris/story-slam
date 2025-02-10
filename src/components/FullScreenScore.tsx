import React from 'react';

interface FullScreenScoreProps {
  score: number;
  onClose: () => void;
}

const FullScreenScore: React.FC<FullScreenScoreProps> = ({ score, onClose }) => {
  const getScoreColor = (score: number): string => {
    if (score < 6) return 'text-red-500';
    if (score >= 9) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex justify-center items-center z-50 cursor-pointer"
      onClick={onClose}
    >
      <div className={`text-[25vh] font-bold font-sans text-center leading-none p-5 rounded-2xl ${getScoreColor(score)}`}>
        {score.toFixed(1)}
      </div>
    </div>
  );
};

export default FullScreenScore;
