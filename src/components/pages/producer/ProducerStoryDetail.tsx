import React from 'react';
import { useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../../../types';

interface Story {
  _id: string;
  type: 'story';
  eventId: string;
  storyteller: string;
  timestamp: number;
  status: 'pending' | 'active' | 'complete';
  frozenScore?: {
    timestamp: number;
    averageScores: {
      [judgeId: string]: number;
    };
  };
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

const getScoreColor = (score: number, grey?: boolean): string => {
  if (score < 6) return 'text-red-500';
  if (score >= 9) return 'text-green-500';
  return grey ? 'text-gray-500' : 'text-blue-500';
};

const getScoreBackgroundColor = (score: number): string => {
  if (score < 6) return 'bg-red-900';
  if (score >= 9) return 'bg-green-900';
  return 'bg-blue-900';
};

interface JudgeScoreCardProps {
  judge?: Judge;
  scores: {
    storyContent: number;
    storytellingAbility: number;
    technical: number;
  };
}

const JudgeScoreCard: React.FC<JudgeScoreCardProps> = ({ judge, scores }) => {
  const averageScore = Number(((scores.storyContent + scores.storytellingAbility + scores.technical) / 3).toFixed(1));

  const getBackgroundColor = (score: number): string => {
    if (score < 5) return 'bg-red-900';
    if (score >= 9) return 'bg-green-900';
    return 'bg-blue-900';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="mb-2 text-gray-400 text-sm">Judge: {judge?.teamName}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <div className="text-gray-400 text-sm">Story Content:</div>
            <div className={`text-lg font-bold ${getScoreColor(scores.storyContent)}`}>
              {scores.storyContent}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Storytelling:</div>
            <div className={`text-lg font-bold ${getScoreColor(scores.storytellingAbility)}`}>
              {scores.storytellingAbility}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Technical:</div>
            <div className={`text-lg font-bold ${getScoreColor(scores.technical)}`}>
              {scores.technical}
            </div>
          </div>
        </div>
        <div className={`${getBackgroundColor(averageScore)} rounded-lg p-4 flex flex-col items-center justify-center`}>
          <div className="text-gray-200 text-sm mb-1">Average</div>
          <div className="text-4xl font-bold text-white">{averageScore}</div>
        </div>
      </div>
    </div>
  );
};

type FrozenScores = {
  _id: string;
  type: 'frozenScores';
  eventId: string;
  storyId: string;
  timestamp?: number;
  finalScore?: number;
  averageScores?: {
    [judgeId: string]: number;
  };
}

export const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  if (!eventId || !storyId) {
    throw new Error('Missing required parameters');
  }

  const { useDocument, useLiveQuery } = useFireproof(`events/${eventId}`);
  const { doc: story } = useDocument<Story>({ _id: storyId } as Story);

  const {
    doc: frozenScores,
    save: saveFrozenScores,
    remove: removeFrozenScores
  } = useDocument<FrozenScores>({
    _id: `${storyId}-frozen`,
    type: 'frozenScores',
    storyId,
    eventId,
  } as FrozenScores);

  // Query all scores for this story
  const { docs: scores } = useLiveQuery<ScoreDocument>(
    (doc) => [doc.type, doc.storyId],
    { key: ['score', storyId] }
  );

  const uniqueJudgeIds = new Set(scores.map(score => score.judgeId));

  const { docs: judges } = useLiveQuery<Judge>(
    '_id',
    { keys: Array.from(uniqueJudgeIds) }
  );

  const judgesById = new Map<string, Judge>(judges.map(judge => [judge._id, judge as Judge]));

  // Group scores by judgeId
  const scoresByJudge = React.useMemo(() => {
    const grouped = new Map<string, ScoreDocument[]>();
    scores.forEach(score => {
      if (!grouped.has(score.judgeId)) {
        grouped.set(score.judgeId, []);
      }
      grouped.get(score.judgeId)?.push(score);
    });
    return grouped;
  }, [scores]);

  const calculateAverageScores = () => {
    const averageScores: { [judgeId: string]: number } = {};
    scoresByJudge.forEach((judgeScores, judgeId) => {
      const total = judgeScores.reduce((sum, score) => sum + score.value, 0);
      averageScores[judgeId] = Number((total / judgeScores.length).toFixed(1));
    });
    return averageScores;
  };

  const handleFreezeScores = async () => {
    if (!story) return;
    const averageScores = calculateAverageScores();
    const finalScore = Object.values(averageScores).reduce((sum, score) => sum + score, 0) / Object.values(averageScores).length;

    saveFrozenScores({
      ...frozenScores,
      finalScore,
      averageScores,
      timestamp: Date.now()
    })
  };

  const handleUnfreezeScores = async () => {
    removeFrozenScores();
  };

  const frozenScoresList = useLiveQuery<FrozenScores>('finalScore');
  console.log({frozenScoresList : frozenScoresList.docs});

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-4xl font-medium">Storyteller: {story.storyteller}</h1>
        <p className="text-gray-400 text-sm text-right">{new Date(story.timestamp).toLocaleString()}</p>
      </div>

      {frozenScores.timestamp && frozenScores.averageScores && frozenScores.finalScore && (
        <div className={`bg-gray-800 rounded-lg p-6 mb-6 relative`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl text-white font-semibold">Frozen Score</h2>
              <p className="text-gray-400 text-sm">Frozen at: {new Date(frozenScores.timestamp).toLocaleString()}</p>
            </div>
            <div className={`${getScoreBackgroundColor(frozenScores.finalScore)} rounded-lg p-4 shadow-lg`}>
             <div className="text-gray-200 font-medium mb-1"> Final Score</div>
              <div className={`text-3xl font-bold ${getScoreColor(frozenScores.finalScore)}`}>
                {frozenScores.finalScore}
              </div>
            </div>
          </div>
          <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-600">
                <th className="text-left text-gray-200 font-medium p-3">Judge</th>
                <th className="text-left text-gray-200 font-medium p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(frozenScores.averageScores).map(([judgeId, score], index) => (
                <tr key={judgeId} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600/50'}>
                  <td className="text-gray-200 font-medium p-3">{judgesById.get(judgeId)?.teamName}</td>
                  <td className="p-3">
                    <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        {!frozenScores.timestamp ? (
          <button
            onClick={handleFreezeScores}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Freeze Scores
          </button>
        ) : (
          <button
            onClick={handleUnfreezeScores}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Unfreeze Scores
          </button>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl text-gray-200 mb-4">Judge Scores</h2>
        {Array.from(scoresByJudge.entries()).map(([judgeId, judgeScores]) => (
          <JudgeScoreCard
            key={judgeId}
            judge={judgesById.get(judgeId)}
            scores={{
              storyContent: judgeScores.find(score => score.category === 'storyContent')?.value || 0,
              storytellingAbility: judgeScores.find(score => score.category === 'storytellingAbility')?.value || 0,
              technical: judgeScores.find(score => score.category === 'technical')?.value || 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProducerStoryDetail;
