import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export const ProducerStories: React.FC = () => {
  const { eventId } = useParams();
  const { database, useLiveQuery } = useFireproof(`events/${eventId}`);
  const [storyteller, setStoryteller] = useState('');

  // Query stories for this event
  const { docs: stories } = useLiveQuery<{ storyteller: string, timestamp: number}>(
    'type',
    { descending: true, key: 'story' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyteller.trim()) return;

    await database.put({
      type: 'story',
      eventId,
      storyteller: storyteller.trim(),
      timestamp: Date.now(),
      status: 'pending'
    });
    
    setStoryteller('');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Stories Management</h1>
      <div className="flex space-x-4">
        <h2 className="w-1/3">Add Story</h2>
        <div className="w-2/3">
          <input
            type="text"
            placeholder="Storyteller"
            className="border border-gray-300 p-2 rounded w-full text-gray-900"
            value={storyteller}
            onChange={(e) => setStoryteller(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Story
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Story List</h2>
        <ul className="list-none">
          {stories.map(story => (
            <li key={story._id}>
              <Link
                to={`/event/${eventId}/producer/story/${story._id}`}
                className="block p-2 hover:bg-gray-100"
              >
                {story.storyteller} - {new Date(story.timestamp).toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default ProducerStories;
