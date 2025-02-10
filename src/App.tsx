import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import ScoringInterface from './components/ScoringInterface';
import { EventLayout } from './components/EventLayout';

// Page components
const Home: React.FC = () => (
  <div>
    <h1>Story Judging Home</h1>
    <nav>
      <Link to="/events">Events</Link>
    </nav>
  </div>
);

const EventsList: React.FC = () => (
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

const EventPage: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Storyslam Judging</h1>
      <nav>
        <Link to={`/event/${eventId}/producer`}>Producer Dashboard</Link>
      </nav>
      <div>
        <h2>Event Overview</h2>
        <p>Event ID: {eventId}</p>
      </div>
    </div>
  );
};

const ProducerDashboard: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Producer Dashboard</h1>
      <nav>
        <Link to={`/event/${eventId}/producer/stories`}>Manage Stories</Link> |
        <Link to={`/event/${eventId}/producer/judges`}>Manage Judges</Link>
      </nav>
    </div>
  );
};

const ProducerStories: React.FC = () => {
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

const ProducerStoryDetail: React.FC = () => {
  const { eventId, storyId } = useParams();
  return (
    <div>
      <h1>Story Details</h1>
      <p>Event ID: {eventId}</p>
      <p>Story ID: {storyId}</p>
    </div>
  );
};

const ProducerJudges: React.FC = () => {
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

const ProducerJudgeDetail: React.FC = () => {
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

const JudgeOnboarding: React.FC = () => {
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

const JudgeStories: React.FC = () => {
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

const JudgeStoryView: React.FC = () => {
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

const AudienceDashboard: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h1>Audience Dashboard</h1>
      <p>Event ID: {eventId}</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App bg-gray-900 text-gray-100 max-w-screen-sm mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsList />} />
          
          {/* Event routes with EventLayout */}
          <Route path="/event/:eventId" element={<EventLayout><EventPage /></EventLayout>} />
          
          {/* Producer routes */}
          <Route path="/event/:eventId/producer" element={<EventLayout><ProducerDashboard /></EventLayout>} />
          <Route path="/event/:eventId/producer/stories" element={<EventLayout><ProducerStories /></EventLayout>} />
          <Route path="/event/:eventId/producer/story/:storyId" element={<EventLayout><ProducerStoryDetail /></EventLayout>} />
          <Route path="/event/:eventId/producer/judges" element={<EventLayout><ProducerJudges /></EventLayout>} />
          <Route path="/event/:eventId/producer/judge/:judgeId" element={<EventLayout><ProducerJudgeDetail /></EventLayout>} />
          
          {/* Judge routes */}
          <Route path="/event/:eventId/judge/:judgeId" element={<EventLayout><JudgeOnboarding /></EventLayout>} />
          <Route path="/event/:eventId/judge/:judgeId/stories" element={<EventLayout><JudgeStories /></EventLayout>} />
          <Route path="/event/:eventId/judge/:judgeId/story/:storyId" element={<EventLayout><JudgeStoryView /></EventLayout>} />

          {/* Audience route */}
          <Route path="/event/:eventId/audience" element={<EventLayout><AudienceDashboard /></EventLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
