import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export const JudgeStories: React.FC = () => {
  const { eventId, judgeId } = useParams();
  const { useLiveQuery } = useFireproof(`events/${eventId}`);

  // Query stories that need to be judged
  const { docs: stories } = useLiveQuery<{
    storyteller: string,
    timestamp: number,
    status: string
  }>('type', {
      key: 'story'
    });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Stories to Judge</h1>
      {stories.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold">Available Stories</h2>
          <ul className="list-none space-y-2">
            {stories.map(story => (
              <li key={story._id}>
                <Link
                  to={`/event/${eventId}/judge/${judgeId}/story/${story._id}`}
                  className="block p-4 border rounded hover:bg-gray-100"
                >
                  <div className="font-medium">{story.storyteller}</div>
                  <div className="text-sm text-gray-500">
                    Added: {new Date(story.timestamp).toLocaleString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No stories available for judging at this time.</p>
      )}
    </div>
  );
};

export default JudgeStories;
