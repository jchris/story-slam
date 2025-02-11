import React from 'react';
import { useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge, Story } from '../../../types';

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
};

const getScoreColor = (score: number | undefined): string => {
  if (!score) return 'text-gray-500';
  if (score < 6) return 'text-red-600';
  if (score >= 9) return 'text-green-600';
  return 'text-blue-600';
};

const getScoreBackgroundColor = (score: number | undefined): string => {
  if (!score) return 'bg-gray-100';
  if (score < 6) return 'bg-red-100';
  if (score >= 9) return 'bg-green-100';
  return 'bg-blue-100';
};

export const AudienceDashboard: React.FC = () => {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');
  const { useLiveQuery } = useFireproof(`events/${eventId}`);

  const frozenScores = useLiveQuery<FrozenScores>('finalScore');

  const stories = useLiveQuery<Story>('type', { key: 'story' });

  const storiesById = stories.docs.reduce((acc, story) => {
    acc[story._id] = story;
    return acc;
  }, {} as Record<string, Story>);

  const judges = useLiveQuery<Judge>('type', { key: 'judge' });
  
  const judgesById = judges.docs.reduce((acc, judge) => {
    acc[judge._id] = judge;
    return acc;
  }, {} as Record<string, Judge>);

  return (
    <div className="p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Event: Holocene Feb 21st</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Storyteller</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Final Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Judge Scores</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {frozenScores.docs
              .sort((a, b) => (a.finalScore || 0) - (b.finalScore || 0))
              .map((score) => (
              <tr key={score._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {storiesById[score.storyId]?.storyteller}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center justify-center ${getScoreBackgroundColor(score.finalScore)} rounded-full px-4 py-1.5`}>
                    <span className={`text-lg font-bold ${getScoreColor(score.finalScore)}`}>
                      {score.finalScore?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {score.averageScores && Object.entries(score.averageScores).map(([judgeId, score]) => (
                      <div key={judgeId} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <span
                          className={`${getScoreColor(score)} font-semibold`}
                        >
                          {score.toFixed(1)}
                        </span>
                        <span className="text-gray-600 text-sm">{judgesById[judgeId]?.teamName}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {score.timestamp ? new Date(score.timestamp).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AudienceDashboard;
