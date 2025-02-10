import React from 'react';
import { Link } from 'react-router-dom';

export const EventsList: React.FC = () => (
  <form className="space-y-4">
    <h1 className="text-2xl font-bold">Events</h1>
    <div className="flex space-x-4">
      <h2 className="w-1/3">Create New Event</h2>
      <div className="w-2/3">
        <input
          type="text"
          placeholder="Event Name"
          className="border border-gray-300 p-2 rounded w-full text-gray-900"
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
        <li><Link to="/event/xyz123" className="block p-2 hover:bg-gray-100">Sample Event</Link></li>
      </ul>
    </div>
  </form>
);

export default EventsList;
