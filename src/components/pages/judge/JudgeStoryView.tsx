import React from 'react';
import { useParams } from 'react-router-dom';
import ScoringInterface from './ScoringInterface';

export const JudgeStoryView: React.FC = () => {
  const { eventId, judgeId, storyId } = useParams();
  return (
    <div>
      <h1>Judge Story</h1>
      <p>Event ID: {eventId}</p>
      <p>Judge ID: {judgeId}</p>
      <p>Story ID: {storyId}</p>
      <ScoringInterface />
    </div>
  );
};

export default JudgeStoryView;
