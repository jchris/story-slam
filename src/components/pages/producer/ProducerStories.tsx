import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ProducerStories: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Stories Management</h1>
      <div>
        <h2>Add Story</h2>
        <input type="text" placeholder="Story Title" />
        <button>Add Story</button>
      </div>
      <div>
        <h2>Story List</h2>
        <ul>
          <li>
            <Link to={`/event/${eventId}/producer/story/story123`}>Story 1</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProducerStories;
