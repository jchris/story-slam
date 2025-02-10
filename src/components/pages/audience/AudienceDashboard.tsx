import React from 'react';
import { useParams } from 'react-router-dom';

export const AudienceDashboard: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Audience Dashboard</h1>
      <p>Event ID: {eventId}</p>
    </div>
  );
};

export default AudienceDashboard;
