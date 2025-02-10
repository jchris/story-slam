import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => (
  <div>
    <h1>Story Judging Home</h1>
    <nav>
      <Link to="/events">Events</Link>
    </nav>
  </div>
);

export default Home;
