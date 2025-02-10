import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Story } from '../../../types';

export const ProducerStories: React.FC = () => {
  const { eventId } = useParams();
  if (!eventId) { throw new Error('Event ID not found'); }
  const { database, useLiveQuery } = useFireproof(`events/${eventId}`);
  const [storyteller, setStoryteller] = useState('');

  // Query stories for this event
  const { docs: stories } = useLiveQuery<Story>(
    'type',
    { descending: true, key: 'story' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyteller.trim()) return;

    const newStory: Omit<Story, '_id'> = {
      type: 'story',
      eventId,
      storyteller: storyteller.trim(),
      timestamp: Date.now(),
      status: 'pending'
    }
    await database.put(newStory);
    
    setStoryteller('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Stories Management</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Story</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Enter storyteller name..."
                className="border border-gray-300 p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={storyteller}
                onChange={(e) => setStoryteller(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out w-full sm:w-auto"
              >
                Add Story
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Story List</h2>
          {stories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No stories added yet</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stories.map(story => (
                <li key={story._id}>
                  <Link
                    to={`/event/${eventId}/producer/story/${story._id}`}
                    className="block py-4 px-2 hover:bg-gray-50 rounded-md transition duration-150 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{story.storyteller}</span>
                      <span className="text-sm text-gray-500">{new Date(story.timestamp).toLocaleString()}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProducerStories;
