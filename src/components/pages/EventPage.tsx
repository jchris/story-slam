import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const EventPage: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Storyslam Judging</h1>
      <nav>
        <Link to={`/event/${eventId}/producer`}>Producer Dashboard</Link>
      </nav>
      <div>
        <h2>Event Overview</h2>
        <p>Event ID: {eventId}</p>
      </div>
    </div>
  );
};

export default EventPage;
