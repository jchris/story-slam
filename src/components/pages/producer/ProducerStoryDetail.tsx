import React from 'react';
import { useParams } from 'react-router-dom';

export const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  return (
    <div>
      <h1>Story Details</h1>
      <p>Event ID: {eventId}</p>
      <p>Story ID: {storyId}</p>
    </div>
  );
};

export default ProducerStoryDetail;
