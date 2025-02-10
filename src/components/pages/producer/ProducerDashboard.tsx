import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ProducerDashboard: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Producer Dashboard</h1>
      <nav>
        <Link to={`/event/${eventId}/producer/stories`}>Manage Stories</Link> |
        <Link to={`/event/${eventId}/producer/judges`}>Manage Judges</Link>
      </nav>
    </div>
  );
};

export default ProducerDashboard;
