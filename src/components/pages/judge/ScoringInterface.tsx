import React, { useState, useEffect } from 'react';
import FullScreenScore from '../../FullScreenScore';

interface ScoreCategory {
  value: number;
}

interface Scores {
  storyContent: ScoreCategory;
  storytellingAbility: ScoreCategory;
  technical: ScoreCategory;
}

const ScoringInterface: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    storyContent: {
      value: 7,
    },
    storytellingAbility: {
      value: 7,
    },
    technical: {
      value: 7,
    }
  });

  const [totalScore, setTotalScore] = useState<number>(0);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const allScores = [
      scores.storyContent.value,
      scores.storytellingAbility.value,
      scores.technical.value,
    ];
    const average = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    setTotalScore(Number(average.toFixed(2)));
  }, [scores]);

  const getScoreColor = (score: number): string => {
    if (score < 5) return 'text-red-500';
    if (score >= 9) return 'text-green-500';
    return 'text-blue-500';
  };

  const handleScoreChange = (category: keyof Scores, value: number) => {
    setScores(prev => ({
      ...prev,
      [category]: {
        value
      }
    }));
  };

  const renderScoreSection = (title: string, category: keyof Scores, description: string, value: number) => (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-xl text-gray-200 mb-4">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`font-bold ${getScoreColor(value)}`}>
            {value}
          </span>
        </div>
        <input
          type="range"
          step="0.1"
          min="1"
          max="10"
          value={value}
          onChange={(e) => handleScoreChange(category, Number(e.target.value))}
          onMouseUp={(e) => console.log(`${category} score: ${value}`)}
          className="w-full accent-blue-500"
        />
      </div>
    </div>  
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl text-gray-200 text-center mb-8">The Moth Story Scoring</h1>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        {renderScoreSection(
          'Story Content',
          'storyContent',
          'Rate how compelling, clear, emotional, and authentic the story content is',
          scores.storyContent.value
        )}
        {renderScoreSection(
          'Storytelling Ability',
          'storytellingAbility',
          'Evaluate the delivery, stage presence, audience engagement, and narrative flow',
          scores.storytellingAbility.value
        )}
        {renderScoreSection(
          'Technical Aspects',
          'technical',
          'Assess timing, theme adherence, and presentation without notes',
          scores.technical.value
        )}

        <div className="text-center pt-4 border-t border-gray-700">
          <div className="text-2xl font-bold mb-4 text-gray-200">
            Total Score: <span className={getScoreColor(totalScore)}>{totalScore}</span>
          </div>
          <button
            onClick={() => setShowFullScreen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Show Full Screen Score
          </button>
        </div>
      </div>

      {showFullScreen && (
        <FullScreenScore score={totalScore} onClose={() => setShowFullScreen(false)} />
      )}
    </div>
  );
};

export default ScoringInterface;
