import React from 'react';
import { Link } from 'react-router-dom';

export const EventsList: React.FC = () => (
  <div>
    <h1>Events</h1>
    <div>
      <h2>Create New Event</h2>
      <input type="text" placeholder="Event Name" />
      <button>Create Event</button>
    </div>
    <div>
      <h2>Event List</h2>
      <ul>
        <li><Link to="/event/xyz123">Sample Event</Link></li>
      </ul>
    </div>
  </div>
);

export default EventsList;
