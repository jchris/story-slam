import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const JudgeOnboarding: React.FC = () => {
  const { eventId, judgeId } = useParams();
  return (
    <div>
      <h1>Welcome Judge!</h1>
      <form>
        <input type="text" placeholder="Your Nickname" />
        <div>
          <h3>Rules</h3>
          <p>Rules content here...</p>
          <label>
            <input type="checkbox" /> I agree to the rules
          </label>
        </div>
        <Link to={`/event/${eventId}/judge/${judgeId}/stories`}>
          <button type="button">Start Judging</button>
        </Link>
      </form>
    </div>
  );
};

export default JudgeOnboarding;
