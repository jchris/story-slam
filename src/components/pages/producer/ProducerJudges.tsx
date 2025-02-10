import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export const ProducerJudges: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { database } = useFireproof(`events/${eventId}`);
  const onAddJudge = async () => {
    const ok = await database.put({
      type: 'judge',
      eventId,
      name: '',
      timestamp: Date.now(),
      status: 'active'
    });
    // route to judge page for ok.id
    navigate(`/event/${eventId}/producer/judge/${ok.id}`);
  }
  return (
    <div>
      <h1>Judges Management</h1>
      <div>
        <h2>Add Judge team</h2>
        <button onClick={onAddJudge}>Add Judge</button>
      </div>
      <div>
        <h2>Judge List</h2>
        <ul>
          <li>
            <Link to={`/event/${eventId}/producer/judge/judge123`}>Judge 1</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProducerJudges;
