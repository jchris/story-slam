import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ProducerJudges: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Judges Management</h1>
      <div>
        <h2>Add Judge</h2>
        <input type="text" placeholder="Judge Name" />
        <button>Add Judge</button>
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
