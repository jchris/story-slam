import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ProducerDashboard: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Producer Dashboard</h1>
      <nav className="flex space-x-4">
        <Link
          to={`/event/${eventId}/producer/stories`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Manage Stories
        </Link>
        <Link
          to={`/event/${eventId}/producer/judges`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Manage Judges
        </Link>
      </nav>
    </div>
  );
};

export default ProducerDashboard;
