import React from 'react';
import { useParams } from 'react-router-dom';

export const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  return (
    <div>
      <h1>Story Details</h1>
      
      <p>Story ID: {storyId}</p>
      <p>Storyteller: </p>
    </div>
  );
};

export default ProducerStoryDetail;
