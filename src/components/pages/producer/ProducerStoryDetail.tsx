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

// const getScoreColor = (score: number, grey?: boolean): string => {
//   if (score < 6) return 'text-red-500';
//   if (score >= 9) return 'text-green-500';
//   return grey ? 'text-gray-500' : 'text-blue-500';
// };

const getScoreBackgroundColor = (score: number): string => {
  if (score < 3) return 'bg-red-800';
  if (score < 5) return 'bg-red-700';
  if (score < 7) return 'bg-yellow-700';
  if (score < 8.5) return 'bg-green-700';
  return 'bg-green-800';
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

  return (
    <div className={`${getScoreBackgroundColor(averageScore)} rounded-lg p-4 mb-4`}>
      <div className="mb-2 text-gray-200 text-sm">Judge: {judge?.teamName}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <div className="text-gray-300 text-sm">Story Content:</div>
            <div className="text-lg font-bold text-white">
              {scores.storyContent}
            </div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Storytelling:</div>
            <div className="text-lg font-bold text-white">
              {scores.storytellingAbility}
            </div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Technical:</div>
            <div className="text-lg font-bold text-white">
              {scores.technical}
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-20 rounded-lg p-4 flex flex-col items-center justify-center">
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
      console.log('judgeScores', judgeId, judgeScores);
      const total = judgeScores.reduce((sum, score) => sum + score.value, 0);
      averageScores[judgeId] = Number((total / judgeScores.length).toFixed(1));
    });
    return averageScores;
  };

  const handleFreezeScores = async () => {
    if (!story) return;
    const averageScores = calculateAverageScores();
    const finalScore = Object.values(averageScores).reduce((sum, score) => sum + score, 0) / Object.values(averageScores).length;
    console.log('averageScores', averageScores);
    saveFrozenScores({
      ...frozenScores,
      finalScore,
      averageScores,
      timestamp: Date.now()
    })
  };

  const handleUnfreezeScores = async () => {
    console.log('handleUnfreezeScores');
    removeFrozenScores();
  };

  const frozenScoresQuery = useLiveQuery('type', { key: 'frozenScores', descending: true })

  console.log('frozenScoresQuery', frozenScoresQuery.docs);

  if (!story) {
    return <div>Loading...</div>;
  }

  if (frozenScores.timestamp) {
    console.log('frozenScores', frozenScores);
  } else {
    console.log('story not frozen', frozenScores);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Story Details</h1>

      {frozenScores.timestamp && frozenScores.averageScores && (
        <div className="bg-green-900 rounded-lg p-4 mb-6">
          <h2 className="text-xl text-white mb-2">Frozen Score: {frozenScores.finalScore}</h2>
          <p className="text-gray-300 text-sm mb-4">Frozen at: {new Date(frozenScores.timestamp).toLocaleString()}</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(frozenScores.averageScores).map(([judgeId, score]) => (
              <div key={judgeId} className="bg-green-800 rounded p-3">
                <div className="text-gray-300 text-sm">Judge: {judgesById.get(judgeId)?.teamName}</div>
                <div className="text-2xl font-bold text-white">{score}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        {!story.frozenScore ? (
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

      <div className="space-y-2">
        <p><span className="font-semibold">Story ID:</span> {story._id}</p>
        <p><span className="font-semibold">Storyteller:</span> {story.storyteller}</p>
        <p><span className="font-semibold">Status:</span> {story.status}</p>
        <p><span className="font-semibold">Created:</span> {new Date(story.timestamp).toLocaleString()}</p>
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
