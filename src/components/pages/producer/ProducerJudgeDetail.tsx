import React from 'react';
import { useParams } from 'react-router-dom';

export const ProducerJudgeDetail: React.FC = () => {
  const { eventId, judgeId } = useParams();
  return (
    <div>
      <h1>Judge QR Code</h1>
      <p>Event ID: {eventId}</p>
      <p>Judge ID: {judgeId}</p>
      <div>
        <p>QR Code placeholder for URL:</p>
        <code>{`/event/${eventId}/judge/${judgeId}`}</code>
      </div>
    </div>
  );
};

export default ProducerJudgeDetail;
