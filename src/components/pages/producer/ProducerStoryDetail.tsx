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
  if (score < 5) return 'text-red-500';
  if (score >= 9) return 'text-green-500';
  return grey ? 'text-gray-500' : 'text-blue-500';
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
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="mb-2 text-gray-400 text-sm">Judge: {judge?.teamName}</div>
      <div className="grid grid-cols-2 gap-2">
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
        <div>
          <div className="text-gray-400 text-sm">Average:</div>
          <div className={`text-lg font-bold ${getScoreColor(averageScore)}`}>
            {averageScore}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  const { useDocument, useLiveQuery } = useFireproof(`events/${eventId}`);
  const { doc: story } = useDocument<Story>({ _id: storyId || '' } as Story);

  // Query all scores for this story
  const { docs: scores } = useLiveQuery<ScoreDocument>('storyId', { key: storyId });

  const uniqueJudgeIds = new Set(scores.map(score => score.judgeId));

  const { docs: judges } = useLiveQuery<Judge>('_id', { keys: Array.from(uniqueJudgeIds) });

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

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Story Details</h1>
      
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
