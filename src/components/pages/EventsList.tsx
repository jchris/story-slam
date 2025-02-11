import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fireproof, useFireproof } from 'use-fireproof';

export const EventsList: React.FC = () => {
  const { database, useLiveQuery } = useFireproof('story-slam');
  const [newEventName, setNewEventName] = useState('');
  
  // Query events sorted by creation time
  const { docs: events } = useLiveQuery<{ name: string; timestamp?: number }>('_id', { 
    descending: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName.trim()) return;

    const ok = await database.put({
      type: 'event',
      name: newEventName.trim(),
      timestamp: Date.now(),
      status: 'active'
    });
    const eventDb = fireproof(`events/${ok.id}`)
    await eventDb.put({ _id: 'event-info', name: newEventName.trim()})
    
    setNewEventName('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Events Management</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Enter event name..."
                className="border border-gray-300 bg-white p-3 rounded-md w-full text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out w-full sm:w-auto"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Event List</h2>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events created yet</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {events.map(event => (
                <li key={event._id}>
                  <Link
                    to={`/event/${event._id}`}
                    className="block py-4 px-2 hover:bg-gray-50 rounded-md transition duration-150 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{event.name}</span>
                      {event.timestamp && (
                        <span className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      )}
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

export default EventsList;
