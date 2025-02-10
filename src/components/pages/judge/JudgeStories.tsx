import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const JudgeStories: React.FC = () => {
  const { eventId, judgeId } = useParams();
  return (
    <div>
      <h1>Stories to Judge</h1>
      <div>
        <h2>Current Story</h2>
        <Link to={`/event/${eventId}/judge/${judgeId}/story/story123`}>
          Current Story
        </Link>
      </div>
      <div>
        <h2>Upcoming Stories</h2>
        <ul>
          <li>Story 2</li>
          <li>Story 3</li>
        </ul>
      </div>
    </div>
  );
};

export default JudgeStories;
