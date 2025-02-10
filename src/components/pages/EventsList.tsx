import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export const EventsList: React.FC = () => {
  const { database, useLiveQuery } = useFireproof('story-judging');
  const [newEventName, setNewEventName] = useState('');
  
  // Query events sorted by creation time
  const { docs: events } = useLiveQuery<{ name : string}>('_id', { 
    descending: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName.trim()) return;

    await database.put({
      type: 'event',
      name: newEventName.trim(),
      timestamp: Date.now(),
      status: 'active'
    });
    
    setNewEventName('');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Events</h1>
      <div className="flex space-x-4">
        <h2 className="w-1/3">Create New Event</h2>
        <div className="w-2/3">
          <input
            type="text"
            placeholder="Event Name"
            className="border border-gray-300 p-2 rounded w-full text-gray-900"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Event List</h2>
        <ul className="list-none">
          {events.map(event => (
            <li key={event._id}>
              <Link 
                to={`/event/${event._id}`} 
                className="block p-2 hover:bg-gray-100"
              >
                {event.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default EventsList;
