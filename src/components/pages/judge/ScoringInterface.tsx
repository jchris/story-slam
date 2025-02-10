import React, { useEffect, useState } from 'react';
import { useFireproof } from 'use-fireproof';
import FullScreenScore from '../../FullScreenScore';

interface Story {
  _id: string;
  type: 'story';
  eventId: string;
  storyteller: string;
  timestamp: number;
  status: 'pending' | 'active' | 'complete';
}

interface ScoreDocument {
  _id: string;
  type: 'score';
  eventId: string;
  judgeId: string;
  storyId: string;
  category: string;
  value: number;
  timestamp?: number;
}

interface Props {
  eventId: string;
  judgeId: string;
  storyId: string;
}

const ScoringInterface: React.FC<Props> = ({ eventId, judgeId, storyId }) => {
  const { useDocument } = useFireproof(`events/${eventId}`);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Fetch the story document
  const { doc: story } = useDocument<Story>({ _id: storyId } as Story);

  // Create or load documents for each score category
  const { doc: storyContentScore, merge: mergeStoryContent, save: saveStoryContent } = useDocument<ScoreDocument>({
    _id: `score:${eventId}:${judgeId}:${storyId}:storyContent`,
    type: 'score',
    eventId,
    judgeId,
    storyId,
    category: 'storyContent',
    value: 8
  });

  const { doc: storytellingScore, merge: mergeStorytelling, save: saveStorytelling } = useDocument<ScoreDocument>({
    _id: `score:${eventId}:${judgeId}:${storyId}:storytellingAbility`,
    type: 'score',
    eventId,
    judgeId,
    storyId,
    category: 'storytellingAbility',
    value: 8
  });

  const { doc: technicalScore, merge: mergeTechnical, save: saveTechnical } = useDocument<ScoreDocument>({
    _id: `score:${eventId}:${judgeId}:${storyId}:technical`,
    type: 'score',
    eventId,
    judgeId,
    storyId,
    category: 'technical',
    value: 8
  });

  useEffect(() => {
    if (storyContentScore && storytellingScore && technicalScore) {
      const allScores = [
        storyContentScore.value,
        storytellingScore.value,
        technicalScore.value,
      ];
      const average = allScores.reduce((a, b) => a + b, 0) / allScores.length;
      setTotalScore(Number(average.toFixed(2)));
    }
  }, [storyContentScore, storytellingScore, technicalScore]);

  const getScoreColor = (score: number, grey?: boolean): string => {
    if (score < 6) return 'text-red-500';
    if (score >= 9) return 'text-green-500';
    return grey ? 'text-gray-500' : 'text-blue-500';
  };

  const handleScoreChange = (category: string, value: number) => {
    const newValue = Number(value);
    switch (category) {
      case 'storyContent':
        mergeStoryContent({ value: newValue, timestamp: Date.now() });
        break;
      case 'storytellingAbility':
        mergeStorytelling({ value: newValue, timestamp: Date.now() });
        break;
      case 'technical':
        mergeTechnical({ value: newValue, timestamp: Date.now() });
        break;
    }
  };

  const handleScoreSave = (category: string) => {
    switch (category) {
      case 'storyContent':
        saveStoryContent();
        break;
      case 'storytellingAbility':
        saveStorytelling();
        break;
      case 'technical':
        saveTechnical();
        break;
    }
  };

  const renderScoreSection = (title: string, category: string, description: string, scoreDoc: ScoreDocument | null) => {
    if (!scoreDoc) return null;
    console.log(scoreDoc);
    return (
      <div className="mb-8">
        <h2 className="text-xl text-gray-200 mb-4">{title}</h2>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`font-bold ${getScoreColor(scoreDoc.value, !scoreDoc.timestamp)}`}>
              {scoreDoc.value}
            </span>
          </div>
          <input
            type="range"
            step="0.1"
            min="2"
            max="10"
            value={scoreDoc.value}
            onChange={(e) => handleScoreChange(category, Number(e.target.value))}
            onMouseUp={() => handleScoreSave(category)}
            className="w-full accent-blue-500"
          />
        </div>
      </div>
    );
  };

  if (!storyContentScore || !storytellingScore || !technicalScore) {
    return <div className="text-white">Loading scores...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Story Information */}
      {story && (
        <div className="p-4 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Story Information</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Storyteller:</span> {story.storyteller}</p>
            <p><span className="font-semibold">Time:</span> {new Date(story.timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}
      
      {/* Existing scoring interface content */}
      <div className="max-w-3xl mx-auto p-8 bg-gray-900 min-h-screen">
        <h1 className="text-3xl text-gray-200 text-center mb-8">Story Scoring</h1>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          {renderScoreSection(
            'Story Content',
            'storyContent',
            'Rate how compelling, clear, emotional, and authentic the story content is',
            storyContentScore
          )}
          {renderScoreSection(
            'Storytelling Ability',
            'storytellingAbility',
            'Evaluate the delivery, stage presence, audience engagement, and narrative flow',
            storytellingScore
          )}
          {renderScoreSection(
            'Technical Aspects',
            'technical',
            'Assess timing, theme adherence, and presentation without notes',
            technicalScore
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
    </div>
  );
};

export default ScoringInterface;
