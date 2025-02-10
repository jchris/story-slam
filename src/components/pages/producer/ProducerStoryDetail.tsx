import React from 'react';
import { useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

interface Story {
  _id: string;
  type: 'story';
  eventId: string;
  storyteller: string;
  timestamp: number;
  status: 'pending' | 'active' | 'complete';
}

export const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  const { useDocument } = useFireproof(`events/${eventId}`);
  const { doc: story, error } = useDocument<Story>({ _id: storyId || '' } as Story);

  if (error) {
    return <div className="text-red-600">Error loading story: {error.message}</div>;
  }

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
    </div>
  );
};

export default ProducerStoryDetail;
