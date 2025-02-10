import React from 'react';
import { useParams } from 'react-router-dom';
import ScoringInterface from './ScoringInterface';

export const JudgeStoryView: React.FC = () => {
  const { eventId, judgeId, storyId } = useParams();

  if (!eventId || !judgeId || !storyId) {
    return <div>Missing required parameters</div>;
  }

  return (
    <div>
      <ScoringInterface 
        eventId={eventId}
        judgeId={judgeId}
        storyId={storyId}
      />
    </div>
  );
};

export default JudgeStoryView;
