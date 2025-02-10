import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ProducerStories: React.FC = () => {
  const { eventId } = useParams();
  return (
    <form className="space-y-4">
      <h1 className="text-2xl font-bold">Stories Management</h1>
      <div className="flex space-x-4">
        <h2 className="w-1/3">Add Story</h2>
        <div className="w-2/3">
          <input
            type="text"
            name="storyteller"
            placeholder="Storyteller"
            className="border border-gray-300 p-2 rounded w-full text-gray-900"
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
        <h2 className="text-xl">Story List</h2>
        <ul>
          <li>
            <Link
              to={`/event/${eventId}/producer/story/story123`}
              className="block p-2 hover:bg-gray-100"
            >
              Storyteller 1
            </Link>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default ProducerStories;
