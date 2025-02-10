import React, { useState, useEffect } from 'react';
import FullScreenScore from './FullScreenScore';
import './ScoringInterface.css';

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

  const getScoreClass = (score: number): string => {
    if (score < 5) return 'low';
    if (score >= 9) return 'high';
    return 'medium';
  };

  const handleScoreChange = (
    category: keyof Scores,
    subcategory: string,
    value: string
  ): void => {
    setScores(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: Number(value)
      }
    }));
  };

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  const renderSlider = (
    category: keyof Scores,
    subcategory: string,
    label: string
  ) => {
    const score = scores[category][subcategory];
    const scoreClass = getScoreClass(score);
    
    return (
      <div className="slider-container" key={`${category}-${subcategory}`}>
        <label>
          {label}
          <span className={`score-value ${scoreClass}`}>{score}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={score}
          onChange={(e) => handleScoreChange(category, subcategory, e.target.value)}
          className={`slider ${scoreClass}`}
        />
      </div>
    );
  };

  return (
    <>
      {showFullScreen && (
        <FullScreenScore 
          score={totalScore} 
          onClose={toggleFullScreen}
        />
      )}
      <div className="scoring-interface">
        <h1>The Moth Story Scoring</h1>
        
        <div className="scoring-section">
          <h2>Story Content</h2>
          {renderSlider('storyContent', 'compelling', 'Compelling & Engaging')}
          {renderSlider('storyContent', 'clearArc', 'Clear Arc (Beginning, Middle, End)')}
          {renderSlider('storyContent', 'emotional', 'Emotional Resonance')}
          {renderSlider('storyContent', 'authentic', 'Authenticity & Personal Touch')}
        </div>

        <div className="scoring-section">
          <h2>Storytelling Ability</h2>
          {renderSlider('storytellingAbility', 'delivery', 'Vocal Delivery & Pacing')}
          {renderSlider('storytellingAbility', 'stagePresence', 'Body Language & Stage Presence')}
          {renderSlider('storytellingAbility', 'audience', 'Audience Connection')}
          {renderSlider('storytellingAbility', 'narrative', 'Narrative Structure & Details')}
        </div>

        <div className="scoring-section">
          <h2>Technical Aspects</h2>
          {renderSlider('technical', 'timing', 'Time Management')}
          {renderSlider('technical', 'theme', 'Theme Adherence')}
          {renderSlider('technical', 'noNotes', 'Delivery Without Notes')}
        </div>

        <div className="total-score" onClick={toggleFullScreen}>
          <h2 className={getScoreClass(totalScore)}>Total Score: {totalScore}</h2>
        </div>
      </div>
    </>
  );
};

export default ScoringInterface;
