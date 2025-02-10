import React, { useState, useEffect } from 'react';
import FullScreenScore from './FullScreenScore';

interface ScoreCategory {
  [key: string]: number;
}

interface Scores {
  storyContent: ScoreCategory;
  storytellingAbility: ScoreCategory;
  technical: ScoreCategory;
}

const ScoringInterface: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    storyContent: {
      compelling: 7,
      clearArc: 7,
      emotional: 7,
      authentic: 7,
    },
    storytellingAbility: {
      delivery: 7,
      stagePresence: 7,
      audience: 7,
      narrative: 7,
    },
    technical: {
      timing: 7,
      theme: 7,
      noNotes: 7,
    }
  });

  const [totalScore, setTotalScore] = useState<number>(0);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const allScores = [
      ...Object.values(scores.storyContent),
      ...Object.values(scores.storytellingAbility),
      ...Object.values(scores.technical),
    ];
    const average = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    setTotalScore(Number(average.toFixed(2)));
  }, [scores]);

  const getScoreColor = (score: number): string => {
    if (score < 5) return 'text-red-500';
    if (score >= 9) return 'text-green-500';
    return 'text-blue-500';
  };

  const handleScoreChange = (category: keyof Scores, subcategory: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: value
      }
    }));
  };

  const renderScoreSection = (title: string, category: keyof Scores, subcategories: { [key: string]: number }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl text-gray-800 mb-6">{title}</h2>
      {Object.entries(subcategories).map(([name, value]) => (
        <div key={name} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700">{name}</label>
            <span className={`font-bold ${getScoreColor(value)}`}>
              {value}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => handleScoreChange(category, name, Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl text-gray-800 text-center mb-8">The Moth Story Scoring</h1>
      
      {renderScoreSection('Story Content', 'storyContent', scores.storyContent)}
      {renderScoreSection('Storytelling Ability', 'storytellingAbility', scores.storytellingAbility)}
      {renderScoreSection('Technical Aspects', 'technical', scores.technical)}

      <div className="text-center">
        <div className="text-2xl font-bold mb-4">
          Total Score: <span className={getScoreColor(totalScore)}>{totalScore}</span>
        </div>
        <button
          onClick={() => setShowFullScreen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Show Full Screen
        </button>
      </div>

      {showFullScreen && (
        <FullScreenScore
          score={totalScore}
          onClose={() => setShowFullScreen(false)}
        />
      )}
    </div>
  );
};

export default ScoringInterface;
